let currentInput = '0';
let previousInput = '';
let operation = null;
let resetScreen = false;

function updateDisplay() {
    const display = document.getElementById('display');
    if (display) {
        display.textContent = currentInput;
    }
}

function appendToDisplay(number) {
    if (currentInput === '0' || resetScreen) {
        currentInput = '';
        resetScreen = false;
    }
    
    if (number === '.' && currentInput.includes('.')) return;
    
    currentInput += number;
    updateDisplay();
}

function clearDisplay() {
    currentInput = '0';
    previousInput = '';
    operation = null;
    updateDisplay();
}

function backspace() {
    if (currentInput.length === 1) {
        currentInput = '0';
    } else {
        currentInput = currentInput.slice(0, -1);
    }
    updateDisplay();
}

function setOperation(op) {
    if (currentInput === '0') return;
    
    if (operation !== null) calculate();
    previousInput = currentInput;
    operation = op;
    resetScreen = true;
}

function calculate() {
    let result;
    const prev = parseFloat(previousInput);
    const current = parseFloat(currentInput);
    
    if (isNaN(prev) || isNaN(current)) return;
    
    switch (operation) {
        case '+':
            result = prev + current;
            break;
        case '-':
            result = prev - current;
            break;
        case '*':
            result = prev * current;
            break;
        case '/':
            result = prev / current;
            break;
        case '%':
            result = prev % current;
            break;
        default:
            return;
    }
    
    currentInput = result.toString();
    operation = null;
    updateDisplay();
}

// Initialize calculator
document.addEventListener('DOMContentLoaded', function() {
    updateDisplay();
    
    // Keyboard support
    document.addEventListener('keydown', function(e) {
        if (e.key >= '0' && e.key <= '9') appendToDisplay(e.key);
        else if (e.key === '.') appendToDisplay('.');
        else if (e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/') {
            setOperation(e.key);
        }
        else if (e.key === '%') appendToDisplay('%');
        else if (e.key === 'Enter' || e.key === '=') calculate();
        else if (e.key === 'Escape') clearDisplay();
        else if (e.key === 'Backspace') backspace();
    });
});