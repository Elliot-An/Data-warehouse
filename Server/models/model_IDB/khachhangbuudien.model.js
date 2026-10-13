import { DataTypes } from "sequelize";
import {sequelizeIDB as sequelize} from "../../config/connect.config.js";
import KhachHang from "./khachhang.model.js";

const KhachHangBuuDien = sequelize.define("khachhangbuudien", {
  MaKH: {
    type: DataTypes.STRING(10),
    allowNull: false,
    primaryKey: true,
    references: {
      model: KhachHang,
      key: "MaKH",
    },
  },
  DiaChiBuuDien: {
    type: DataTypes.STRING(100),
    allowNull: true,
  },
  NgayTao: {
    type: DataTypes.DATE,
    allowNull: true,
  },
}, {
  tableName: "khachhangbuudien",
  timestamps: false,
});

KhachHangBuuDien.belongsTo(KhachHang, {
  foreignKey: "MaKH",
  targetKey: "MaKH",
});

export default KhachHangBuuDien;
