import {getDataFactKho} from "../controllers/factKho.controller.js";
import {getDataFactMatHang} from "../controllers/factMatHangBanRa.controller.js";

export default (app)=>{
  app.post("/factKho", getDataFactKho);
  app.post("/factMatHangBan", getDataFactMatHang);
}