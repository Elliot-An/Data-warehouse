import { DataTypes } from "sequelize";
import {sequelizeDTWH as sequelize} from "../../config/connect.config.js";
import Dim_ThanhPho from "./Dim_ThanhPho.model.js";

const Dim_KhachHang = sequelize.define("Dim_KhachHang", {
  MaKhachHang: {
    type: DataTypes.STRING(255),
    allowNull: false,
    primaryKey: true,
  },
  MaThanhPho: {
    type: DataTypes.STRING(255),
    allowNull: true,
    references: {
      model: Dim_ThanhPho,
      key: "MaThanhPho",
    },
  },
  TenKhachHang: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  LoaiKhachHang: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
}, {
  tableName: "Dim_KhachHang",
  timestamps: false,
});

Dim_KhachHang.belongsTo(Dim_ThanhPho, {
  foreignKey: "MaThanhPho",
  targetKey: "MaThanhPho",
});

export default Dim_KhachHang;
