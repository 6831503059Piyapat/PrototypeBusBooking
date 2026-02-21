import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

// กำหนดตำแหน่งไฟล์ db.json
const filePath = path.join(process.cwd(), 'temporary.json');

// --- GET: อ่านข้อมูลทั้งหมด ---
export async function GET() {
  const fileData = await fs.readFile(filePath, 'utf8');
  const data = JSON.parse(fileData);
  return NextResponse.json(data);
}

// --- POST: เพิ่ม/แก้ไข/ลบ (แบบรวมๆ) ---
export async function POST(request: Request) {
  try {
    const newData = await request.json(); // รับข้อมูลใหม่จากหน้าบ้าน
    
    // เขียนข้อมูลทับลงในไฟล์ db.json
    await fs.writeFile(filePath, JSON.stringify(newData, null, 2));
    
    return NextResponse.json({ message: 'Data updated successfully' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update data' }, { status: 500 });
  }
}