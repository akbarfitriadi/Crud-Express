import { Sequelize } from "sequelize";
import db from "../conf/Database.js";

const {DataTypes} = Sequelize;

const User = db.define('users', {
  npm: DataTypes.STRING,
  name: DataTypes.STRING,
  kelas: DataTypes.STRING,
  jurusan: DataTypes.STRING,
  phone: DataTypes.STRING
},{
  freezeTableName:true
});

export default User;

(async()=>{
  await db.sync();
})();
