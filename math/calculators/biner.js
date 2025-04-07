  // Conversion functions
  function convertFromBinary() {
    const binaryInput = document.getElementById('binaryInput').value;
    if (!binaryInput) return clearResults();
    
    // Validate binary input
    if (!/^[01]+$/.test(binaryInput)) {
      document.getElementById('binaryInput').classList.add('border-red-500');
      return;
    } else {
      document.getElementById('binaryInput').classList.remove('border-red-500');
    }
    
    const decimal = parseInt(binaryInput, 2);
    const hex = decimal.toString(16).toUpperCase();
    
    updateResults(binaryInput, decimal.toString(), hex);
  }

  function convertFromDecimal() {
    const decimalInput = document.getElementById('decimalInput').value;
    if (!decimalInput) return clearResults();
    
    // Validate decimal input
    if (!/^\d+$/.test(decimalInput)) {
      document.getElementById('decimalInput').classList.add('border-red-500');
      return;
    } else {
      document.getElementById('decimalInput').classList.remove('border-red-500');
    }
    
    const decimal = parseInt(decimalInput, 10);
    const binary = decimal.toString(2);
    const hex = decimal.toString(16).toUpperCase();
    
    updateResults(binary, decimalInput, hex);
  }

  function convertFromHex() {
    const hexInput = document.getElementById('hexInput').value;
    if (!hexInput) return clearResults();
    
    // Validate hex input
    if (!/^[0-9A-Fa-f]+$/.test(hexInput)) {
      document.getElementById('hexInput').classList.add('border-red-500');
      return;
    } else {
      document.getElementById('hexInput').classList.remove('border-red-500');
    }
    
    const decimal = parseInt(hexInput, 16);
    const binary = decimal.toString(2);
    
    updateResults(binary, decimal.toString(), hexInput.toUpperCase());
  }

  function updateResults(binary, decimal, hex) {
    document.getElementById('binaryResult').textContent = binary;
    document.getElementById('decimalResult').textContent = decimal;
    document.getElementById('hexResult').textContent = hex;
    
    // Update other inputs without triggering conversion
    document.getElementById('binaryInput').value = binary;
    document.getElementById('decimalInput').value = decimal;
    document.getElementById('hexInput').value = hex.toUpperCase();
    
    // Remove event listeners temporarily to prevent infinite loop
    const binaryInput = document.getElementById('binaryInput');
    const decimalInput = document.getElementById('decimalInput');
    const hexInput = document.getElementById('hexInput');
    
    binaryInput.removeEventListener('input', convertFromBinary);
    decimalInput.removeEventListener('input', convertFromDecimal);
    hexInput.removeEventListener('input', convertFromHex);
    
    binaryInput.value = binary;
    decimalInput.value = decimal;
    hexInput.value = hex.toUpperCase();
    
    // Re-add event listeners
    binaryInput.addEventListener('input', convertFromBinary);
    decimalInput.addEventListener('input', convertFromDecimal);
    hexInput.addEventListener('input', convertFromHex);
  }

  function clearResults() {
    document.getElementById('binaryResult').textContent = '-';
    document.getElementById('decimalResult').textContent = '-';
    document.getElementById('hexResult').textContent = '-';
  }

  function clearAll() {
    document.getElementById('binaryInput').value = '';
    document.getElementById('decimalInput').value = '';
    document.getElementById('hexInput').value = '';
    clearResults();
    
    // Remove error highlights
    document.getElementById('binaryInput').classList.remove('border-red-500');
    document.getElementById('decimalInput').classList.remove('border-red-500');
    document.getElementById('hexInput').classList.remove('border-red-500');
  }

  // Initialize
  document.addEventListener('DOMContentLoaded', function() {
    // Add border styles dynamically
    const style = document.createElement('style');
    style.textContent = `
      .border-red-500 {
        border-color: #ef4444;
      }
      .dark .border-red-500 {
        border-color: #f87171;
      }
    `;
    document.head.appendChild(style);
  });