import { fa, faker } from "@faker-js/faker";

import { sequelizeCSDLBH, sequelizeCSDLVPDD } from "./config/connect.config.js";
import * as modelVPDD from "./models/model_CSDLVPDD/index.js";
import * as modelBH from "./models/model_CSDLBH/index.js";
import { Op } from "sequelize";

const citys = [
  ["New York", "New York"],
  ["Buffalo", "New York"],
  ["Los Angeles", "California"],
  ["San Francisco", "California"],
  ["Chicago", "Illinois"],
  ["Houston", "Texas"],
  ["Phoenix", "Arizona"]

];

const genDataKhachHang = async () => {
  const t = await sequelizeCSDLVPDD.transaction();
  let cntMaKH = 1;
  for (let y = 2022; y <= 2024; y++) {
    for (let m = 1; m <= 12; m++) {
      const startDate = new Date(y, m - 1, 1);
      const endDate = new Date(y, m, 0);
      for (let d = startDate.getDate(); d <= endDate.getDate(); d++) {
        for (let i = 1; i <= Math.floor(Math.random() * 8) + 10; i++) {
          const maKH = `KH${cntMaKH.toString().padStart(7, '0')}`;
          cntMaKH++;
          await modelVPDD.KhachHang.create({
            MaKH: maKH,
            TenKH: faker.person.fullName(),
            MaThanhPho: faker.number.int({ min: 1, max: citys.length }).toString().padStart(3, '0'),
            NgayDatHangDauTien: new Date(y, m - 1, d),
          }, { transaction: t });
          const DLOrBD = Math.random() < 0.5 ? "DL" : "BD";
          if (DLOrBD === "DL") {
            await modelVPDD.KhachHangDuLich.create({
              MaKH: maKH,
              HuongDanVienDuLich: faker.person.fullName(),
              NgayTao: new Date(y, m - 1, d),
            }, { transaction: t });
          }
          else {
            await modelVPDD.KhachHangBuuDien.create({
              MaKH: maKH,
              DiaChiBuuDien: faker.location.streetAddress(),
              NgayTao: new Date(y, m - 1, d),
            }, { transaction: t });
          }
        }
      }
    }
  }

  await t.commit();
  console.log("KhachHang done");
}

const genDataMatHang = async () => {
  const t = await sequelizeCSDLBH.transaction();
  for (let i = 1; i <= 35; i++) {
    const maMH = `MH${i.toString().padStart(5, '0')}`;
    await modelBH.MatHang.create({
      MaMH: maMH,
      MoTa: faker.commerce.productName(),
      KichCo: faker.commerce.productAdjective(),
      TrongLuong: faker.number.float({ min: 0, max: 5, precision: 0.01 }).toFixed(2),
      Gia: faker.number.int({ min: 100000, max: 1000000 }),
      NgayBatDauBan: "2022-01-01",
    }, { transaction: t });
  }
  await t.commit();
  console.log("MatHang done");
}

const genDataVPDD = async () => {
  const t = await sequelizeCSDLBH.transaction();
  for (let i = 1; i <= citys.length; i++) {
    const maTP = i.toString().padStart(3, '0');
    await modelBH.VanPhongDaiDien.create({
      MaThanhPho: maTP,
      TenThanhPho: citys[i - 1][0],
      DiaChiVP: faker.location.streetAddress(),
      Bang: citys[i - 1][1],
      NgayThanhLap: '2022-01-01'
    }, { transaction: t });
  }
  await t.commit();
  console.log("VanPhongDaiDien done");
}

const genDataCuaHang = async () => {
  const t = await sequelizeCSDLBH.transaction();
  let cntMaCH = 1;
  for (let i = 1; i <= citys.length; i++) {
    await modelBH.CuaHang.create({
      MaCuaHang: `CH${cntMaCH.toString().padStart(4, '0')}`,
      MaThanhPho: i.toString().padStart(3, '0'),
      SoDienThoai: faker.phone.number('0#######'),
      NgayKhaiTruong: '2022-01-01',
    }, { transaction: t });
    cntMaCH++;
    if (i == 1) {
      await modelBH.CuaHang.create({
        MaCuaHang: `CH${cntMaCH.toString().padStart(4, '0')}`,
        MaThanhPho: i.toString().padStart(3, '0'),
        SoDienThoai: faker.phone.number('0#######'),
        NgayKhaiTruong: '2022-01-01',
      }, { transaction: t });
      cntMaCH++;
    }
  }
  await t.commit();
  console.log("CuaHang done");
}

