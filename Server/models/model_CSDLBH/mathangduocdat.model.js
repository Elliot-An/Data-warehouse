import { DataTypes } from "sequelize";
import {sequelizeCSDLBH as sequelize} from "../../config/connect.config.js";
import DonDatHang from "./dondathang.model.js";
import MatHang from "./mathang.model.js";

const MatHangDuocDat = sequelize.define("mathangduocdat", {
  MaDon: {
    type: DataTypes.STRING(10),
    allowNull: false,
    primaryKey: true,
    references: {
      model: DonDatHang,
      key: "MaDon",
    },
  },
  MaMatHang: {
    type: DataTypes.STRING(10),
    allowNull: false,
    primaryKey: true,
    references: {
      model: MatHang,
      key: "MaMH",
    },
  },
  SoLuongDat: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  GiaDat: {
    type: DataTypes.DECIMAL(10, 0),
    allowNull: true,
  },
  NgayGiaoHang: {
    type: DataTypes.DATE,
    allowNull: true,
  },
}, {
  tableName: "mathangduocdat",
  timestamps: false,
});

MatHangDuocDat.belongsTo(DonDatHang, {
  foreignKey: "MaDon",
  targetKey: "MaDon",
});

MatHangDuocDat.belongsTo(MatHang, {
  foreignKey: "MaMatHang",
  targetKey: "MaMH",
});

export default MatHangDuocDat;
