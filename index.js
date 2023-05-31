window.onload = function() {
    const calculator = document.getElementById('calculator');
    const display = document.getElementById('display');
  
    let currentNumber = '';
    let previousNumber = '';
    let currentOperator = null;
  
    function clear() {
      currentNumber = '';
      previousNumber = '';
      currentOperator = null;
      display.textContent = '0';
    }
  
    function appendNumber(number) {
      if (number === '.' && currentNumber.includes('.')) return;
      if (currentNumber === '0' && number !== '.') {
        currentNumber = '';
      }
      currentNumber += number;
      updateDisplay();
    }
  
    function chooseOperator(operator) {
      if (currentOperator && currentNumber !== '') {
        calculate();
      }
      currentOperator = operator;
      previousNumber = currentNumber;
      currentNumber = '';
    }
  
    function calculate() {
      let result;
      const previous = parseFloat(previousNumber);
      const current = parseFloat(currentNumber);
      if (isNaN(previous) || isNaN(current)) return;
      switch (currentOperator) {
        case '+':
          result = previous + current;
          break;
        case '-':
          result = previous - current;
          break;
        case '*':
          result = previous * current;
          break;
        case '/':
          result = previous / current;
          break;
        default:
          return;
      }
      currentNumber = result.toString();
      currentOperator = null;
      previousNumber = '';
      updateDisplay();
    }
  
    function updateDisplay() {
      if (currentOperator) {
        display.textContent = previousNumber + ' ' + currentOperator + ' ' + currentNumber;
      } else {
        display.textContent = currentNumber;
      }
    }
  
    function backspace() {
      currentNumber = currentNumber.slice(0, -1);
      updateDisplay();
    }
  
    calculator.addEventListener('click', (event) => {
      const { target } = event;
      if (!target.matches('button')) return;
  
      if (target.id === 'clear') {
        clear();
        return;
      }
  
      if (target.id === 'equals') {
        calculate();
        return;
      }
  
      if (target.id === 'decimal') {
        appendNumber('.');
        return;
      }
  
      if (target.id === 'backspace') {
        backspace();
        return;
      }
  
      if (target.id === 'add' || target.id === 'subtract' || target.id === 'multiply' || target.id === 'divide') {
        chooseOperator(target.textContent);
        return;
      }
  
      appendNumber(target.textContent);
    });
  };
  