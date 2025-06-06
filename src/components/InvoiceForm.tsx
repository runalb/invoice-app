
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Trash2 } from 'lucide-react';
import { InvoiceData, InvoiceItem, CompanyDetails, BuyerDetails, BankDetails } from '@/types/invoice';
import { toast } from '@/hooks/use-toast';

interface InvoiceFormProps {
  onSubmit: (data: InvoiceData) => void;
  onUpdate?: (data: InvoiceData) => void;
  initialData?: InvoiceData;
}

const InvoiceForm: React.FC<InvoiceFormProps> = ({ onSubmit, onUpdate, initialData }) => {
  const [companyDetails] = useState<CompanyDetails>({
    name: 'Manorma Industries',
    address: 'M-92, MIDC Nangaon Peth Amravati',
    gstin: '27DXBPB6351N1ZA',
    state: 'Maharashtra, Code: 27',
    contact: '8975575369',
    email: 'manoramaindutry@gmail.com'
  });

  const [buyerDetails, setBuyerDetails] = useState<BuyerDetails>(
    initialData?.buyerDetails || {
      name: '',
      address: '',
      district: '',
      gstin: '',
      state: ''
    }
  );

  const [invoiceInfo, setInvoiceInfo] = useState({
    invoiceNo: initialData?.invoiceNo || '',
    date: initialData?.date || new Date().toISOString().split('T')[0],
    deliveryNote: initialData?.deliveryNote || '',
    paymentTerms: initialData?.paymentTerms || '',
    supplierRef: initialData?.supplierRef || '',
    buyerOrderNo: initialData?.buyerOrderNo || '',
    dispatchDetails: initialData?.dispatchDetails || '',
    destination: initialData?.destination || '',
    deliveryNoteDate: initialData?.deliveryNoteDate || ''
  });

  const [items, setItems] = useState<InvoiceItem[]>(
    initialData?.items || [
      {
        id: '1',
        srNo: 1,
        description: '',
        hsnCode: '',
        gstRate: 5,
        quantity: 1,
        rate: 0,
        unit: 'Nos',
        amount: 0
      }
    ]
  );

  const [bankDetails, setBankDetails] = useState<BankDetails>(
    initialData?.bankDetails || {
      bankName: 'UCO Bank',
      branch: '',
      ifsc: '',
      accountNo: ''
    }
  );

  const [termsAndConditions, setTermsAndConditions] = useState(
    initialData?.termsAndConditions || '1. Payment should be made within 30 days.\n2. All disputes subject to local jurisdiction.'
  );

  // Trigger live update whenever form data changes
  useEffect(() => {
    if (onUpdate) {
      const invoiceData: InvoiceData = {
        ...invoiceInfo,
        companyDetails,
        buyerDetails,
        items,
        bankDetails,
        termsAndConditions,
        subtotal: 0,
        cgst: 0,
        sgst: 0,
        roundOff: 0,
        total: 0,
        amountInWords: ''
      };
      onUpdate(invoiceData);
    }
  }, [companyDetails, buyerDetails, invoiceInfo, items, bankDetails, termsAndConditions, onUpdate]);

  const addItem = () => {
    const newItem: InvoiceItem = {
      id: Date.now().toString(),
      srNo: items.length + 1,
      description: '',
      hsnCode: '',
      gstRate: 5,
      quantity: 1,
      rate: 0,
      unit: 'Nos',
      amount: 0
    };
    setItems([...items, newItem]);
  };

  const removeItem = (id: string) => {
    if (items.length > 1) {
      setItems(items.filter(item => item.id !== id));
    }
  };

  const updateItem = (id: string, field: keyof InvoiceItem, value: any) => {
    setItems(items.map(item => {
      if (item.id === id) {
        const updated = { ...item, [field]: value };
        if (field === 'quantity' || field === 'rate') {
          updated.amount = updated.quantity * updated.rate;
        }
        return updated;
      }
      return item;
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!invoiceInfo.invoiceNo) {
      toast({ title: "Error", description: "Invoice number is required", variant: "destructive" });
      return;
    }

    if (!buyerDetails.name) {
      toast({ title: "Error", description: "Buyer name is required", variant: "destructive" });
      return;
    }

    const invoiceData: InvoiceData = {
      ...invoiceInfo,
      companyDetails,
      buyerDetails,
      items,
      bankDetails,
      termsAndConditions,
      subtotal: 0,
      cgst: 0,
      sgst: 0,
      roundOff: 0,
      total: 0,
      amountInWords: ''
    };

    onSubmit(invoiceData);
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 space-y-6">
      {/* Invoice Information */}
      <Card>
        <CardHeader>
          <CardTitle>Invoice Information</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <Label htmlFor="invoiceNo">Invoice No. *</Label>
            <Input
              id="invoiceNo"
              value={invoiceInfo.invoiceNo}
              onChange={(e) => setInvoiceInfo({ ...invoiceInfo, invoiceNo: e.target.value })}
              required
            />
          </div>
          <div>
            <Label htmlFor="date">Date</Label>
            <Input
              id="date"
              type="date"
              value={invoiceInfo.date}
              onChange={(e) => setInvoiceInfo({ ...invoiceInfo, date: e.target.value })}
            />
          </div>
          <div>
            <Label htmlFor="deliveryNote">Delivery Note</Label>
            <Input
              id="deliveryNote"
              value={invoiceInfo.deliveryNote}
              onChange={(e) => setInvoiceInfo({ ...invoiceInfo, deliveryNote: e.target.value })}
            />
          </div>
          <div>
            <Label htmlFor="paymentTerms">Payment Terms</Label>
            <Input
              id="paymentTerms"
              value={invoiceInfo.paymentTerms}
              onChange={(e) => setInvoiceInfo({ ...invoiceInfo, paymentTerms: e.target.value })}
            />
          </div>
          <div>
            <Label htmlFor="supplierRef">Supplier Ref.</Label>
            <Input
              id="supplierRef"
              value={invoiceInfo.supplierRef}
              onChange={(e) => setInvoiceInfo({ ...invoiceInfo, supplierRef: e.target.value })}
            />
          </div>
          <div>
            <Label htmlFor="buyerOrderNo">Buyer Order No.</Label>
            <Input
              id="buyerOrderNo"
              value={invoiceInfo.buyerOrderNo}
              onChange={(e) => setInvoiceInfo({ ...invoiceInfo, buyerOrderNo: e.target.value })}
            />
          </div>
        </CardContent>
      </Card>

      {/* Buyer Details */}
      <Card>
        <CardHeader>
          <CardTitle>Buyer Details</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="buyerName">Buyer Name *</Label>
            <Input
              id="buyerName"
              value={buyerDetails.name}
              onChange={(e) => setBuyerDetails({ ...buyerDetails, name: e.target.value })}
              required
            />
          </div>
          <div>
            <Label htmlFor="buyerAddress">Address</Label>
            <Textarea
              id="buyerAddress"
              value={buyerDetails.address}
              onChange={(e) => setBuyerDetails({ ...buyerDetails, address: e.target.value })}
            />
          </div>
          <div>
            <Label htmlFor="buyerDistrict">District</Label>
            <Input
              id="buyerDistrict"
              value={buyerDetails.district}
              onChange={(e) => setBuyerDetails({ ...buyerDetails, district: e.target.value })}
            />
          </div>
          <div>
            <Label htmlFor="buyerGstin">GSTIN/UIN</Label>
            <Input
              id="buyerGstin"
              value={buyerDetails.gstin}
              onChange={(e) => setBuyerDetails({ ...buyerDetails, gstin: e.target.value })}
            />
          </div>
          <div>
            <Label htmlFor="buyerState">State</Label>
            <Input
              id="buyerState"
              value={buyerDetails.state}
              onChange={(e) => setBuyerDetails({ ...buyerDetails, state: e.target.value })}
            />
          </div>
        </CardContent>
      </Card>

      {/* Items */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Items</CardTitle>
          <Button type="button" onClick={addItem} size="sm">
            <Plus className="w-4 h-4 mr-2" />
            Add Item
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {items.map((item, index) => (
              <div key={item.id} className="grid grid-cols-1 md:grid-cols-6 gap-4 p-4 border rounded-lg">
                <div>
                  <Label>Description</Label>
                  <Input
                    value={item.description}
                    onChange={(e) => updateItem(item.id, 'description', e.target.value)}
                    placeholder="Item description"
                  />
                </div>
                <div>
                  <Label>HSN/SAC</Label>
                  <Input
                    value={item.hsnCode}
                    onChange={(e) => updateItem(item.id, 'hsnCode', e.target.value)}
                    placeholder="HSN Code"
                  />
                </div>
                <div>
                  <Label>Quantity</Label>
                  <Input
                    type="number"
                    value={item.quantity}
                    onChange={(e) => updateItem(item.id, 'quantity', parseFloat(e.target.value) || 0)}
                  />
                </div>
                <div>
                  <Label>Rate</Label>
                  <Input
                    type="number"
                    step="0.01"
                    value={item.rate}
                    onChange={(e) => updateItem(item.id, 'rate', parseFloat(e.target.value) || 0)}
                  />
                </div>
                <div>
                  <Label>Amount</Label>
                  <Input
                    type="number"
                    value={item.amount.toFixed(2)}
                    readOnly
                    className="bg-gray-50"
                  />
                </div>
                <div className="flex items-end">
                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    onClick={() => removeItem(item.id)}
                    disabled={items.length === 1}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Bank Details */}
      <Card>
        <CardHeader>
          <CardTitle>Bank Details</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="bankName">Bank Name</Label>
            <Input
              id="bankName"
              value={bankDetails.bankName}
              onChange={(e) => setBankDetails({ ...bankDetails, bankName: e.target.value })}
            />
          </div>
          <div>
            <Label htmlFor="branch">Branch/IFSC</Label>
            <Input
              id="branch"
              value={bankDetails.ifsc}
              onChange={(e) => setBankDetails({ ...bankDetails, ifsc: e.target.value })}
              placeholder="IFSC Code"
            />
          </div>
          <div>
            <Label htmlFor="accountNo">Account Number</Label>
            <Input
              id="accountNo"
              value={bankDetails.accountNo}
              onChange={(e) => setBankDetails({ ...bankDetails, accountNo: e.target.value })}
            />
          </div>
          <div>
            <Label htmlFor="branchName">Branch Name</Label>
            <Input
              id="branchName"
              value={bankDetails.branch}
              onChange={(e) => setBankDetails({ ...bankDetails, branch: e.target.value })}
            />
          </div>
        </CardContent>
      </Card>

      {/* Terms and Conditions */}
      <Card>
        <CardHeader>
          <CardTitle>Terms and Conditions</CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea
            value={termsAndConditions}
            onChange={(e) => setTermsAndConditions(e.target.value)}
            rows={4}
            placeholder="Enter terms and conditions..."
          />
        </CardContent>
      </Card>

      <div className="flex justify-center">
        <Button type="submit" size="lg" className="w-full md:w-auto">
          Generate Invoice
        </Button>
      </div>
    </form>
  );
};

export default InvoiceForm;
