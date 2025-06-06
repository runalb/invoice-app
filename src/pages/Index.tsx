
import { useState } from 'react';
import InvoiceForm from '@/components/InvoiceForm';
import InvoicePreview from '@/components/InvoicePreview';
import { InvoiceData } from '@/types/invoice';
import { calculateInvoice } from '@/utils/calculations';

const Index = () => {
  const [invoiceData, setInvoiceData] = useState<InvoiceData>({
    invoiceNo: '',
    date: new Date().toISOString().split('T')[0],
    deliveryNote: '',
    paymentTerms: '',
    supplierRef: '',
    buyerOrderNo: '',
    dispatchDetails: '',
    destination: '',
    deliveryNoteDate: '',
    companyDetails: {
      name: 'Manorma Industries',
      address: 'M-92, MIDC Nangaon Peth Amravati',
      gstin: '27DXBPB6351N1ZA',
      state: 'Maharashtra, Code: 27',
      contact: '8975575369',
      email: 'manoramaindutry@gmail.com'
    },
    buyerDetails: {
      name: '',
      address: '',
      district: '',
      gstin: '',
      state: ''
    },
    items: [{
      id: '1',
      srNo: 1,
      description: '',
      hsnCode: '',
      gstRate: 5,
      quantity: 1,
      rate: 0,
      unit: 'Nos',
      amount: 0
    }],
    bankDetails: {
      bankName: 'UCO Bank',
      branch: '',
      ifsc: '',
      accountNo: ''
    },
    termsAndConditions: '1. Payment should be made within 30 days.\n2. All disputes subject to local jurisdiction.',
    subtotal: 0,
    cgst: 0,
    sgst: 0,
    roundOff: 0,
    total: 0,
    amountInWords: ''
  });

  const [showFullPreview, setShowFullPreview] = useState(false);

  const handleInvoiceUpdate = (data: InvoiceData) => {
    const calculatedData = calculateInvoice(data);
    setInvoiceData(calculatedData);
  };

  const handleInvoiceCreate = (data: InvoiceData) => {
    const calculatedData = calculateInvoice(data);
    setInvoiceData(calculatedData);
    setShowFullPreview(true);
  };

  const handleBackToForm = () => {
    setShowFullPreview(false);
  };

  if (showFullPreview) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto py-8 px-4">
          <div className="bg-white rounded-lg shadow-lg">
            <div className="bg-blue-600 text-white p-6 rounded-t-lg">
              <h1 className="text-3xl font-bold">Tax Invoice Generator</h1>
              <p className="text-blue-100 mt-2">Create professional GST invoices with automatic calculations</p>
            </div>
            <InvoicePreview invoiceData={invoiceData} onBack={handleBackToForm} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto py-8 px-4">
        <div className="bg-white rounded-lg shadow-lg mb-6">
          <div className="bg-blue-600 text-white p-6 rounded-t-lg">
            <h1 className="text-3xl font-bold">Tax Invoice Generator</h1>
            <p className="text-blue-100 mt-2">Create professional GST invoices with automatic calculations</p>
          </div>
        </div>
        
        <div className="flex gap-6">
          {/* Form Section - 70% width */}
          <div className="w-[70%] bg-white rounded-lg shadow-lg">
            <InvoiceForm 
              onSubmit={handleInvoiceCreate} 
              onUpdate={handleInvoiceUpdate}
              initialData={invoiceData}
            />
          </div>
          
          {/* Live Preview Section - 30% width */}
          <div className="w-[30%] bg-white rounded-lg shadow-lg">
            <div className="p-4 border-b bg-gray-50 rounded-t-lg">
              <h2 className="text-xl font-semibold text-gray-800">Live Preview</h2>
              <p className="text-gray-600 text-sm">See how your invoice will look</p>
            </div>
            <div className="p-1 h-[80vh] overflow-y-auto">
              <div className="transform scale-[0.4] origin-top-left w-[250%] h-[250%]">
                <InvoicePreview invoiceData={invoiceData} showControls={false} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
