function checkRights() {
    const footerText = document.getElementById('footer').textContent;
    if (!footerText.includes('Al-Hassan Al-Dabaa')) {
        alert('Warning: changed Copyright. Tool will stop working.');
        disableCalculator();
    }
}
function disableCalculator() {
    const inputs = document.querySelectorAll('input');
    inputs.forEach(input => input.disabled = true);
}

// حساب المساحة
function formatAndCalculateArea() {
    const length = parseFloat(document.getElementById('length').value.replace(/,/g, '')) || 0;
    const width = parseFloat(document.getElementById('width').value.replace(/,/g, '')) || 0;

    document.getElementById('length').value = formatNumber(length);
    document.getElementById('width').value = formatNumber(width);
    document.getElementById('area-result').value = formatNumber(length * width);
}

// حساب المواريث
function formatAndCalculateInheritance() {
    const total = parseFloat(document.getElementById('total-assets').value.replace(/,/g, '')) || 0;
    const percentage = parseFloat(document.getElementById('percentage').value.replace(/,/g, '')) || 0;

    document.getElementById('total-assets').value = formatNumber(total);
    document.getElementById('percentage').value = formatNumber(percentage);
    document.getElementById('inheritance-result').value = formatNumber((total * percentage) / 100);
}

// حساب الزوايا والمربعات
function formatAndCalculateSquare() {
    const side = parseFloat(document.getElementById('side').value.replace(/,/g, '')) || 0;

    document.getElementById('side').value = formatNumber(side);
    document.getElementById('square-result').value = formatNumber(side * side);
}

// تنسيق الأرقام بالفواصل فقط (بدون كسور عشرية)
function formatNumber(num) {
    if (!num) return '';
    return parseFloat(num).toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 });
}


// حساب المساحة بالبنة
function formatAndCalculateBenna() {
    const length = parseFloat(document.getElementById('benna-length').value.replace(/,/g, '')) || 0;
    const width = parseFloat(document.getElementById('benna-width').value.replace(/,/g, '')) || 0;

    document.getElementById('benna-length').value = formatNumber(length);
    document.getElementById('benna-width').value = formatNumber(width);
    const area = (length * width) / 44.44; // الحساب باستخدام المعادلة: الطول × العرض ÷ 44.44
    document.getElementById('benna-result').value = formatNumber(area);
}


// حاسبة الذهب
function formatAndCalculateGoldValue() {
    const weight = parseFloat(document.getElementById('gold-weight').value.replace(/,/g, '')) || 0;
    const price = parseFloat(document.getElementById('gold-price').value.replace(/,/g, '')) || 0;

    document.getElementById('gold-weight').value = formatNumber(weight);
    document.getElementById('gold-price').value = formatNumber(price);
    document.getElementById('gold-value').value = formatNumber(weight * price);
}

// حاسبة الفضة
function formatAndCalculateSilverValue() {
    const weight = parseFloat(document.getElementById('silver-weight').value.replace(/,/g, '')) || 0;
    const price = parseFloat(document.getElementById('silver-price').value.replace(/,/g, '')) || 0;

    document.getElementById('silver-weight').value = formatNumber(weight);
    document.getElementById('silver-price').value = formatNumber(price);
    document.getElementById('silver-value').value = formatNumber(weight * price);
}
//الحاسبه
class Calculator {
  constructor(previousOperandTextElement, currentOperandTextElement) {
    this.previousOperandTextElement = previousOperandTextElement
    this.currentOperandTextElement = currentOperandTextElement
    this.clear()
  }

  clear() {
    this.currentOperand = ''
    this.previousOperand = ''
    this.operation = undefined
  }

  delete() {
    this.currentOperand = this.currentOperand.toString().slice(0, -1)
  }

  appendNumber(number) {
    if (number === '.' && this.currentOperand.includes('.')) return
    this.currentOperand = this.currentOperand.toString() + number.toString()
  }

  chooseOperation(operation) {
    if (this.currentOperand === '') return
    if (this.previousOperand !== '') {
      this.compute()
    }
    this.operation = operation
    this.previousOperand = this.currentOperand
    this.currentOperand = ''
  }

  compute() {
    let computation
    const prev = parseFloat(this.previousOperand)
    const current = parseFloat(this.currentOperand)
    if (isNaN(prev) || isNaN(current)) return
    switch (this.operation) {
      case '+':
        computation = prev + current
        break
      case '-':
        computation = prev - current
        break
      case '×':
        computation = prev * current
        break
      case '÷':
        computation = prev / current
        break
      default:
        return
    }
    this.currentOperand = computation
    this.operation = undefined
    this.previousOperand = ''
  }

  getDisplayNumber(number) {
    const stringNumber = number.toString()
    const integerDigits = parseFloat(stringNumber.split('.')[0])
    const decimalDigits = stringNumber.split('.')[1]
    let integerDisplay
    if (isNaN(integerDigits)) {
      integerDisplay = ''
    } else {
      integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 })
    }
    if (decimalDigits != null) {
      return `${integerDisplay}.${decimalDigits}`
    } else {
      return integerDisplay
    }
  }

  updateDisplay() {
    this.currentOperandTextElement.innerText =
      this.getDisplayNumber(this.currentOperand)
    if (this.operation != null) {
      this.previousOperandTextElement.innerText =
        `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
    } else {
      this.previousOperandTextElement.innerText = ''
    }
  }
}


var numberButtons = document.querySelectorAll('[data-number]')
var operationButtons = document.querySelectorAll('[data-operation]')
var equalsButton = document.querySelector('[data-equals]')
var deleteButton = document.querySelector('[data-delete]')
var allClearButton = document.querySelector('[data-all-clear]')
var previousOperandTextElement = document.querySelector('[data-previous-operand]')
var currentOperandTextElement = document.querySelector('[data-current-operand]')

const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement)

numberButtons.forEach(button => {
  button.addEventListener('click', () => {
    calculator.appendNumber(button.innerText)
    calculator.updateDisplay()
  })
})

operationButtons.forEach(button => {
  button.addEventListener('click', () => {
    calculator.chooseOperation(button.innerText)
    calculator.updateDisplay()
  })
})

equalsButton.addEventListener('click', button => {
  calculator.compute()
  calculator.updateDisplay()
})

allClearButton.addEventListener('click', button => {
  calculator.clear()
  calculator.updateDisplay()
})

deleteButton.addEventListener('click', button => {
  calculator.delete()
  calculator.updateDisplay()
})