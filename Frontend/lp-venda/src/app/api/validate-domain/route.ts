

import { NextRequest, NextResponse } from 'next/server';
import dns from 'dns/promises';

const corsHeaders = {
	'Access-Control-Allow-Origin': '*',
	'Access-Control-Allow-Methods': 'POST, OPTIONS',
	'Access-Control-Allow-Headers': 'Content-Type',
};

export async function OPTIONS() {
	return NextResponse.json({}, { headers: corsHeaders });
}

export async function POST(req: NextRequest) {
	try {
		const { email } = await req.json();
		if (!email || typeof email !== 'string' || !email.includes('@')) {
			return NextResponse.json(
				{ valid: false, error: 'E-mail inválido.' },
				{ status: 400, headers: corsHeaders }
			);
		}
		const domain = email.split('@')[1];
		try {
			const mxRecords = await dns.resolveMx(domain);
			const isValid = Array.isArray(mxRecords) && mxRecords.length > 0;
			return NextResponse.json({ valid: isValid }, { headers: corsHeaders });
		} catch {
			return NextResponse.json(
				{ valid: false, error: 'Domínio não possui registro MX.' },
				{ headers: corsHeaders }
			);
		}
	} catch (err) {
		return NextResponse.json(
			{ valid: false, error: 'Erro ao validar domínio.' },
			{ status: 500, headers: corsHeaders }
		);
	}
}
