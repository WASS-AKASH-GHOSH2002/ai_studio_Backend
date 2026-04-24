// otp.cache.js
const RedisClient = require('../config/redis.client');

const OTP_TTL = 5 * 60; // 5 minutes in seconds

class OtpCache {
  static instance = null;

  constructor() {
    this.redis = RedisClient.getInstance();
  }

  static getInstance() {
    if (!OtpCache.instance) OtpCache.instance = new OtpCache();
    return OtpCache.instance;
  }

  async set(email, otp, data) {
    const payload = JSON.stringify({ otp, ...data });
    await this.redis.set(`otp:${email}`, payload, 'EX', OTP_TTL);
  }

  async get(email) {
    const data = await this.redis.get(`otp:${email}`);
    return data ? JSON.parse(data) : null;
  }

  async delete(email) {
    await this.redis.del(`otp:${email}`);
  }
}

module.exports = OtpCache;
