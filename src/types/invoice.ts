
export interface CompanyDetails {
  name: string;
  address: string;
  gstin: string;
  state: string;
  contact: string;
  email: string;
}

export interface BuyerDetails {
  name: string;
  address: string;
  district: string;
  gstin: string;
  state: string;
}

export interface InvoiceItem {
  id: string;
  srNo: number;
  description: string;
  hsnCode: string;
  gstRate: number;
  quantity: number;
  rate: number;
  unit: string;
  amount: number;
}

export interface BankDetails {
  bankName: string;
  branch: string;
  ifsc: string;
  accountNo: string;
}

export interface InvoiceData {
  invoiceNo: string;
  date: string;
  deliveryNote: string;
  paymentTerms: string;
  supplierRef: string;
  buyerOrderNo: string;
  dispatchDetails: string;
  destination: string;
  deliveryNoteDate: string;
  
  companyDetails: CompanyDetails;
  buyerDetails: BuyerDetails;
  items: InvoiceItem[];
  bankDetails: BankDetails;
  
  termsAndConditions: string;
  
  // Calculated fields
  subtotal: number;
  cgst: number;
  sgst: number;
  roundOff: number;
  total: number;
  amountInWords: string;
}
