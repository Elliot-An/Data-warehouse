import { DataTypes } from "sequelize";
import {sequelizeDTWH as sequelize} from "../../config/connect.config.js";
import Dim_MatHang from "./Dim_MatHang.model.js";
import Dim_CuaHang from "./Dim_CuaHang.model.js";
import Dim_ThoiGian from "./Dim_ThoiGian.model.js";

const Fact_Kho = sequelize.define("Fact_Kho", {
  MaMatHang: {
    type: DataTypes.STRING(255),
    allowNull: false,
    primaryKey: true,
    references: {
      model: Dim_MatHang,
      key: "MaMatHang",
    },
  },
  MaCuaHang: {
    type: DataTypes.STRING(255),
    allowNull: false,
    primaryKey: true,
    references: {
      model: Dim_CuaHang,
      key: "MaCuaHang",
    },
  },
  MaThoiGian: {
    type: DataTypes.STRING(255),
    allowNull: false,
    primaryKey: true,
    references: {
      model: Dim_ThoiGian,
      key: "MaThoiGian",
    },
  },
  MucDoTonKho: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
}, {
  tableName: "Fact_Kho",
  timestamps: false,
});

Fact_Kho.belongsTo(Dim_MatHang, {
  foreignKey: "MaMatHang",
  targetKey: "MaMatHang",
});

Fact_Kho.belongsTo(Dim_CuaHang, {
  foreignKey: "MaCuaHang",
  targetKey: "MaCuaHang",
});

Fact_Kho.belongsTo(Dim_ThoiGian, {
  foreignKey: "MaThoiGian",
  targetKey: "MaThoiGian",
});

export default Fact_Kho;
