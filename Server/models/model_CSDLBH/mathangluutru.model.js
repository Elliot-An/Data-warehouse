import { DataTypes } from "sequelize";
import {sequelizeCSDLBH as sequelize} from "../../config/connect.config.js";
import MatHang from "./mathang.model.js";
import CuaHang from "./cuahang.model.js";

const MatHangLuuTru = sequelize.define("mathangluutru", {
  MaMatHang: {
    type: DataTypes.STRING(10),
    allowNull: false,
    primaryKey: true,
    references: {
      model: MatHang,
      key: "MaMH",
    },
  },
  MaCuaHang: {
    type: DataTypes.STRING(10),
    allowNull: false,
    primaryKey: true,
    references: {
      model: CuaHang,
      key: "MaCuaHang",
    },
  },
  ThoiGianCapNhat: {
    type: DataTypes.STRING(30),
    allowNull: true,
  },
  SoLuongTonKho: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
}, {
  tableName: "mathangluutru",
  timestamps: false,
});

MatHangLuuTru.belongsTo(MatHang, {
  foreignKey: "MaMatHang",
  targetKey: "MaMH",
});

MatHangLuuTru.belongsTo(CuaHang, {
  foreignKey: "MaCuaHang",
  targetKey: "MaCuaHang",
});

export default MatHangLuuTru;
