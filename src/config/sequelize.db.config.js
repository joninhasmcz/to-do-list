const {Sequelize} = require('sequelize');
const logger = require("../utils/logger");
require('dotenv').config();

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        dialect: 'postgres',
        logging: false,
    });

const connectPostgresDB = async () => {
    try {
        await sequelize.authenticate();
        logger.info('🟢 PostgreSQL Connected!');
    } catch (error) {
        logger.error('🔴 PostgreSQL Connection Error: ' + error.message);
        process.exit(1);
    }
};
module.exports = { sequelize, connectPostgresDB};

