
import * as modelVPDD from "../models/model_CSDLVPDD/index.js";
import * as modelBH from "../models/model_CSDLBH/index.js";
import * as modelIDB from "../models/model_IDB/index.js";

const InsertDataToIDB = async (srcModel, desModel) => {
  const sequelize = desModel.sequelize;
  const transaction = await sequelize.transaction();
  try {
    let srcData = await srcModel.findAll({});
    srcData = srcData.map(item => {
      let itemReturn = item.toJSON();
      if(itemReturn.ThoiGianCapNhat) {
        const date = new Date(itemReturn.ThoiGianCapNhat);
        itemReturn.ThoiGianCapNhat = date.toISOString().slice(0, 19).replace('T', ' ');
      }
      return itemReturn;
    });
    await desModel.bulkCreate(srcData, {
      validate: true,
      transaction,
    });
    await transaction.commit();
    console.log("Insert data to IDB successfully");
  } catch (error) {
    await transaction.rollback();
    console.error("Error inserting data to IDB:", error);
    throw error;
  }
}

export default async () => {
  // await InsertDataToIDB(modelBH.VanPhongDaiDien, modelIDB.VanPhongDaiDien);
  // await InsertDataToIDB(modelBH.MatHang, modelIDB.MatHang);
  // await InsertDataToIDB(modelVPDD.KhachHang, modelIDB.KhachHang);
  // await InsertDataToIDB(modelVPDD.KhachHangBuuDien, modelIDB.KhachHangBuuDien);
  // await InsertDataToIDB(modelVPDD.KhachHangDuLich, modelIDB.KhachHangDuLich);
  // await InsertDataToIDB(modelBH.CuaHang, modelIDB.CuaHang);
  // await InsertDataToIDB(modelBH.MatHangLuuTru, modelIDB.MatHangLuuTru);
  // await InsertDataToIDB(modelBH.DonDatHang, modelIDB.DonDatHang);
  // await InsertDataToIDB(modelBH.MatHangDuocDat, modelIDB.MatHangDuocDat);
}