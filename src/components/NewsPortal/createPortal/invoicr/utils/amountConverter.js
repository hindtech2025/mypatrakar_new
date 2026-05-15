export const convertAmountToWords = (amount) => {
  if (!amount || isNaN(amount)) return "Zero Rupees Only";
  
  const num = parseFloat(amount);
  if (num === 0) return "Zero Rupees Only";
  
  const ones = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine'];
  const teens = ['Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];
  const tens = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];
  
  // Convert to integer and decimal parts
  const integerPart = Math.floor(num);
  const decimalPart = Math.round((num - integerPart) * 100);
  
  let words = '';
  
  // Helper function for converting numbers less than 1000
  const convertUnderThousand = (n) => {
    if (n === 0) return '';
    if (n < 10) return ones[n];
    if (n < 20) return teens[n - 10];
    if (n < 100) return tens[Math.floor(n / 10)] + (n % 10 !== 0 ? ' ' + ones[n % 10] : '');
    return ones[Math.floor(n / 100)] + ' Hundred' + (n % 100 !== 0 ? ' ' + convertUnderThousand(n % 100) : '');
  };
  
  // Convert integer part
  if (integerPart < 1000) {
    words = convertUnderThousand(integerPart);
  } else if (integerPart < 100000) {
    words = convertUnderThousand(Math.floor(integerPart / 1000)) + ' Thousand ' + convertUnderThousand(integerPart % 1000);
  } else if (integerPart < 10000000) {
    words = convertUnderThousand(Math.floor(integerPart / 100000)) + ' Lakh ' + convertUnderThousand(integerPart % 100000);
  } else {
    words = 'Rupees ' + integerPart;
  }
  
  // Add decimal part
  if (decimalPart > 0) {
    words += ' and ' + decimalPart + ' Paisa';
  }
  
  return words + ' Only';
};