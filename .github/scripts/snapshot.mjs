// บันทึกยอดสะสมจาก GoatCounter ลง stats-history.json วันละครั้ง
// รันโดย .github/workflows/stats-snapshot.yml — ไม่ต้องใช้ token ของ GoatCounter
// เพราะอ่านจาก endpoint สาธารณะ (ต้องติ๊ก "Allow adding visitor counts on your website" ไว้)

import { readFile, writeFile } from "node:fs/promises";

const GC   = "https://teacherthanawat.goatcounter.com/counter/";
const BASE = "/Chemical-reaction-rate/";
const FILE = "stats-history.json";

// หน้าแรกถูกบันทึกได้ 2 path แล้วแต่ว่าผู้ใช้พิมพ์ index.html มาด้วยหรือไม่ จึงรวมกัน
const TARGETS = {
  TOTAL: ["TOTAL"],
  home:  [BASE, BASE + "index.html"],
  "01":  [BASE + "01-rate-definition.html"],
  "02":  [BASE + "02-collision-theory.html"],
  "03":  [BASE + "03-factors.html"],
  "04":  [BASE + "04-rate-law.html"],
  "05":  [BASE + "05-applications.html"]
};

const toInt = (v) => parseInt(String(v).replace(/[^0-9]/g, ""), 10) || 0;

// วันที่ตามเวลาไทย (Action รันด้วย UTC ถ้าไม่แปลงจะข้ามวันผิด)
function thaiDate() {
  return new Date(Date.now() + 7 * 3600 * 1000).toISOString().slice(0, 10);
}

async function count(path) {
  // cache-buster จำเป็น — GoatCounter แคชคำตอบไว้ ถ้าไม่ใส่จะได้ตัวเลขเก่า
  const url = `${GC}${path}.json?cb=${Date.now()}${Math.random()}`;
  const res = await fetch(url, { headers: { "User-Agent": "chemrate-stats-snapshot" } });
  if (res.status === 404) return { v: 0, u: 0 };      // ยังไม่มีใครเข้าหน้านี้
  if (!res.ok) throw new Error(`${path} -> HTTP ${res.status}`);
  const j = await res.json();
  return { v: toInt(j.count), u: toInt(j.count_unique) };
}

async function collect() {
  const out = {};
  for (const [key, paths] of Object.entries(TARGETS)) {
    let v = 0, u = 0;
    for (const p of paths) {
      const c = await count(p);
      v += c.v; u += c.u;
    }
    out[key] = { v, u };
  }
  return out;
}

const history = await readFile(FILE, "utf8")
  .then(JSON.parse)
  .catch(() => ({ note: "", snapshots: [] }));

history.note = "ยอดสะสม (ไม่ใช่ยอดรายวัน) บันทึกโดย GitHub Action วันละครั้งราว 23:55 น. เวลาไทย · " +
               "ยอดรายวันคำนวณจากผลต่างของสองวันติดกันในหน้า stats.html · v=ครั้ง u=คน";

const date = thaiDate();
const record = { date, pages: await collect() };

// รันซ้ำในวันเดียวกันให้ทับของเดิม ไม่ใช่เพิ่มแถว
const at = history.snapshots.findIndex((s) => s.date === date);
if (at >= 0) history.snapshots[at] = record;
else history.snapshots.push(record);

history.snapshots.sort((a, b) => a.date.localeCompare(b.date));

await writeFile(FILE, JSON.stringify(history, null, 1) + "\n", "utf8");
console.log(`snapshot ${date}:`, JSON.stringify(record.pages.TOTAL), `(${history.snapshots.length} วันในไฟล์)`);
