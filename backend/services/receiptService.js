import fs from 'fs';
import path from 'path';

export const receiptService = {
    /**
     * Generates a text-based receipt suitable for WhatsApp
     */
    generateTextReceipt(transaction, businessName) {
        let receipt = \`🧾 *RECEIPT - \${businessName}* 🧾\n\n\`;
    receipt += \`Date: \${new Date(transaction.createdAt).toLocaleString()}\n\`;
    receipt += \`Txn Ref: \${transaction.reference || transaction._id}\n\`;
    receipt += \`Status: \${transaction.status.toUpperCase()}\n\n\`;
    
    receipt += \`*Items:*\n\`;
    if (transaction.items && transaction.items.length > 0) {
      transaction.items.forEach(item => {
        receipt += \`- \${item.name} x\${item.quantity} @ NGN \${item.price}\n\`;
      });
    } else {
      receipt += \`- Payment for order/services\n\`;
    }
    
    receipt += \`\n*Total Amount:* NGN \${transaction.amount}\n\n\`;
    receipt += \`Thank you for your business! 🙏\`;
    
    return receipt;
  },

  /**
   * Generates a PDF receipt (placeholder for future PDF library like PDFKit)
   */
  async generatePdfReceipt(transaction, businessName) {
    // In a full implementation, you'd use PDFKit or html-pdf here.
    // For now, returning a mock URL or saving a dummy file.
    const fileName = \`receipt_\${transaction._id}.pdf\`;
    // const filePath = path.join(process.cwd(), 'public', 'uploads', 'invoices', fileName);
    // await generatePDF(transaction, filePath);
    
    return \`https://bizone.trade/uploads/invoices/\${fileName}\`;
  }
};

export default receiptService;
