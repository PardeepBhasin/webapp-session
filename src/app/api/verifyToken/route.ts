import { headers } from 'next/headers';
import jose from 'jose';
import { NextResponse } from 'next/server';

export async function POST() {
    const headerList = headers();
    const authHeader = headerList.get('Authorization');
    const token = authHeader?.split(' ')[1];
    if (!token) {
        return NextResponse.json('Token is null', {
            status: 400,
            statusText: 'failure'
        })
    }
    try {
        const JWKS = jose.createRemoteJWKSet(new URL('https://www.googleapis.com/oauth2/v3/certs'))
        await jose.jwtVerify(token?.toString(), JWKS, {
            issuer: 'urn:example:issuer',
            audience: 'urn:example:audience',
        })
        return NextResponse.json('Token successfully verfied', {
            status: 200,
            statusText: 'success'
        })
    } catch (error) {
        return NextResponse.json(error, {
            status: 400,
            statusText: 'failure'
        })
    }
}