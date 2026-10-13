import { DataTypes } from "sequelize";
import {sequelizeCSDLVPDD as sequelize} from "../../config/connect.config.js";
import KhachHang from "./khachhang.model.js";

const KhachHangDuLich = sequelize.define("khachhangdulich", {
  MaKH: {
    type: DataTypes.STRING(10),
    allowNull: false,
    primaryKey: true,
    references: {
      model: KhachHang,
      key: "MaKH",
    },
  },
  HuongDanVienDuLich: {
    type: DataTypes.STRING(45),
    allowNull: true,
  },
  NgayTao: {
    type: DataTypes.DATE,
    allowNull: true,
  },
}, {
  tableName: "khachhangdulich",
  timestamps: false,
});

KhachHangDuLich.belongsTo(KhachHang, {
  foreignKey: "MaKH",
  targetKey: "MaKH",
});

export default KhachHangDuLich;
