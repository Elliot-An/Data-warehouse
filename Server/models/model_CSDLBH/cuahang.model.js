import { DataTypes } from "sequelize";
import {sequelizeCSDLBH as sequelize} from "../../config/connect.config.js";
import VanPhongDaiDien from "./vanphongdaidien.model.js";

const CuaHang = sequelize.define("cuahang", {
  MaCuaHang: {
    type: DataTypes.STRING(10),
    allowNull: false,
    primaryKey: true,
  },
  MaThanhPho: {
    type: DataTypes.STRING(10),
    allowNull: true,
    references: {
      model: VanPhongDaiDien,
      key: "MaThanhPho",
    },
  },
  SoDienThoai: {
    type: DataTypes.STRING(10),
    allowNull: true,
  },
  NgayKhaiTruong: {
    type: DataTypes.DATE,
    allowNull: true,
  },
}, {
  tableName: "cuahang",
  timestamps: false,
});

CuaHang.belongsTo(VanPhongDaiDien, {
  foreignKey: "MaThanhPho",
  targetKey: "MaThanhPho",
});

export default CuaHang;
