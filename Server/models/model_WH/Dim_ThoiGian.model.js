import { DataTypes } from "sequelize";
import {sequelizeDTWH as sequelize} from "../../config/connect.config.js";

const Dim_ThoiGian = sequelize.define("Dim_ThoiGian", {
  MaThoiGian: {
    type: DataTypes.STRING(255),
    allowNull: false,
    primaryKey: true,
  },
  Ngay: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  Thang: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  Nam: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
}, {
  tableName: "Dim_ThoiGian",
  timestamps: false,
});

export default Dim_ThoiGian;
