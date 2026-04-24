// redis.client.js
const Redis = require('ioredis');

class RedisClient {
  static instance = null;

  static getInstance() {
    if (!RedisClient.instance) {
      RedisClient.instance = new Redis(process.env.REDIS_URL, {
        tls: { rejectUnauthorized: false },
      });

      RedisClient.instance.on('connect', () => console.log('Redis Connected ✅'));
      RedisClient.instance.on('error', (err) => console.error('Redis Error ❌', err.message));
    }
    return RedisClient.instance;
  }
}

module.exports = RedisClient;
