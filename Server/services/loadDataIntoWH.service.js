import * as modelIDB from "../models/model_IDB/index.js";
import * as modelWH from "../models/model_WH/index.js";
import { sequelizeDTWH } from "../config/connect.config.js";
import { Op } from "sequelize";

const toMSSQLDateTime = (date) => {
  const pad = n => n < 10 ? '0' + n : n;
  return date.getFullYear() + '-' +
    pad(date.getMonth() + 1) + '-' +
    pad(date.getDate()) + ' ' +
    pad(date.getHours()-7) + ':' +
    pad(date.getMinutes()) + ':' +
    pad(date.getSeconds()) + ".000";
}


export default async () => {
  const transaction = await sequelizeDTWH.transaction();
  try {
    // // vpdd -> dim_ThanhPho
    // let vpddData = await modelIDB.VanPhongDaiDien.findAll({});
    // vpddData = vpddData.map(item => item.toJSON());
    // for(const item of vpddData){
    //   const insertDate = await modelWH.Dim_ThanhPho.create({
    //     MaThanhPho: item.MaThanhPho,
    //     DiaChiVanPhong: item.DiaChiVP,
    //     TenThanhPho: item.TenThanhPho,
    //     TenBang: item.Bang,
    //   }, { transaction });
    // }

    // // khachhang, khachhangbuudien, khachhangdulich -> dim_KhachHang
    // let khachhangData = await modelIDB.KhachHang.findAll({});
    // khachhangData = khachhangData.map(item => item.toJSON());
    // for (const item of khachhangData) {
    //   const checkBuuDien = await modelIDB.KhachHangBuuDien.findOne({
    //     where: {
    //       MaKH: item.MaKH
    //     }
    //   });
    //   const typeKhachHang = checkBuuDien ? 'BuuDien' : 'DuLich';
    //   const insertDate = await modelWH.Dim_KhachHang.create({
    //     MaKhachHang: item.MaKH,
    //     MaThanhPho: item.MaThanhPho,
    //     TenKhachHang: item.TenKH,
    //     LoaiKhachHang: typeKhachHang
    //   }, { transaction });
    // }

    // // cuahang -> dim_CuaHang
    // let cuahangData = await modelIDB.CuaHang.findAll({});
    // cuahangData = cuahangData.map(item => item.toJSON());
    // for (const item of cuahangData) {
    //   const insertDate = await modelWH.Dim_CuaHang.create({
    //     MaCuaHang: item.MaCuaHang,
    //     MaThanhPho: item.MaThanhPho,
    //     SoDienThoai: item.SoDienThoai
    //   }, { transaction });
    // }

    // // mathang -> dim_MatHang
    // let mathangData = await modelIDB.MatHang.findAll({});
    // mathangData = mathangData.map(item => item.toJSON());
    // for (const item of mathangData) {
    //   const insertDate = await modelWH.Dim_MatHang.create({
    //     MaMatHang: item.MaMH,
    //     MoTa: item.MoTa,
    //     KichThuoc: item.KichCo,
    //     TrongLuong: item.TrongLuong,
    //     DonGia: item.Gia
    //   }, { transaction });
    // }

    // lop datetime from 01/01/2015 to 01/01/2025
    let startDate = new Date('2022-01-01');
    let endDate = new Date('2024-12-31');
    for (let d = startDate; d <= endDate; d.setDate(d.getDate() + 1)) {
      const date = toMSSQLDateTime(new Date(d));
      const insertTime = await modelWH.Dim_ThoiGian.create({
        MaThoiGian: date.split(' ')[0],
        Ngay: date.split(' ')[0].split('-')[2],
        Thang: date.split(' ')[0].split('-')[1],
        Nam: date.split(' ')[0].split('-')[0],
      }, { transaction });
      const MaThoiGian = insertTime.MaThoiGian;

      let matHangDats = await modelIDB.MatHangDuocDat.findAll({
        where: {
          NgayGiaoHang: new Date(d).toISOString().slice(0, 10)
        },
        include: [
          {
            model: modelIDB.DonDatHang,
            attributes: ['MaKhachHang'],
          }
        ]
      });

      for (const matHangDat of matHangDats) {
        const factMatHangban = await modelWH.Fact_MatHangBanRa.upsert({
          MaMatHang: matHangDat.MaMatHang,
          MaThoiGian: MaThoiGian,
          MaKhachHang: matHangDat.dondathang.MaKhachHang,
          SoLuong: matHangDat.SoLuongDat,
          DoanhThu: matHangDat.GiaDat * matHangDat.SoLuongDat
        }, { transaction });
      }


      let matHangLuuTrus = await modelIDB.MatHangLuuTru.findAll({
        where: {
          ThoiGianCapNhat: {
            [Op.between]: [startDate.toISOString().slice(0, 10) + " 00:00:00",
            startDate.toISOString().slice(0, 10) + " 23:59:00"
            ]
          }
        }
      });
      matHangLuuTrus = matHangLuuTrus.map(item => item.toJSON());
      const grouped = matHangLuuTrus.reduce((acc, item) => {
        const key = `${item.MaMatHang}_${item.MaCuaHang}`;
        if (!acc[key]) acc[key] = [];
        acc[key].push(item);
        return acc;
      }, {});

      let dataInsertMatHangLuuTru = [];

      for(const item of  Object.values(grouped)){
        item.sort((a, b) => {
          return new Date(a.ThoiGianCapNhat) - new Date(b.ThoiGianCapNhat);
        });
        let newQuantity, oldQuantity;

        if(item.length == 1 && toMSSQLDateTime(item[0].ThoiGianCapNhat) == startDate.toISOString().slice(0, 10) + " 06:00:00.000") continue;

        if(item.length == 1 && toMSSQLDateTime(item[0].ThoiGianCapNhat) != startDate.toISOString().slice(0, 10) + " 06:00:00.000"){
          console.log(startDate.toISOString().slice(0, 10) + " 06:00:00.000");
          newQuantity = item[0].SoLuongTonKho;

          const lastRecord = await modelIDB.MatHangLuuTru.findOne({
            where: {
              MaMatHang: item[0].MaMatHang,
              MaCuaHang: item[0].MaCuaHang,
              ThoiGianCapNhat: {
                [Op.lt]: toMSSQLDateTime(item[0].ThoiGianCapNhat)
              }
            },
            order: [['ThoiGianCapNhat', 'DESC']]
          });
          console.log(item[0].MaCuaHang, item[0].MaMatHang);
          console.log("lastRecord", lastRecord.ThoiGianCapNhat);
          console.log("item[0].ThoiGianCapNhat", item[0].ThoiGianCapNhat);
          oldQuantity = lastRecord.SoLuongTonKho;
        }
        else if(item.length == 2){
          newQuantity = item[1].SoLuongTonKho;
          oldQuantity = item[0].SoLuongTonKho;
        }
        console.log(item[0].MaCuaHang, item[0].MaMatHang,newQuantity, oldQuantity);
      
        dataInsertMatHangLuuTru.push({
          MaMatHang: item[0].MaMatHang,
          MaCuaHang: item[0].MaCuaHang,
          MaThoiGian: MaThoiGian,
          MucDoTonKho: (((newQuantity+0.1)/(oldQuantity+0.1))*100).toFixed(2)
        })
      }

      for (const item of dataInsertMatHangLuuTru) {
        // console.log("item", item);  
        const insertData = await modelWH.Fact_Kho.create({
          MaMatHang: item.MaMatHang,
          MaCuaHang: item.MaCuaHang,
          MaThoiGian: item.MaThoiGian,
          MucDoTonKho: item.MucDoTonKho
        }, { transaction });
      }
    }


    await transaction.commit();
    console.log("Insert data to DWH successfully");
  } catch (error) {
    await transaction.rollback();
    console.error("Error inserting data to DWH:", error);
    throw error;
  }
}