import { DataTypes } from "sequelize";
import {sequelizeCSDLBH as sequelize} from "../../config/connect.config.js";

const DonDatHang = sequelize.define("dondathang", {
  MaDon: {
    type: DataTypes.STRING(10),
    allowNull: false,
    primaryKey: true,
  },
  NgayDatHang: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  MaKhachHang: {
    type: DataTypes.STRING(10),
    allowNull: false,
  },
}, {
  tableName: "dondathang",
  timestamps: false,
});

export default DonDatHang;
