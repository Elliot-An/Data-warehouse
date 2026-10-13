import { DataTypes } from "sequelize";
import {sequelizeCSDLBH as sequelize} from "../../config/connect.config.js";

const VanPhongDaiDien = sequelize.define("vanphongdaidien", {
  MaThanhPho: {
    type: DataTypes.STRING(10),
    allowNull: false,
    primaryKey: true,
  },
  TenThanhPho: {
    type: DataTypes.STRING(50),
    allowNull: true,
  },
  DiaChiVP: {
    type: DataTypes.STRING(100),
    allowNull: true,
  },
  Bang: {
    type: DataTypes.STRING(50),
    allowNull: true,
  },
  NgayThanhLap: {
    type: DataTypes.DATE,
    allowNull: true,
  },
}, {
  tableName: "vanphongdaidien",
  timestamps: false,
});

export default VanPhongDaiDien;
