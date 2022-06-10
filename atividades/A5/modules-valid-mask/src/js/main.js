import { isCPFValid } from './modules/valid.js';
import './modules/mask.js'

document.querySelector('.form').addEventListener('submit', (event) => {
  validate(event);
  return false;
});

function validate(event) {
  event.preventDefault();
  const values = getValues();
  console.log(isCPFValid(values.cpf));
}

function getValues() {
  const campos = ['nome', 'cpf', 'dt_nasc', 'email', 'fone', 'cep'];
  const values = {};

  campos.forEach((id) => {
    values[id] = document.querySelector('input#' + id).value;
  });

  return values;
}
