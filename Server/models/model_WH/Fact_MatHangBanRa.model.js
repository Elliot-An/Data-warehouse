import { DataTypes } from "sequelize";
import {sequelizeDTWH as sequelize} from "../../config/connect.config.js";
import Dim_MatHang from "./Dim_MatHang.model.js";
import Dim_ThoiGian from "./Dim_ThoiGian.model.js";
import Dim_KhachHang from "./Dim_KhachHang.model.js";

const Fact_MatHangBanRa = sequelize.define("Fact_MatHangBanRa", {
  MaMatHang: {
    type: DataTypes.STRING(255),
    allowNull: false,
    primaryKey: true,
    references: {
      model: Dim_MatHang,
      key: "MaMatHang",
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
  MaKhachHang: {
    type: DataTypes.STRING(255),
    allowNull: false,
    primaryKey: true,
    references: {
      model: Dim_KhachHang,
      key: "MaKhachHang",
    },
  },
  SoLuong: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  DoanhThu: {
    type: DataTypes.DECIMAL(19, 4), // MONEY type in SQL Server
    allowNull: true,
  },
}, {
  tableName: "Fact_MatHangBanRa",
  timestamps: false,
});

Fact_MatHangBanRa.belongsTo(Dim_MatHang, {
  foreignKey: "MaMatHang",
  targetKey: "MaMatHang",
});

Fact_MatHangBanRa.belongsTo(Dim_ThoiGian, {
  foreignKey: "MaThoiGian",
  targetKey: "MaThoiGian",
});

Fact_MatHangBanRa.belongsTo(Dim_KhachHang, {
  foreignKey: "MaKhachHang",
  targetKey: "MaKhachHang",
});

export default Fact_MatHangBanRa;