const genDataDonHangMatHang = async () => {
  const t = await sequelizeCSDLBH.transaction();
  let cntMaDon = 1;
  const matHangs = await modelBH.MatHang.findAll({
    attributes: ['MaMH', 'Gia'],
  });
  const cuahangs = await modelBH.CuaHang.findAll({
    attributes: ['MaCuaHang'],
  });
  let quantityMathang = {};
  cuahangs.forEach(cuaHang => {
    matHangs.forEach(matHang => {
      quantityMathang[`${cuaHang.MaCuaHang}-${matHang.MaMH}`] = 20;
    });
  });
  for (let y = 2022; y <= 2024; y++) {
    for (let m = 1; m <= 12; m++) {
      const startDate = new Date(y, m - 1, 1);
      const endDate = new Date(y, m, 0);
      for (let d = startDate.getDate(); d <= endDate.getDate(); d++) {
        const khachHangs = await modelVPDD.KhachHang.findAll({
          attributes: ['MaKH', 'MaThanhPho'],
          where: {
            NgayDatHangDauTien: { [Op.lte]: new Date(y, m - 1, d) }
          }
        });
        let checkMatHangDuocDat = [];
        const unavailableItems = Object.entries(quantityMathang)
          .filter(([key, value]) => value < 10)
          .map(([key]) => key);
        for (const item of unavailableItems) {
          const [maCuaHang, maMatHang] = item.split('-');
          quantityMathang[item] += 20;
          await modelBH.MatHangLuuTru.create({
            MaCuaHang: maCuaHang,
            MaMatHang: maMatHang,
            SoLuongTonKho: quantityMathang[item],
            ThoiGianCapNhat: `${y}-${m.toString().padStart(2, '0')}-${d.toString().padStart(2, '0')} 06:00:00`,
          }, { transaction: t });
        };
        for (let i = 1; i <= Math.floor(Math.random() * 30) + 100; i++) {
          let MaDon = `DH${cntMaDon.toString().padStart(8, '0')}`;
          let MaKhachHang = khachHangs[Math.floor(Math.random() * khachHangs.length)].MaKH
          let MaThanhPho = khachHangs[Math.floor(Math.random() * khachHangs.length)].MaThanhPho
          await modelBH.DonDatHang.create({
            MaDon: MaDon,
            NgayDatHang: new Date(y, m - 1, d),
            MaKhachHang: MaKhachHang,
          }, { transaction: t });

          const cuaHangsFounded = await modelBH.CuaHang.findAll({
            attributes: ['MaCuaHang'],
            where: {
              MaThanhPho: MaThanhPho
            },
          });
          const indexCuaHang = Math.floor(Math.random() * cuaHangsFounded.length);
          console.log(MaThanhPho)
          const maCuaHangDat = cuaHangsFounded[indexCuaHang].MaCuaHang;

          cntMaDon++;
          const soMatHang = faker.helpers.weightedArrayElement([
            { value: 1, weight: 70 },
            { value: 2, weight: 20 },
            { value: 3, weight: 10 }
          ])
          let matHangsCopy = [...matHangs];
          for (let j = 1; j <= soMatHang; j++) {
            const indexMatHang = Math.floor(Math.random() * matHangsCopy.length);
            const maMatHangDat = matHangsCopy[indexMatHang].MaMH;
            const soLuongDat = faker.number.int({ min: 1, max: 3 });
            await modelBH.MatHangDuocDat.create({
              MaDon: MaDon,
              MaMatHang: maMatHangDat,
              SoLuongDat: soLuongDat,
              GiaDat: matHangsCopy[indexMatHang].Gia,
              NgayGiaoHang: new Date(y, m - 1, d + faker.number.int({ min: 1, max: 3 })),
            }, { transaction: t });
            matHangsCopy.splice(indexMatHang, 1);
            const key = `${maCuaHangDat}-${maMatHangDat}`;
            const thoiGianCapNhat = `${y}-${m.toString().padStart(2, '0')}-${d.toString().padStart(2, '0')} ${faker.number.int({ min: 8, max: 16 })}:${faker.number.int({ min: 0, max: 59 })}:00`;
            if (checkMatHangDuocDat.indexOf(key) === -1) {
              await modelBH.MatHangLuuTru.create({
                MaCuaHang: maCuaHangDat,
                MaMatHang: maMatHangDat,
                SoLuongTonKho: quantityMathang[key] - soLuongDat,
                ThoiGianCapNhat: thoiGianCapNhat,
              }, { transaction: t });
              quantityMathang[key] -= soLuongDat;
              checkMatHangDuocDat.push(key);
            }
            else {
              await modelBH.MatHangLuuTru.update({
                SoLuongTonKho: quantityMathang[key] - soLuongDat,
              }, {
                where: {
                  MaCuaHang: maCuaHangDat,
                  MaMatHang: maMatHangDat,
                  ThoiGianCapNhat: {
                    [Op.like]: `${y}-${m.toString().padStart(2, '0')}-%`
                  },
                },
                transaction: t
              });
              quantityMathang[key] -= soLuongDat;
            }
          }
        }
      }
    }
  }
  await t.commit();
  console.log("DonHangMatHang done");
}

const genDataIniDonHangLuuTru = async () => {
  const t = await sequelizeCSDLBH.transaction();
  const matHangs = await modelBH.MatHang.findAll({
    attributes: ['MaMH'],
  });
  const cuaHangs = await modelBH.CuaHang.findAll({
    attributes: ['MaCuaHang'],
  });
  for (let i = 0; i < cuaHangs.length; i++) {
    for (let j = 0; j < matHangs.length; j++) {
      await modelBH.MatHangLuuTru.create({
        MaCuaHang: cuaHangs[i].MaCuaHang,
        MaMatHang: matHangs[j].MaMH,
        SoLuongTonKho: 20,
        ThoiGianCapNhat: '2022-01-01 06:00:00',
      }, { transaction: t });
    }
  }
  await t.commit();
  console.log("MatHangLuuTru done");
}

// genDataKhachHang();
// genDataMatHang();
// genDataVPDD();
// genDataCuaHang();
genDataDonHangMatHang();
// genDataIniDonHangLuuTru();
