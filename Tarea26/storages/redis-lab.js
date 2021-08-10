const session = require('express-session');

const RedisStore = require('connect-redis')(session)
const redis = require('redis');

// createClient(<puerto>, <host>)
const client = redis.createClient(14899, '13313-13313.c51.ap-southeast-2-1.ec2.cloud.redislabs.com')

// auth(<contraseña>)
client.auth('BgHJlaIMTfI39cLh6CU7qoBdJ5uWkI7V', (err) => {
    if (err) throw err;
});

class RedisLab {

    constructor() { }

    getSession() {
        let sessionConfig = session({
            store: new RedisStore({
                client: client,
                ttl: 300
            }),
            secret: 'secret',
            resave: false,
            saveUninitialized: false
        });

        return sessionConfig;
    }
}

module.exports = new RedisLab();