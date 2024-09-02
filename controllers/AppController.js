const redisClient = require('../utils/redis');
const dbClient = require('../utils/db');

const AppController = {
  // Handle /status route
  async getStatus(req, res) {
    const redisAlive = redisClient.isAlive();
    const dbAlive = dbClient.isAlive();
    res.status(200).json({
      redis: redisAlive,
      db: dbAlive
    });
  },

  // Handle /stats route
  async getStats(req, res) {
    try {
      const [userCount, fileCount] = await Promise.all([
        dbClient.nbUsers(),
        dbClient.nbFiles()
      ]);

      res.status(200).json({
        users: userCount,
        files: fileCount
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
};

module.exports = AppController;
