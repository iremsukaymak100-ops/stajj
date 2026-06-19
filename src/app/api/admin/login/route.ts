import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { password } = await request.json();
    const adminPassword = (process.env.ADMIN_PASSWORD || 'irem123').trim();

    if (password === adminPassword) {
      return NextResponse.json({ success: true });
    }

    return NextResponse.json(
      { error: 'Geçersiz şifre. Lütfen tekrar deneyin.' },
      { status: 401 }
    );
  } catch {
    return NextResponse.json(
      { error: 'Sunucu hatası. Lütfen daha sonra tekrar deneyin.' },
      { status: 500 }
    );
  }
}
