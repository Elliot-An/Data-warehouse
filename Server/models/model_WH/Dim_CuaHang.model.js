import { DataTypes } from "sequelize";
import {sequelizeDTWH as sequelize} from "../../config/connect.config.js";
import Dim_ThanhPho from "./Dim_ThanhPho.model.js";

const Dim_CuaHang = sequelize.define("Dim_CuaHang", {
  MaCuaHang: {
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
  SoDienThoai: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
}, {
  tableName: "Dim_CuaHang",
  timestamps: false,
});

Dim_CuaHang.belongsTo(Dim_ThanhPho, {
  foreignKey: "MaThanhPho",
  targetKey: "MaThanhPho",
});

export default Dim_CuaHang;
