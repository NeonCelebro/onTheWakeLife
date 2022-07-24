export function generate() {
  let password = '';
  const specialCharacters = '#$%';
  const loverCaseCharacters = 'abcdefghijklmnopqrstuvwxyz';
  const upperCaseCharacters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const digits = '0123456789';

  for (let i = 0; i < 1; ++i) {
    password += upperCaseCharacters.charAt(Math.floor(Math.random() * upperCaseCharacters.length));
  }

  for (let i = 0; i < 7; ++i) {
    password += digits.charAt(Math.floor(Math.random() * digits.length));
  }

  for (let i = 0; i < 1; ++i) {
    password += loverCaseCharacters.charAt(Math.floor(Math.random() * loverCaseCharacters.length));
  }

  for (let i = 0; i < 1; ++i) {
    password += specialCharacters.charAt(Math.floor(Math.random() * specialCharacters.length));
  }
  return password;
}
