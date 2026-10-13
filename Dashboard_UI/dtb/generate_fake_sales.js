// const fs = require('fs');
// const path = require('path');

// const dbPath = path.join(__dirname, 'db.json');
// const raw = fs.readFileSync(dbPath, 'utf8');
// const db = JSON.parse(raw);

// const cities = ["Ha Noi","Ho Chi Minh","Da Nang","Hai Phong","Can Tho","Nha Trang","Hue","Vung Tau","Bien Hoa","Bac Ninh"];
// const states = ["HN","HCM","DN","HP","CT","NT","HT","VT","BD","BN"];

// const total = 1000;
// const records = [];

// for (let i = 1; i <= total; i++) {
//   const year = 2021 + (i % 4); // 2021-2024
//   const month = (i % 12) + 1;
//   const day = (i % 28) + 1;
//   const prodNum = (i % 50) + 1; // 50 distinct products
//   const prodCode = `MH${String(prodNum).padStart(3, '0')}`;
//   const custNum = (i % 300) + 1; // 300 customers
//   const custCode = `C${String(custNum).padStart(4, '0')}`;
//   const city = cities[i % cities.length];
//   const state = states[i % states.length];
//   const customerType = (i % 5 === 0) ? 'BuuDien' : 'Traveler';
//   const quantity = (i % 10) + 1;
//   const unitPrice = 50 + (prodNum % 20) * 10; // between 50 and 240
//   const revenue = quantity * unitPrice;

//   const rec = {
//     "[Dim Thoi Gian].[Nam].[Nam].[MEMBER_CAPTION]": year,
//     "[Dim Thoi Gian].[Thang].[Thang].[MEMBER_CAPTION]": month,
//     "[Dim Thoi Gian].[Ngay].[Ngay].[MEMBER_CAPTION]": day,
//     "[Dim Mat Hang].[Ma Mat Hang].[Ma Mat Hang].[MEMBER_CAPTION]": prodCode,
//     "[Dim Khach Hang].[Ma Khach Hang].[Ma Khach Hang].[MEMBER_CAPTION]": custCode,
//     "[Dim Khach Hang].[Ma Thanh Pho].[Ma Thanh Pho].[MEMBER_CAPTION]": city,
//     "[Dim Khach Hang].[Ten Bang].[Ten Bang].[MEMBER_CAPTION]": state,
//     "[Dim Khach Hang].[Loai Khach Hang].[Loai Khach Hang].[MEMBER_CAPTION]": customerType,
//     "[Measures].[Doanh Thu]": revenue,
//     "[Measures].[So Luong]": quantity
//   };

//   records.push(rec);
// }

// // attach to db
// const out = Object.assign({}, db, { factMatHangBan: records });
// fs.writeFileSync(dbPath, JSON.stringify(out, null, 2), 'utf8');
// console.log(`Wrote ${records.length} records to ${dbPath}`);
