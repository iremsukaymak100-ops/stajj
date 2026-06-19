import { NextRequest, NextResponse } from 'next/server';
import * as db from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const table = searchParams.get('table');

    if (!table) {
      return NextResponse.json({ error: 'Table parameter is required' }, { status: 400 });
    }

    if (table === 'programming_logic_items') {
      const data = await db.getMechanisms();
      return NextResponse.json({ data, error: null });
    } else if (table === 'contact_messages') {
      const data = await db.getMessages();
      return NextResponse.json({ data, error: null });
    } else {
      return NextResponse.json({ error: 'Unknown table' }, { status: 400 });
    }
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Database error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const table = searchParams.get('table');
    const body = await request.json();

    if (!table) {
      return NextResponse.json({ error: 'Table parameter is required' }, { status: 400 });
    }

    if (table === 'programming_logic_items') {
      const result = await db.addMechanism(body);
      return NextResponse.json({ data: [result], error: null });
    } else if (table === 'contact_messages') {
      const result = await db.addMessage(body);
      return NextResponse.json({ data: [result], error: null });
    } else {
      return NextResponse.json({ error: 'Unknown table' }, { status: 400 });
    }
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Database error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const table = searchParams.get('table');
    const id = searchParams.get('id');

    if (!table || !id) {
      return NextResponse.json({ error: 'Table and id parameters are required' }, { status: 400 });
    }

    if (table === 'programming_logic_items') {
      await db.deleteMechanism(id);
      return NextResponse.json({ error: null });
    } else if (table === 'contact_messages') {
      await db.deleteMessage(id);
      return NextResponse.json({ error: null });
    } else {
      return NextResponse.json({ error: 'Unknown table' }, { status: 400 });
    }
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Database error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
