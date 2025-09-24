
export function phoneMask(value: string): string {

	value = value.replace(/\D/g, "");

	// Aplica máscara (XX) XXXXX-XXXX ou (XX) XXXX-XXXX
	if (value.length > 11) value = value.slice(0, 11);
	if (value.length > 10) {
		// Celular com 9 dígitos
		return value.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
	} else if (value.length > 6) {
		// Fixo ou celular antigo
		return value.replace(/(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3');
	} else if (value.length > 2) {
		return value.replace(/(\d{2})(\d{0,5})/, '($1) $2');
	} else {
		return value;
	}
}