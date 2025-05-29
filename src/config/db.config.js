const connectMongoDB = require('./mongoose.db.config');
const { connectPostgresDB } = require('./sequelize.db.config');

const connectDatabase = async () => {
    const dbType = process.env.DB_TYPE || 'mongo';

    if (dbType === 'mongo') {
        await connectMongoDB();
    } else if (dbType === 'postgres') {
        await connectPostgresDB();
    } else {
        throw new Error('DB_TYPE inválido. Use "mongo" ou "postgres".');
    }
};

module.exports = connectDatabase;
