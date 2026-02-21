import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

const DATA_PATH = path.join(process.cwd(), 'temporary.json');

export async function POST(request: Request) {
  try {
    const incomingData = await request.json(); // ข้อมูลที่ส่งมา เช่น { id: "1", Price: 12 }
    
    // 1. อ่านข้อมูลเดิม
    const fileContent = await fs.readFile(DATA_PATH, 'utf8');
    const db = JSON.parse(fileContent);

    // 2. ใช้เฉพาะ index 0 เท่านั้น - แทนที่ข้อมูลเก่าด้วยข้อมูลใหม่
    // ถ้าไม่มีข้อมูลใน records ให้สร้าง index แรก
    
   
    if (db.records.length === 0) {
      db.records.push({
        id: incomingData.id || "",// id
        To: incomingData.To || "",// to
        From: incomingData.From || "",//from
        Seat: incomingData.Seat || "",
        Time: incomingData.Time || "",
        Status: incomingData.Status || "",
        Date: incomingData.Date || "",
        TimeStart: incomingData.TimeStart || "",//departure
        TimeLong: incomingData.TimeLong || "",//TimeSpend
        ExpressLine: incomingData.ExpressLine || "",
        BusID: incomingData.BusID || "",
        Gate: incomingData.Gate || "",
        Class: incomingData.Class || "",//busType
        Price:incomingData.Price || 0,
        IsConfirm: incomingData.IsConfirm || false,
        Passanger:incomingData.Passanger || "",
        ...incomingData
      });
    } else {
      // ถ้ามีข้อมูลแล้ว ให้ replace index 0
      db.records[0] = {
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
        Price: incomingData.Price || 0,
        IsConfirm: incomingData.IsConfirm || false,
        Passanger:incomingData.Passanger || "",
        ...incomingData
      };
    }

    // 3. บันทึกกลับลงไฟล์
    await fs.writeFile(DATA_PATH, JSON.stringify(db, null, 2));
    
    return NextResponse.json({ success: true, data: db.records });
  } catch (error) {
    return NextResponse.json({ error: 'Failed' }, { status: 500 });
  }
}