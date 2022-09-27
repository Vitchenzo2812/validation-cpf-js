// 705.484.450-52 070.987.720-03

function ValidationCPF(cpf) {
  Object.defineProperty(this, 'cpfCleaning', {
    enumerable: true,
    get: function() {
      return cpf.replace(/\D+/g, '');
    },
  });
}
ValidationCPF.prototype.validation = function() {
  if (typeof this.cpfCleaning === 'undefined') return false;
  if (this.cpfCleaning.length !== 11) return false;
  if (this.isSequence()) return false;
  
  const abstractCPF = this.cpfCleaning.slice(0, -2);
  const firstDigit = this.createDigit(abstractCPF);
  const secondDigit = this.createDigit(abstractCPF + firstDigit);

  const newCPF = abstractCPF + firstDigit + secondDigit;

  return newCPF === this.cpfCleaning;
};
ValidationCPF.prototype.createDigit = function(abstractCPF) {
  const CpfArray = Array.from(abstractCPF);
  let regressive = CpfArray.length + 1;

  const total = CpfArray.reduce((acc, value) => {
    acc += (regressive * Number(value));
    regressive--;
    return acc;
  }, 0);

  const digit = 11 - (total % 11);
  return digit > 9 ? '0' : String(digit);
}

ValidationCPF.prototype.isSequence = function() {
  const sequence = this.cpfCleaning[0].repeat(this.cpfCleaning.length);
  return sequence === this.cpfCleaning;
}

const cpf = new ValidationCPF('705.481.450-52');

if(cpf.validation()) {
  console.log('Valid CPF')
} else {
  console.log('Inválid CPF')
}