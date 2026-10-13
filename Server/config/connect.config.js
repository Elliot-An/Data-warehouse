import { Sequelize } from 'sequelize';

const databases = ['CSDLBH', 'CSDLVPDD', 'IDB', 'DTWH']; // Thay tên các database bạn muốn kết nối ở đây

const sequelizeInstances = {};

databases.forEach(dbName => {
  const sequelize = new Sequelize(dbName, 'sa', '123456', {
    dialect: 'mssql',
    host: 'localhost',
    timezone: '+07:00',
    port: 1609,
    dialectOptions: {
      options: {
        // instanceName: 'SQLWH',
        encrypt: false,
        trustServerCertificate: true,
      }
    }
  });

  sequelize.authenticate().then(() => {
    console.log(`Connection to ${dbName} has been established successfully.`);
  }).catch((error) => {
    console.error(`Unable to connect to the database ${dbName}: `, error);
  });

  sequelizeInstances[dbName] = sequelize;
});

export const sequelizeCSDLBH = sequelizeInstances['CSDLBH'];
export const sequelizeCSDLVPDD = sequelizeInstances['CSDLVPDD'];
export const sequelizeIDB = sequelizeInstances['IDB'];
export const sequelizeDTWH = sequelizeInstances['DTWH'];
