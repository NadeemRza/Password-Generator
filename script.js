const resultEl = document.getElementById('result')
const lengthEl = document.getElementById('length')
const uppercaseEl = document.getElementById('uppercase')
const lowercaseEl = document.getElementById('lowercase')
const numbersEl = document.getElementById('numbers')
const symbolsEl = document.getElementById('symbols')
const generateEl = document.getElementById('generate')
const clipboardEl = document.getElementById('clipboard')

const randomFunc = {
    lower: getRandomLower,
    upper: getRandomUpper,
    number: getRandomNumber,
    symbol: getRandomSymbol
}


clipboardEl.addEventListener('click', () => {
    const input = document.createElement('input');
    const password = resultEl.innerText;

    if(password.length == 0) {
        return;
    }

    input.value = password;
    document.body.appendChild(input);
    input.select();
    document.execCommand('copy');
    input.remove();
    alert("Password copied to clipboard");
})

generateEl.addEventListener('click', () => {
    let length = +lengthEl.value;
    if(length<0) {length = -lengthEl.value}
    const hasLower = lowercaseEl.checked;
    const hasUpper = uppercaseEl.checked;
	const hasNumber = numbersEl.checked;
	const hasSymbol = symbolsEl.checked;
    resultEl.innerText = generatePassword(hasLower, hasUpper, hasNumber, hasSymbol, length);
})

function generatePassword(lower, upper, number, symbol, length) {
    let generatedPassword = '';

    const typeCount = lower + upper + number + symbol;

    const typeArray = [{lower}, {upper}, {number}, {symbol}].filter((item) => Object.values(item)[0]);

    if(typeCount === 0){
        return '';
    }
    
    for(let i =0;i <length; i +=typeCount){
        typeArray.forEach((type) => {
            const funcName = Object.keys(type)
            generatedPassword += randomFunc[funcName]();
        })
    }
    
    const finalPassword = generatedPassword.slice(0, length);

    return finalPassword;
}

function getRandomUpper() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}

function getRandomLower() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}

function getRandomNumber() {
    return String.fromCharCode(Math.floor(Math.random() * 10) + 48);
}

function getRandomSymbol() {
    const symbols = '~`!#$%^&*()-_+|?.,<>"{}=/';

    return symbols[Math.floor(Math.random() * symbols.length)]
}