let currentDisplay = '0';
let shouldResetDisplay = false;

function updateDisplay() {
    const displayElement = document.getElementById('result');
    displayElement.textContent = currentDisplay;
}

function appendToDisplay(value) {
    if (currentDisplay === '0' || shouldResetDisplay) {
        currentDisplay = value;
        shouldResetDisplay = false;
    } else {
        currentDisplay += value;
    }
    updateDisplay();
}

function clearDisplay() {
    currentDisplay = '0';
    updateDisplay();
}

function calculate() {
    try {
        // Replace × with * for evaluation
        let expression = currentDisplay.replace(/×/g, '*');
        
        // Basic validation to prevent unsafe evaluation
        if (/[^0-9+\-*/.()]/.test(expression)) {
            throw new Error('Invalid expression');
        }
        
        // Evaluate the expression
        const result = eval(expression);
        
        // Handle division by zero and other math errors
        if (!isFinite(result)) {
            throw new Error('Math error');
        }
        
        currentDisplay = result.toString();
        shouldResetDisplay = true;
        updateDisplay();
    } catch (error) {
        currentDisplay = 'Error';
        shouldResetDisplay = true;
        updateDisplay();
        
        // Reset after 1 second
        setTimeout(() => {
            currentDisplay = '0';
            updateDisplay();
        }, 1000);
    }
}

// Initialize display
updateDisplay();

// Add keyboard support
document.addEventListener('keydown', function(event) {
    const key = event.key;
    
    if (key >= '0' && key <= '9') {
        appendToDisplay(key);
    } else if (key === '.') {
        appendToDisplay('.');
    } else if (key === '+' || key === '-' || key === '*') {
        appendToDisplay(key === '*' ? '×' : key);
    } else if (key === '/') {
        event.preventDefault(); // Prevent browser search
        appendToDisplay('/');
    } else if (key === 'Enter' || key === '=') {
        calculate();
    } else if (key === 'Escape' || key === 'c' || key === 'C') {
        clearDisplay();
    } else if (key === 'Backspace') {
        if (currentDisplay.length > 1) {
            currentDisplay = currentDisplay.slice(0, -1);
        } else {
            currentDisplay = '0';
        }
        updateDisplay();
    }
});