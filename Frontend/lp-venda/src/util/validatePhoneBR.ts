
const DDD_VALIDOS = [
  11,12,13,14,15,16,17,18,19,21,22,24,27,28,31,32,33,34,35,37,38,
  41,42,43,44,45,46,47,48,49,51,53,54,55,61,62,64,63,65,66,67,68,69,
  71,73,74,75,77,79,81,82,83,84,85,86,87,88,89,91,92,93,94,95,96,97,98,99
];

export function validarCelularBRCompleto(telefone: string): boolean {

  const value = telefone.replace(/\D/g, "");
  // Deve ter 11 dígitos
  if (value.length !== 11) return false;
  // DDD válido
  const ddd = parseInt(value.substring(0, 2), 10);
  if (!DDD_VALIDOS.includes(ddd)) return false;
  // Começa com 9
  if (value[2] !== '9') return false;

  if (/^(\d)\1+$/.test(value)) return false;
  // Não pode ser sequência numérica comum (ex: 12345678901, 01234567890, 98765432100)
  const sequenciasInvalidas = [
    '12345678901', '01234567890', '98765432100', '09876543210',
    '11111111111', '22222222222', '33333333333', '44444444444',
    '55555555555', '66666666666', '77777777777', '88888888888', '99999999999', '00000000000'
  ];
  if (sequenciasInvalidas.includes(value)) return false;
  return true;
}
