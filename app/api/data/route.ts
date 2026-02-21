import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

// กำหนดตำแหน่งไฟล์ db.json
const filePath = path.join(process.cwd(), 'db.json');

// --- GET: อ่านข้อมูลทั้งหมด ---
export async function GET() {
  const fileData = await fs.readFile(filePath, 'utf8');
  const data = JSON.parse(fileData);
  return NextResponse.json(data);
}

// --- POST: เพิ่มข้อมูลใหม่เข้าไป (append) ---
export async function POST(request: Request) {
  try {
    const newData = await request.json(); // รับข้อมูลใหม่จากหน้าบ้าน
    
    // อ่านข้อมูลเก่า
    const fileData = await fs.readFile(filePath, 'utf8');
    const existingData = JSON.parse(fileData);
    
    // เพิ่มข้อมูลใหม่เข้าอาร์เรย์
    if (Array.isArray(existingData)) {
      existingData.push(newData);
    } else {
      // ถ้าเป็น object ให้สร้างอาร์เรย์ใหม่
      const arrayData = [existingData, newData];
      await fs.writeFile(filePath, JSON.stringify(arrayData, null, 2));
      return NextResponse.json({ message: 'Data added successfully' });
    }
    
    // เขียนข้อมูลที่เพิ่มแล้วลงไฟล์
    await fs.writeFile(filePath, JSON.stringify(existingData, null, 2));
    
    return NextResponse.json({ message: 'Data added successfully' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to add data' }, { status: 500 });
  }
}