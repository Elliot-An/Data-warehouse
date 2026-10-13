import { DataTypes } from "sequelize";
import {sequelizeCSDLBH as sequelize} from "../../config/connect.config.js";

const MatHang = sequelize.define("mathang", {
  MaMH: {
    type: DataTypes.STRING(10),
    allowNull: false,
    primaryKey: true,
  },
  MoTa: {
    type: DataTypes.STRING(512),
    allowNull: true,
  },
  KichCo: {
    type: DataTypes.STRING(512),
    allowNull: true,
  },
  TrongLuong: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
  Gia: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  NgayBatDauBan: {
    type: DataTypes.STRING(512),
    allowNull: true,
  },
}, {
  tableName: "mathang",
  timestamps: false,
});

export default MatHang;
