import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

const DB_PATH = path.join(process.cwd(), 'db.json');

export async function POST(request: Request) {
  try {
    const incomingData = await request.json();
    
    // Validate that id is provided
    if (!incomingData.id) {
      return NextResponse.json({ error: 'id is required' }, { status: 400 });
    }

    // 1. Read the existing database
    const fileContent = await fs.readFile(DB_PATH, 'utf8');
    const db = JSON.parse(fileContent);

    // 2. Find the record by id and update it
    const recordIndex = db.findIndex((record: Record<string, unknown>) => record.id === incomingData.id);
    
    if (recordIndex === -1) {
      return NextResponse.json({ error: 'Record not found' }, { status: 404 });
    }

    // 3. Update only the provided fields
    db[recordIndex] = {
      ...db[recordIndex],
      ...incomingData
    };

    // 4. Write back to the file
    await fs.writeFile(DB_PATH, JSON.stringify(db, null, 2));
    
    return NextResponse.json({ success: true, data: db[recordIndex] });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error: 'Failed to update record' }, { status: 500 });
  }
}