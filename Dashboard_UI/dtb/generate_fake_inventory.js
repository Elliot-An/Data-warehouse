const fs = require('fs');
const path = require('path');

const dbPath = path.join(__dirname, 'db.json');
const raw = fs.readFileSync(dbPath, 'utf8');
const db = JSON.parse(raw);

const cities = ["Ha Noi","Ho Chi Minh","Da Nang","Hai Phong","Can Tho","Nha Trang","Hue","Vung Tau","Bien Hoa","Bac Ninh"];
const states = ["HN","HCM","DN","HP","CT","NT","HT","VT","BD","BN"];

const total = 1000;
const records = [];

for (let i = 1; i <= total; i++) {
  const year = 2021 + (i % 4); // 2021-2024
  const month = (i % 12) + 1;
  const day = (i % 28) + 1;
  const prodNum = (i % 100) + 1; // 100 distinct products
  const prodCode = `MH${String(prodNum).padStart(3, '0')}`;
  const storeNum = (i % 50) + 1; // 50 stores
  const storeCode = `S${String(storeNum).padStart(3, '0')}`;
  const city = cities[i % cities.length];
  const state = states[i % states.length];
  const quantity = (i % 20) + 1;
  const ratio = +(Math.random() * 1).toFixed(2); // random ratio
  const rec = {
    "[Dim Thoi Gian].[Nam].[Nam].[MEMBER_CAPTION]": year,
    "[Dim Thoi Gian].[Thang].[Thang].[MEMBER_CAPTION]": month,
    "[Dim Thoi Gian].[Ngay].[Ngay].[MEMBER_CAPTION]": day,
    "[Dim Mat Hang].[Ma Mat Hang].[Ma Mat Hang].[MEMBER_CAPTION]": prodCode,
    "[Dim Cua Hang].[Ma Cua Hang].[Ma Cua Hang].[MEMBER_CAPTION]": storeCode,
    "[Dim Cua Hang].[Ma Thanh Pho].[Ma Thanh Pho].[MEMBER_CAPTION]": city,
    "[Dim Cua Hang].[Ten Bang].[Ten Bang].[MEMBER_CAPTION]": state,
    "[Measures].[Muc Do Ton Kho]": ratio,
    "[Measures].[Fact Kho Count]": quantity
  };
  records.push(rec);
}

const out = Object.assign({}, db, { factKho: records });
fs.writeFileSync(dbPath, JSON.stringify(out, null, 2), 'utf8');
console.log(`Wrote ${records.length} inventory records to ${dbPath}`);
