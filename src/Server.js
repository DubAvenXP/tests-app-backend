const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const config = require('./config');

const mysqlConnection = require('./libs/sequelize');

class Server {
    constructor() {
        this.app = express();
        this.port = config.port;

        this.paths = {
            tests: '/api/v1/tests',
            questions: '/api/v1/questions',
            answers: '/api/v1/answers',
        };

        this.connectDB();
        this.middlewares();
        this.routes();
    }

    async connectDB() {
        try {
            mysqlConnection.authenticate();
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
        this.app.use(this.paths.answers, require('./modules/teachers/routes/answer.router'));
        this.app.use(this.paths.questions, require('./modules/teachers/routes/question.router'));
        this.app.use(this.paths.tests, require('./modules/teachers/routes/test.router'));
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Application running on http://localhost:${this.port}`);
        });


    }
}

module.exports = Server;