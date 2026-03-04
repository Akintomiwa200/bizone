import fs from 'fs/promises';
import { createWriteStream } from 'node:fs';
import path from 'path';
import { fileURLToPath } from 'url';
import PDFDocument from 'pdfkit';

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const RECEIPT_CONFIG = {
    UPLOAD_DIR: path.join(process.cwd(), 'public', 'uploads', 'invoices'),
    CURRENCY: 'NGN',
    DATE_FORMAT: { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric',
        hour: '2-digit', 
        minute: '2-digit'
    }
};

/**
 * Service for generating and managing receipts
 * Supports text (WhatsApp) and PDF receipts
 */
export const receiptService = {
    /**
     * Validates receipt input data
     * @private
     */
    _validateInput(transaction, businessName) {
        if (!transaction) throw new Error('Transaction data is required');
        if (!businessName) throw new Error('Business name is required');
        const amount = transaction.amount ?? transaction.total;
        if (amount == null || isNaN(Number(amount))) throw new Error('Transaction amount is required');
    },

    /**
     * Formats currency amount
     * @private
     */
    _formatCurrency(amount) {
        return `${RECEIPT_CONFIG.CURRENCY} ${Number(amount).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`;
    },

    /**
     * Formats date for receipt
     * @private
     */
    _formatDate(date) {
        return new Date(date).toLocaleString('en-NG', RECEIPT_CONFIG.DATE_FORMAT);
    },

    /**
     * Sanitizes filename to prevent path traversal
     * @private
     */
    _sanitizeFilename(filename) {
        return filename.replace(/[^a-zA-Z0-9._-]/g, '_');
    },

    /**
     * Generates a text-based receipt suitable for WhatsApp
     * @param {Object} transaction - Transaction data
     * @param {string} businessName - Business name
     * @returns {string} Formatted receipt text
     */
    generateTextReceipt(transaction, businessName) {
        try {
            this._validateInput(transaction, businessName);
            
            const lines = [];
            
            // Header
            lines.push('🧾'.repeat(4));
            lines.push(`*RECEIPT - ${businessName}*`);
            lines.push('🧾'.repeat(4));
            lines.push('');
            
            // Transaction details
            lines.push(`📅 *Date:* ${this._formatDate(transaction.createdAt)}`);
            lines.push(`🆔 *Reference:* ${transaction.reference || transaction._id}`);
            lines.push(`📊 *Status:* ${transaction.status?.toUpperCase() || 'COMPLETED'}`);
            lines.push(`💳 *Payment Method:* ${transaction.paymentMethod || 'N/A'}`);
            lines.push('');
            
            // Items
            lines.push('*📦 ITEMS*');
            lines.push('─'.repeat(30));
            
            if (transaction.items?.length > 0) {
                transaction.items.forEach((item, index) => {
                    const name = item.name || item.product?.name || 'Product';
                    const subtotal = item.quantity * item.price;
                    lines.push(`${index + 1}. ${String(name).substring(0, 20)}`);
                    lines.push(`   ${item.quantity} x ${this._formatCurrency(item.price)} = ${this._formatCurrency(subtotal)}`);
                });
            } else {
                lines.push('• Payment for order/services');
            }
            
            lines.push('─'.repeat(30));
            
            // Totals
            const subtotal = transaction.subtotal || transaction.amount;
            const tax = transaction.tax || 0;
            const discount = transaction.discount || 0;
            const total = transaction.amount ?? transaction.total;
            
            lines.push(`📝 *Subtotal:* ${this._formatCurrency(subtotal)}`);
            if (tax > 0) lines.push(`💰 *Tax:* ${this._formatCurrency(tax)}`);
            if (discount > 0) lines.push(`🏷️ *Discount:* -${this._formatCurrency(discount)}`);
            lines.push(`💵 *TOTAL:* ${this._formatCurrency(total)}`);
            lines.push('');
            
            // Footer
            lines.push('🙏 *Thank you for your business!*');
            lines.push('📱 Powered by BizOne');
            
            return lines.join('\n');
            
        } catch (error) {
            console.error('Error generating text receipt:', error);
            return `❌ Error generating receipt: ${error.message}`;
        }
    },

    /**
     * Ensures upload directory exists
     * @private
     */
    async _ensureUploadDir() {
        try {
            await fs.access(RECEIPT_CONFIG.UPLOAD_DIR);
        } catch {
            await fs.mkdir(RECEIPT_CONFIG.UPLOAD_DIR, { recursive: true });
        }
    },

    /**
     * Generates a PDF receipt using PDFKit
     * @param {Object} transaction - Transaction data (amount/total, items, orderNumber/reference, etc.)
     * @param {string} businessName - Business name
     * @param {Object} options - { baseUrl } for public URL
     * @returns {Promise<string>} URL or path to generated PDF
     */
    async generatePdfReceipt(transaction, businessName, options = {}) {
        try {
            this._validateInput(transaction, businessName);
            await this._ensureUploadDir();

            const fileName = `receipt_${(transaction._id || transaction.reference || Date.now()).toString()}_${Date.now()}.pdf`;
            const sanitizedFileName = this._sanitizeFilename(fileName);
            const filePath = path.join(RECEIPT_CONFIG.UPLOAD_DIR, sanitizedFileName);

            const total = transaction.amount ?? transaction.total;
            const ref = transaction.reference || transaction.orderNumber || transaction._id;

            return new Promise((resolve, reject) => {
                const doc = new PDFDocument({ margin: 50 });
                const stream = createWriteStream(filePath);

                doc.pipe(stream);

                doc.fontSize(18).text(businessName, { align: 'center' });
                doc.fontSize(12).text('RECEIPT', { align: 'center' });
                doc.moveDown();

                doc.fontSize(10);
                doc.text(`Date: ${this._formatDate(transaction.createdAt || new Date())}`);
                doc.text(`Reference: ${ref}`);
                doc.text(`Status: ${(transaction.status || 'COMPLETED').toUpperCase()}`);
                doc.text(`Payment: ${transaction.paymentMethod || 'N/A'}`);
                doc.moveDown();

                doc.text('ITEMS', { underline: true });
                doc.moveDown(0.5);

                if (transaction.items?.length > 0) {
                    transaction.items.forEach((item, index) => {
                        const name = item.name || item.product?.name || 'Product';
                        const subtotal = (item.quantity || 0) * (item.price || 0);
                        doc.text(`${index + 1}. ${String(name).substring(0, 40)}`);
                        doc.text(`   ${item.quantity} x ${this._formatCurrency(item.price)} = ${this._formatCurrency(subtotal)}`);
                    });
                } else {
                    doc.text('Payment for order / services');
                }

                doc.moveDown();
                doc.text(`TOTAL: ${this._formatCurrency(total)}`, { align: 'right' });
                doc.moveDown(2);
                doc.fontSize(9).text('Thank you for your business. Powered by BizOne.', { align: 'center' });

                doc.end();

                stream.on('finish', () => {
                    const baseUrl = options.baseUrl || process.env.FRONTEND_URL || 'https://bizone.trade';
                    const relativePath = `/uploads/invoices/${sanitizedFileName}`;
                    resolve(`${baseUrl.replace(/\/$/, '')}${relativePath}`);
                });
                stream.on('error', reject);
            });
        } catch (error) {
            console.error('Error generating PDF receipt:', error);
            throw new Error(`Failed to generate PDF receipt: ${error.message}`);
        }
    },

    /**
     * Generates HTML receipt for email/web
     * @param {Object} transaction - Transaction data
     * @param {string} businessName - Business name
     * @returns {string} HTML receipt
     */
    generateHtmlReceipt(transaction, businessName) {
        try {
            this._validateInput(transaction, businessName);
            
            const items = transaction.items?.map(item => `
                <tr>
                    <td>${item.name}</td>
                    <td>${item.quantity}</td>
                    <td>${this._formatCurrency(item.price)}</td>
                    <td>${this._formatCurrency(item.quantity * item.price)}</td>
                </tr>
            `).join('');
            
            return `
                <!DOCTYPE html>
                <html>
                <head>
                    <style>
                        body { font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; }
                        .receipt { border: 1px solid #ddd; padding: 20px; border-radius: 5px; }
                        .header { text-align: center; border-bottom: 2px solid #333; padding-bottom: 10px; }
                        .items { width: 100%; border-collapse: collapse; margin: 20px 0; }
                        .items th, .items td { border: 1px solid #ddd; padding: 8px; text-align: left; }
                        .total { font-size: 1.2em; font-weight: bold; text-align: right; margin-top: 20px; }
                        .footer { text-align: center; margin-top: 30px; color: #666; }
                    </style>
                </head>
                <body>
                    <div class="receipt">
                        <div class="header">
                            <h1>${businessName}</h1>
                            <h2>Receipt</h2>
                        </div>
                        
                        <p><strong>Date:</strong> ${this._formatDate(transaction.createdAt)}</p>
                        <p><strong>Reference:</strong> ${transaction.reference || transaction._id}</p>
                        <p><strong>Status:</strong> ${transaction.status?.toUpperCase() || 'COMPLETED'}</p>
                        
                        <table class="items">
                            <thead>
                                <tr>
                                    <th>Item</th>
                                    <th>Qty</th>
                                    <th>Price</th>
                                    <th>Subtotal</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${items || '<tr><td colspan="4">Payment for order/services</td></tr>'}
                            </tbody>
                        </table>
                        
                        <div class="total">
                            <p>Total: ${this._formatCurrency(transaction.amount)}</p>
                        </div>
                        
                        <div class="footer">
                            <p>Thank you for your business!</p>
                            <p>Powered by BizOne</p>
                        </div>
                    </div>
                </body>
                </html>
            `;
            
        } catch (error) {
            console.error('Error generating HTML receipt:', error);
            return `<p>Error generating receipt: ${error.message}</p>`;
        }
    },

    /**
     * Deletes old receipt files (cleanup utility)
     * @param {number} daysOld - Delete files older than this many days
     */
    async cleanupOldReceipts(daysOld = 30) {
        try {
            const files = await fs.readdir(RECEIPT_CONFIG.UPLOAD_DIR);
            const now = Date.now();
            const maxAge = daysOld * 24 * 60 * 60 * 1000;
            
            let deletedCount = 0;
            
            for (const file of files) {
                const filePath = path.join(RECEIPT_CONFIG.UPLOAD_DIR, file);
                const stats = await fs.stat(filePath);
                
                if (now - stats.mtimeMs > maxAge) {
                    await fs.unlink(filePath);
                    deletedCount++;
                }
            }
            
            console.log(`Cleaned up ${deletedCount} old receipt files`);
            return deletedCount;
            
        } catch (error) {
            console.error('Error cleaning up receipts:', error);
            throw error;
        }
    }
};

export default receiptService;