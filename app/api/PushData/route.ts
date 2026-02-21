import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

const DATA_PATH = path.join(process.cwd(), 'db.json');

export async function POST(request: Request) {
  try {
    const incomingData = await request.json(); // ข้อมูลที่ส่งมา เช่น { id: "1", Price: 12 }
    
    // 1. อ่านข้อมูลเดิม
    const fileContent = await fs.readFile(DATA_PATH, 'utf8');
    const db = JSON.parse(fileContent);

    // 2. หาตำแหน่ง index ของ record ที่มี id ตรงกัน
    const recordIndex = db.records.findIndex((item: any) => item.id === incomingData.id);

    if (recordIndex !== -1) {
      // ถ้าเจอ id เดิม ให้ "รวม" (Merge) ข้อมูลเก่ากับข้อมูลใหม่
      db.records[recordIndex] = { ...db.records[recordIndex], ...incomingData };
    } else {
      // ถ้าไม่เจอ ให้สร้าง record ใหม่ (ใส่ค่าเริ่มต้นกันเหนื่อย)
      db.records.push({
        id: incomingData.id || "",
        To: incomingData.To || "",
        From: incomingData.From || "",
        Seat: incomingData.Seat || "",
        Time: incomingData.Time || "",
        Status: incomingData.Status || "",
        Date: incomingData.Date || "",
        TimeStart: incomingData.TimeStart || "",
        TimeLong: incomingData.TimeLong || "",
        ExpressLine: incomingData.ExpressLine || "",
        BusID: incomingData.BusID || "",
        Gate: incomingData.Gate || "",
        Class: incomingData.Class || "",
        IsConfirm: incomingData.IsConfirm || false,
        ...incomingData
      });
    }

    // 3. บันทึกกลับลงไฟล์
    await fs.writeFile(DATA_PATH, JSON.stringify(db, null, 2));
    
    return NextResponse.json({ success: true, data: db.records });
  } catch (error) {
    return NextResponse.json({ error: 'Failed' }, { status: 500 });
  }
}