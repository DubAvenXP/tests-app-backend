const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const config = require('./config');

const postgresConnection = require('./libs/sequelize');

class Server {
    constructor() {
        this.app = express();
        this.port = config.port;

        this.paths = {
            user: '/api/v1/users',
            role: '/api/v1/roles',
            auth: '/api/v1/auth',
        };

        this.connectDB();
        this.middlewares();
        this.routes();
    }

    async connectDB() {
        try {
            postgresConnection.authenticate();
            console.log('Database connection has been established successfully.');
        } catch (error) {
            console.log('Unable to connect to the database:', error);
        }
    }

    middlewares() {
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(helmet());
        this.app.use(express.static('public'));
    }

    routes() {
        this.app.use(this.paths.user, require('./modules/users/routes/user.router'));
        this.app.use(this.paths.role, require('./modules/users/routes/role.router'));
        this.app.use(this.paths.auth, require('./modules/users/routes/auth.router'));
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Application running on http://localhost:${this.port}`);
        });


    }
}

module.exports = Server;