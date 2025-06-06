
const ones = [
  '', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine',
  'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen',
  'seventeen', 'eighteen', 'nineteen'
];

const tens = [
  '', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'
];

const scales = ['', 'thousand', 'million', 'billion', 'trillion'];

function convertHundreds(num: number): string {
  let result = '';
  
  if (num > 99) {
    result += ones[Math.floor(num / 100)] + ' hundred ';
    num %= 100;
  }
  
  if (num > 19) {
    result += tens[Math.floor(num / 10)] + ' ';
    num %= 10;
  }
  
  if (num > 0) {
    result += ones[num] + ' ';
  }
  
  return result;
}

export function numberToWords(num: number): string {
  if (num === 0) return 'zero rupees only';
  
  let result = '';
  let scaleIndex = 0;
  
  // Handle the integer part
  let integerPart = Math.floor(num);
  
  if (integerPart === 0) {
    result = 'zero';
  } else {
    while (integerPart > 0) {
      let chunk = integerPart % 1000;
      if (chunk !== 0) {
        let chunkWords = convertHundreds(chunk);
        if (scales[scaleIndex]) {
          chunkWords += scales[scaleIndex] + ' ';
        }
        result = chunkWords + result;
      }
      integerPart = Math.floor(integerPart / 1000);
      scaleIndex++;
    }
  }
  
  // Handle decimal part (paise)
  let decimalPart = Math.round((num - Math.floor(num)) * 100);
  
  result = result.trim() + ' rupees';
  
  if (decimalPart > 0) {
    result += ' and ' + convertHundreds(decimalPart).trim() + ' paise';
  }
  
  result += ' only';
  
  // Capitalize first letter
  return result.charAt(0).toUpperCase() + result.slice(1);
}
