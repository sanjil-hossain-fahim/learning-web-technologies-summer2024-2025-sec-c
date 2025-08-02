document.addEventListener('DOMContentLoaded', function()
 {
    
    const calculatorContainer = document.getElementById('calculator-container');
    
   
    const calculator = document.createElement('div');
    calculator.className = 'calculator';
    
   
    const display = document.createElement('div');
    display.className = 'display';
    
    const previousOperand = document.createElement('div');
    previousOperand.className = 'previous-operand';
    
    const currentOperand = document.createElement('div');
    currentOperand.className = 'current-operand';
    currentOperand.textContent = '0';
    
    display.appendChild(previousOperand);
    display.appendChild(currentOperand);
    
   
    const buttons = document.createElement('div');
    buttons.className = 'buttons';
    
    
    const buttonDefinitions = [
        { text: 'AC', class: 'clear span-two', action: 'clear' },
        { text: 'DEL', class: 'delete', action: 'delete' },
        { text: '/', class: 'operator', action: 'divide' },
        { text: '7', class: 'number', action: '7' },
        { text: '8', class: 'number', action: '8' },
        { text: '9', class: 'number', action: '9' },
        { text: '*', class: 'operator', action: 'multiply' },
        { text: '4', class: 'number', action: '4' },
        { text: '5', class: 'number', action: '5' },
        { text: '6', class: 'number', action: '6' },
        { text: '-', class: 'operator', action: 'subtract' },
        { text: '1', class: 'number', action: '1' },
        { text: '2', class: 'number', action: '2' },
        { text: '3', class: 'number', action: '3' },
        { text: '+', class: 'operator', action: 'add' },
        { text: '0', class: 'number', action: '0' },
        { text: '.', class: 'number', action: 'decimal' },
        { text: '=', class: 'equals span-two', action: 'equals' }
    ];
    
    
    buttonDefinitions.forEach(buttonDef => {
        const button = document.createElement('button');
        button.textContent = buttonDef.text;
        button.className = buttonDef.class;
        button.dataset.action = buttonDef.action;
        buttons.appendChild(button);
    });
    
   
    calculator.appendChild(display);
    calculator.appendChild(buttons);
    calculatorContainer.appendChild(calculator);
    
   
    let currentOperandValue = '0';
    let previousOperandValue = '';
    let operation = undefined;
    
     function updateDisplay() {
        currentOperand.textContent = currentOperandValue;
        if (operation != null) {
            previousOperand.textContent = `${previousOperandValue} ${operation}`;
        } else {
            previousOperand.textContent = '';
        }
    }
    
     function appendNumber(number) {
        if (number === '.' && currentOperandValue.includes('.')) return;
        if (currentOperandValue === '0' && number !== '.') {
            currentOperandValue = number.toString();
        } else {
            currentOperandValue = currentOperandValue.toString() + number.toString();
        }
    }
    
    
    function chooseOperation(op) {
        if (currentOperandValue === '') return;
        if (previousOperandValue !== '') {
            compute();
        }
        operation = op;
        previousOperandValue = currentOperandValue;
        currentOperandValue = '';
    }
    
   
    function compute() {
        let computation;
        const prev = parseFloat(previousOperandValue);
        const current = parseFloat(currentOperandValue);
        if (isNaN(prev) || isNaN(current)) return;
        
        switch (operation) {
            case 'add':
                computation = prev + current;
                break;
            case 'subtract':
                computation = prev - current;
                break;
            case 'multiply':
                computation = prev * current;
                break;
            case 'divide':
                computation = prev / current;
                break;
            default:
                return;
        }
        
        currentOperandValue = computation.toString();
        operation = undefined;
        previousOperandValue = '';
    }
    
   
    function clear() {
        currentOperandValue = '0';
        previousOperandValue = '';
        operation = undefined;
    }
    
   
    function deleteNumber() {
        if (currentOperandValue.length === 1) {
            currentOperandValue = '0';
        } else {
            currentOperandValue = currentOperandValue.slice(0, -1);
        }
    }
    
    buttons.addEventListener('click', (e) => {
        if (e.target.tagName === 'BUTTON') {
            const action = e.target.dataset.action;
            
            switch (action) {
                case 'clear':
                    clear();
                    break;
                case 'delete':
                    deleteNumber();
                    break;
                case 'add':
                case 'subtract':
                case 'multiply':
                case 'divide':
                    chooseOperation(action);
                    break;
                case 'equals':
                    compute();
                    break;
                case 'decimal':
                    appendNumber('.');
                    break;
                default:
                    if (action >= '0' && action <= '9') {
                        appendNumber(action);
                    }
            }
            
            updateDisplay();
        }
    });
    
   
    updateDisplay();
});