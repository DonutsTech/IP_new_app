
export function isPasswordValid(password: string): boolean {
	const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{6,}$/;
	return regex.test(password);
}


export function getPasswordValidationMessage(password: string): string | null {
	if (password.length < 8) return 'A senha deve ter pelo menos 8 caracteres.';
	if (!/[A-Z]/.test(password)) return 'A senha deve conter pelo menos uma letra maiúscula.';
	if (!/[a-z]/.test(password)) return 'A senha deve conter pelo menos uma letra minúscula.';
	if (!/\d/.test(password)) return 'A senha deve conter pelo menos um número.';
	if (!/[^A-Za-z0-9]/.test(password)) return 'A senha deve conter pelo menos um caractere especial.';
	return null;
}
