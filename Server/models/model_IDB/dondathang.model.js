import { DataTypes } from "sequelize";
import {sequelizeIDB as sequelize} from "../../config/connect.config.js";
import KhachHang from "./khachhang.model.js";

const DonDatHang = sequelize.define("dondathang", {
  MaDon: {
    type: DataTypes.STRING(10),
    allowNull: false,
    primaryKey: true,
  },
  NgayDatHang: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  MaKhachHang: {
    type: DataTypes.STRING(10),
    allowNull: false,
    references: {
      model: KhachHang,
      key: "MaKH",
    },
  },
}, {
  tableName: "dondathang",
  timestamps: false,
});

DonDatHang.belongsTo(KhachHang, {
  foreignKey: "MaKhachHang",
  targetKey: "MaKH",
});

export default DonDatHang;
