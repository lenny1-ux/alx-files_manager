const { MongoClient } = require('mongodb');

class DBClient {
  constructor() {
    // Get environment variables or use defaults
    const host = process.env.DB_HOST || 'localhost';
    const port = process.env.DB_PORT || 27017;
    const databaseName = process.env.DB_DATABASE || 'files_manager';

    // Create MongoDB client
    const url = `mongodb://${host}:${port}`;
    this.client = new MongoClient(url, { useUnifiedTopology: true });
    this.database = null;

    // Connect to MongoDB
    this.client.connect()
      .then(() => {
        this.database = this.client.db(databaseName);
        console.log(`Successfully connected to database: ${databaseName}`);
      })
      .catch((err) => {
        console.error(`Failed to connect to MongoDB: ${err}`);
      });
  }

  // Check if MongoDB connection is alive
  isAlive() {
    return this.client && this.client.isConnected();
  }

  // Get the number of documents in the users collection
  async nbUsers() {
    if (!this.isAlive()) {
      return 0;
    }
    return this.database.collection('users').countDocuments();
  }

  // Get the number of documents in the files collection
  async nbFiles() {
    if (!this.isAlive()) {
      return 0;
    }
    return this.database.collection('files').countDocuments();
  }
}

// Create and export an instance of DBClient
const dbClient = new DBClient();
module.exports = dbClient;
