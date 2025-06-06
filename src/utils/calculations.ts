
import { InvoiceData } from '@/types/invoice';
import { numberToWords } from './numberToWords';

export const calculateInvoice = (data: InvoiceData): InvoiceData => {
  // Calculate subtotal
  const subtotal = data.items.reduce((sum, item) => sum + item.amount, 0);
  
  // Calculate CGST and SGST (each at 2.5% as requested)
  const cgst = subtotal * 0.025;
  const sgst = subtotal * 0.025;
  
  // Calculate total before round off
  const totalBeforeRoundOff = subtotal + cgst + sgst;
  
  // Calculate round off
  const roundedTotal = Math.round(totalBeforeRoundOff);
  const roundOff = roundedTotal - totalBeforeRoundOff;
  
  // Final total
  const total = roundedTotal;
  
  // Convert amount to words
  const amountInWords = numberToWords(total);
  
  return {
    ...data,
    subtotal,
    cgst,
    sgst,
    roundOff,
    total,
    amountInWords
  };
};
