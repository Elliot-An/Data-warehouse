import { DataTypes } from "sequelize";
import {sequelizeIDB as sequelize} from "../../config/connect.config.js";
import VanPhongDaiDien from "./vanphongdaidien.model.js";

const KhachHang = sequelize.define("khachhang", {
  MaKH: {
    type: DataTypes.STRING(10),
    allowNull: false,
    primaryKey: true,
  },
  TenKH: {
    type: DataTypes.STRING(45),
    allowNull: true,
  },
  MaThanhPho: {
    type: DataTypes.STRING(10),
    allowNull: false,
    references: {
      model: VanPhongDaiDien,
      key: "MaThanhPho",
    },
  },
  NgayDatHangDauTien: {
    type: DataTypes.DATE,
    allowNull: true,
  },
}, {
  tableName: "khachhang",
  timestamps: false,
});

KhachHang.belongsTo(VanPhongDaiDien, {
  foreignKey: "MaThanhPho",
  targetKey: "MaThanhPho",
});

export default KhachHang;
