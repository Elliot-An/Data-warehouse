import { DataTypes } from "sequelize";
import {sequelizeCSDLVPDD as sequelize} from "../../config/connect.config.js";

const KhachHang = sequelize.define("khachhang", {
  MaKH: {
    type: DataTypes.STRING(10),
    allowNull: false,
    primaryKey: true,
  },
  TenKH: {
    type: DataTypes.STRING(45),
    allowNull: true,
  },
  MaThanhPho: {
    type: DataTypes.STRING(10),
    allowNull: false,
  },
  NgayDatHangDauTien: {
    type: DataTypes.DATE,
    allowNull: true,
  },
}, {
  tableName: "khachhang",
  timestamps: false,
});

export default KhachHang;
