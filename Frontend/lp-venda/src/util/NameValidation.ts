// Validador de nome: mínimo 4 caracteres, apenas letras, espaços e apóstrofo
export function isValidName(name: string): boolean {
  const regex = /^[A-Za-zÀ-ÖØ-öø-ÿ' ]{4,}$/;
  return regex.test(name.trim());
}

export function nameMask(name: string): string {
  // Remove tudo que não for letra, espaço ou apóstrofo
  return name
    .replace(/[^A-Za-zÀ-ÖØ-öø-ÿ' ]+/g, '') // permite apenas letras, espaço e apóstrofo
    .replace(/\s+/g, ' ')
    .trim();
}