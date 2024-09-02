import { createClient } from 'redis';

class RedisClient {
  constructor() {
    this.client = createClient();

    // Handle Redis client errors
    this.client.on('error', (err) => {
      console.error(`Redis Client Error: ${err}`);
    });

    // Connect to Redis and wait for the connection to be established
    this.connectClient();
  }

  async connectClient() {
    try {
      await this.client.connect();
      console.log("Connected to Redis successfully!");
    } catch (err) {
      console.error("Redis connection failed:", err);
    }
  }

  // Check if Redis is alive
  isAlive() {
    return this.client.isOpen;
  }

  // Get the value of a key
  async get(key) {
    try {
      const value = await this.client.get(key);
      return value;
    } catch (err) {
      console.error(`Error getting key ${key}: ${err}`);
      return null;
    }
  }

  // Set a key with an expiration time
  async set(key, value, duration) {
    try {
      await this.client.setEx(key, duration, value);
    } catch (err) {
      console.error(`Error setting key ${key}: ${err}`);
    }
  }

  // Delete a key from Redis
  async del(key) {
    try {
      await this.client.del(key);
    } catch (err) {
      console.error(`Error deleting key ${key}: ${err}`);
    }
  }
}

// Create and export an instance of RedisClient
const redisClient = new RedisClient();
export default redisClient;
