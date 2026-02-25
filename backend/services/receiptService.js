import fs from 'fs/promises'; // Using promises API
import path from 'path';
import { fileURLToPath } from 'url';

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
        if (!transaction.amount) throw new Error('Transaction amount is required');
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
                    const subtotal = item.quantity * item.price;
                    lines.push(`${index + 1}. ${item.name.substring(0, 20)}`);
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
            const total = transaction.amount;
            
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
     * Generates a PDF receipt
     * @param {Object} transaction - Transaction data
     * @param {string} businessName - Business name
     * @param {Object} options - Additional options
     * @returns {Promise<string>} URL or path to generated PDF
     */
    async generatePdfReceipt(transaction, businessName, options = {}) {
        try {
            this._validateInput(transaction, businessName);
            await this._ensureUploadDir();
            
            const fileName = `receipt_${transaction._id || Date.now()}_${Date.now()}.pdf`;
            const sanitizedFileName = this._sanitizeFilename(fileName);
            const filePath = path.join(RECEIPT_CONFIG.UPLOAD_DIR, sanitizedFileName);
            
            // For now, create a simple text file as PDF placeholder
            // In production, integrate with PDFKit or similar
            const textReceipt = this.generateTextReceipt(transaction, businessName);
            await fs.writeFile(filePath.replace('.pdf', '.txt'), textReceipt);
            
            // Return the URL (adjust based on your static file serving)
            const baseUrl = options.baseUrl || 'https://bizone.trade';
            const relativePath = `/uploads/invoices/${sanitizedFileName}`;
            
            return `${baseUrl}${relativePath}`;
            
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