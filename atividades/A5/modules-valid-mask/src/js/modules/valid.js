export function isCPFValid(cpf) {
  cpf = cpf.replace(/[\s.-]*/gim, '');

  const isCpfRepeatedNumbers = cpf.split('').every((value) => {
    return value == cpf[0];
  });

  if (!cpf || cpf.length != 11 || isCpfRepeatedNumbers) {
    return false;
  }

  let soma = 0;
  let resto;

  for (var i = 1; i <= 9; i++) soma = soma + parseInt(cpf.substring(i - 1, i)) * (11 - i);
  resto = (soma * 10) % 11;
  if (resto == 10 || resto == 11) resto = 0;
  if (resto != parseInt(cpf.substring(9, 10))) return false;
  soma = 0;
  for (var i = 1; i <= 10; i++) soma = soma + parseInt(cpf.substring(i - 1, i)) * (12 - i);
  resto = (soma * 10) % 11;
  if (resto == 10 || resto == 11) resto = 0;
  if (resto != parseInt(cpf.substring(10, 11))) return false;

  return true;
}

function validatePhone(telefone) {
  telefone;
}

function nullishValidation(value) {
  return value || value.length > 0;
}
