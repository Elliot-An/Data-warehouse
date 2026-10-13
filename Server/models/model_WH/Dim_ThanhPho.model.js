import { DataTypes } from "sequelize";
import {sequelizeDTWH as sequelize} from "../../config/connect.config.js";

const Dim_ThanhPho = sequelize.define("Dim_ThanhPho", {
  MaThanhPho: {
    type: DataTypes.STRING(255),
    allowNull: false,
    primaryKey: true,
  },
  DiaChiVanPhong: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  TenThanhPho: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  TenBang: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
}, {
  tableName: "Dim_ThanhPho",
  timestamps: false,
});

export default Dim_ThanhPho;
