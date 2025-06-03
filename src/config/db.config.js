const connectMongoDB = require('./mongoose.db.config');
const {sequelizeConnection} = require('./sequelize.db.config');
const knexConnection = require('./knex.db.config')

const connectDatabase = async () => {
    const dbType = process.env.DB_TYPE || 'mongo';

    if (dbType === 'mongo') {
        await connectMongoDB();
    } else if (dbType === 'sequelize') {
        await sequelizeConnection();
    } else if (dbType === 'knex') {
        knexConnection
    }
    else
    {
        throw new Error('DB_TYPE inválido. Use "mongo" ou "postgres".');
    }
};

module.exports = connectDatabase;
