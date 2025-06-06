
import React, { useRef } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Download, Printer } from 'lucide-react';
import { InvoiceData } from '@/types/invoice';
import { generatePDF } from '@/utils/pdfGenerator';

interface InvoicePreviewProps {
  invoiceData: InvoiceData;
  onBack?: () => void;
  showControls?: boolean;
}

const InvoicePreview: React.FC<InvoicePreviewProps> = ({ 
  invoiceData, 
  onBack, 
  showControls = true 
}) => {
  const invoiceRef = useRef<HTMLDivElement>(null);

  const handleDownloadPDF = () => {
    if (invoiceRef.current) {
      generatePDF(invoiceRef.current, `Invoice-${invoiceData.invoiceNo}.pdf`);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="p-6">
      {showControls && (
        <div className="flex justify-between items-center mb-6 print:hidden">
          {onBack && (
            <Button onClick={onBack} variant="outline">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Form
            </Button>
          )}
          <div className="space-x-2">
            <Button onClick={handlePrint} variant="outline">
              <Printer className="w-4 h-4 mr-2" />
              Print
            </Button>
            <Button onClick={handleDownloadPDF}>
              <Download className="w-4 h-4 mr-2" />
              Download PDF
            </Button>
          </div>
        </div>
      )}

      {/* A4 sized invoice container */}
      <div 
        ref={invoiceRef} 
        className="bg-white border border-gray-300 shadow-lg mx-auto"
        style={{ 
          width: '210mm', 
          minHeight: '297mm', 
          padding: '10mm',
          fontSize: '12px',
          lineHeight: '1.4'
        }}
      >
        {/* Invoice Header */}
        <div className="border-b-2 border-gray-800 pb-4 mb-4">
          <div className="text-center">
            <h1 className="text-xl font-bold mb-2">TAX INVOICE</h1>
          </div>
          
          <div className="grid grid-cols-2 gap-6 mt-4">
            {/* Company Details */}
            <div>
              <h2 className="font-bold text-base mb-2">{invoiceData.companyDetails.name}</h2>
              <div className="text-xs space-y-1">
                <p>{invoiceData.companyDetails.address}</p>
                <p><strong>GSTIN/UIN:</strong> {invoiceData.companyDetails.gstin}</p>
                <p><strong>State:</strong> {invoiceData.companyDetails.state}</p>
                <p><strong>Contact:</strong> {invoiceData.companyDetails.contact}</p>
                <p><strong>Email:</strong> {invoiceData.companyDetails.email}</p>
              </div>
            </div>
            
            {/* Invoice Details */}
            <div className="text-xs">
              <div className="grid grid-cols-2 gap-2">
                <div><strong>Invoice No.:</strong></div>
                <div>{invoiceData.invoiceNo}</div>
                <div><strong>Date:</strong></div>
                <div>{new Date(invoiceData.date).toLocaleDateString()}</div>
                <div><strong>Delivery Note:</strong></div>
                <div>{invoiceData.deliveryNote}</div>
                <div><strong>Payment Terms:</strong></div>
                <div>{invoiceData.paymentTerms}</div>
                <div><strong>Supplier Ref.:</strong></div>
                <div>{invoiceData.supplierRef}</div>
                <div><strong>Buyer Order No.:</strong></div>
                <div>{invoiceData.buyerOrderNo}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Buyer Details */}
        <div className="border-b border-gray-300 p-6">
          <div className="grid grid-cols-2 gap-8">
            <div>
              <h3 className="font-bold mb-2">Buyer (Bill to)</h3>
              <div className="text-sm space-y-1">
                <p className="font-semibold">{invoiceData.buyerDetails.name}</p>
                <p>{invoiceData.buyerDetails.address}</p>
                <p><strong>District:</strong> {invoiceData.buyerDetails.district}</p>
                <p><strong>GSTIN/UIN:</strong> {invoiceData.buyerDetails.gstin}</p>
                <p><strong>State:</strong> {invoiceData.buyerDetails.state}</p>
              </div>
            </div>
            <div>
              <h3 className="font-bold mb-2">Consignee (Ship to)</h3>
              <div className="text-sm space-y-1">
                <p className="font-semibold">{invoiceData.buyerDetails.name}</p>
                <p>{invoiceData.buyerDetails.address}</p>
                <p><strong>District:</strong> {invoiceData.buyerDetails.district}</p>
                <p><strong>GSTIN/UIN:</strong> {invoiceData.buyerDetails.gstin}</p>
                <p><strong>State:</strong> {invoiceData.buyerDetails.state}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Items Table */}
        <div className="p-6">
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 p-2 text-xs">Sr. No.</th>
                <th className="border border-gray-300 p-2 text-xs">Description of Goods</th>
                <th className="border border-gray-300 p-2 text-xs">HSN/SAC</th>
                <th className="border border-gray-300 p-2 text-xs">Quantity</th>
                <th className="border border-gray-300 p-2 text-xs">Rate</th>
                <th className="border border-gray-300 p-2 text-xs">Amount</th>
              </tr>
            </thead>
            <tbody>
              {invoiceData.items.map((item, index) => (
                <tr key={item.id}>
                  <td className="border border-gray-300 p-2 text-xs text-center">{index + 1}</td>
                  <td className="border border-gray-300 p-2 text-xs">{item.description}</td>
                  <td className="border border-gray-300 p-2 text-xs text-center">{item.hsnCode}</td>
                  <td className="border border-gray-300 p-2 text-xs text-center">{item.quantity}</td>
                  <td className="border border-gray-300 p-2 text-xs text-right">₹{item.rate.toFixed(2)}</td>
                  <td className="border border-gray-300 p-2 text-xs text-right">₹{item.amount.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Tax Summary */}
          <div className="grid grid-cols-2 gap-8 mt-6">
            <div>
              <div className="text-sm">
                <p><strong>Amount in Words:</strong></p>
                <p className="italic">{invoiceData.amountInWords}</p>
              </div>
              
              {/* HSN Summary */}
              <div className="mt-4">
                <h4 className="font-semibold text-sm mb-2">Tax Details</h4>
                <table className="w-full border-collapse border border-gray-300 text-xs">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="border border-gray-300 p-1">HSN/SAC</th>
                      <th className="border border-gray-300 p-1">Taxable Value</th>
                      <th className="border border-gray-300 p-1">Central Tax</th>
                      <th className="border border-gray-300 p-1">State Tax</th>
                    </tr>
                  </thead>
                  <tbody>
                    {invoiceData.items.map((item) => (
                      <tr key={item.id}>
                        <td className="border border-gray-300 p-1 text-center">{item.hsnCode}</td>
                        <td className="border border-gray-300 p-1 text-right">₹{item.amount.toFixed(2)}</td>
                        <td className="border border-gray-300 p-1 text-right">₹{(item.amount * 2.5 / 100).toFixed(2)}</td>
                        <td className="border border-gray-300 p-1 text-right">₹{(item.amount * 2.5 / 100).toFixed(2)}</td>
                      </tr>
                    ))}
                    <tr className="bg-gray-100 font-semibold">
                      <td className="border border-gray-300 p-1 text-center">Total</td>
                      <td className="border border-gray-300 p-1 text-right">₹{invoiceData.subtotal.toFixed(2)}</td>
                      <td className="border border-gray-300 p-1 text-right">₹{invoiceData.cgst.toFixed(2)}</td>
                      <td className="border border-gray-300 p-1 text-right">₹{invoiceData.sgst.toFixed(2)}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            
            <div>
              <table className="w-full text-sm">
                <tbody>
                  <tr>
                    <td className="py-1"><strong>Total Amount Before Tax:</strong></td>
                    <td className="py-1 text-right">₹{invoiceData.subtotal.toFixed(2)}</td>
                  </tr>
                  <tr>
                    <td className="py-1">Add: CGST @ 2.5%:</td>
                    <td className="py-1 text-right">₹{invoiceData.cgst.toFixed(2)}</td>
                  </tr>
                  <tr>
                    <td className="py-1">Add: SGST @ 2.5%:</td>
                    <td className="py-1 text-right">₹{invoiceData.sgst.toFixed(2)}</td>
                  </tr>
                  <tr>
                    <td className="py-1">Round Off:</td>
                    <td className="py-1 text-right">₹{invoiceData.roundOff.toFixed(2)}</td>
                  </tr>
                  <tr className="border-t border-gray-300">
                    <td className="py-1 font-bold">Total Amount After Tax:</td>
                    <td className="py-1 text-right font-bold">₹{invoiceData.total.toFixed(2)}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-gray-300 p-6">
          <div className="grid grid-cols-2 gap-8">
            <div>
              <h4 className="font-semibold text-sm mb-2">Bank Details</h4>
              <div className="text-xs space-y-1">
                <p><strong>Bank Name:</strong> {invoiceData.bankDetails.bankName}</p>
                <p><strong>Branch:</strong> {invoiceData.bankDetails.branch}</p>
                <p><strong>IFSC:</strong> {invoiceData.bankDetails.ifsc}</p>
                <p><strong>Account No:</strong> {invoiceData.bankDetails.accountNo}</p>
              </div>
              
              <div className="mt-4">
                <h4 className="font-semibold text-sm mb-2">Terms & Conditions</h4>
                <div className="text-xs whitespace-pre-line">{invoiceData.termsAndConditions}</div>
              </div>
            </div>
            
            <div className="text-right">
              <div className="mb-8">
                <p className="text-sm">Customer Seal & Signature</p>
                <div className="h-16 border-b border-gray-300 mt-2"></div>
              </div>
              
              <div>
                <p className="text-sm font-semibold">For {invoiceData.companyDetails.name}</p>
                <div className="h-16 mt-2 mb-2"></div>
                <p className="text-sm">Authorized Signatory</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoicePreview;
