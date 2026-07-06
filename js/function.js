//Функция для проверки длины строки
const checkString = (string, length) => string.length <= length;
checkString();

//Функция для проверки, является ли строка палиндромом

const isPalindrome = (string) => {
  const normalized = string
    .replaceAll(' ', '')
    .toLowerCase();
  let reversed = '';
  for (let i = normalized.length - 1; i >= 0; i--) {
    reversed += normalized[i];
  }
  return normalized === reversed;
};
isPalindrome();

//Функция извлечения цифр
const extractDigits = (string) => {
  if (typeof string === 'number') {
    string = string.toString();
  }
  let digits = '';
  for (let i = 0; i < string.length; i++) {
    let char = string[i];
    if (char >= '0' && char <= '9') {
      digits += char;
    }
  }
  return parseInt(digits, 10);
};
extractDigits();
