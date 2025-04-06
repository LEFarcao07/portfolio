let currentInput = '0';
const display = document.getElementById('display');

function updateDisplay() {
    display.innerText = currentInput;
}

function appendToDisplay(value) {
    if (currentInput === '0' || currentInput === 'Error') {
        currentInput = value;
    } else {
        currentInput += value;
    }
    updateDisplay();
}

function appendFunction(func) {
    if (currentInput === '0' || currentInput === 'Error') {
        currentInput = func;
    } else {
        currentInput += func;
    }
    updateDisplay();
}

function clearDisplay() {
    currentInput = '0';
    updateDisplay();
}

function backspace() {
    if (currentInput.length === 1 || currentInput === 'Error') {
        currentInput = '0';
    } else {
        currentInput = currentInput.slice(0, -1);
    }
    updateDisplay();
}

function calculate() {
    try {
        // Replace visual representations with mathjs compatible ones
        let expression = currentInput
            .replace(/\^/g, '^') // Keep caret for exponentiation
            .replace(/√/g, 'sqrt')
            .replace(/π/g, 'pi');
        
        // Evaluate using math.js for safe evaluation
        const result = math.evaluate(expression);
        currentInput = result.toString();
    } catch (error) {
        currentInput = 'Error';
    }
    updateDisplay();
}

// Keyboard support
document.addEventListener('keydown', (e) => {
    if (e.key >= '0' && e.key <= '9') appendToDisplay(e.key);
    else if (e.key === '.') appendToDisplay('.');
    else if (e.key === '(') appendToDisplay('(');
    else if (e.key === ')') appendToDisplay(')');
    else if (e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/') {
        appendToDisplay(e.key);
    }
    else if (e.key === '^') appendToDisplay('^');
    else if (e.key === 'Enter' || e.key === '=') calculate();
    else if (e.key === 'Escape') clearDisplay();
    else if (e.key === 'Backspace') backspace();
});