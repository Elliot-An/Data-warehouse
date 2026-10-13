import { DataTypes } from "sequelize";
import {sequelizeDTWH as sequelize} from "../../config/connect.config.js";

const Dim_MatHang = sequelize.define("Dim_MatHang", {
  MaMatHang: {
    type: DataTypes.STRING(255),
    allowNull: false,
    primaryKey: true,
  },
  MoTa: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  KichThuoc: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  TrongLuong: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
  DonGia: {
    type: DataTypes.DECIMAL(19, 4), 
    allowNull: true,
  },
}, {
  tableName: "Dim_MatHang",
  timestamps: false,
});

export default Dim_MatHang;
