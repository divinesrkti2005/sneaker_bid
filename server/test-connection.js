// Quick MongoDB Connection Test
// Run this to test your MongoDB connection: node test-connection.js

require('dotenv').config();
const mongoose = require('mongoose');

const testConnection = async () => {
    try {
        console.log('🔄 Attempting to connect to MongoDB...');
        console.log('📍 Connection String:', process.env.MONGO_URI ? process.env.MONGO_URI.replace(/\/\/.*@/, '//***:***@') : 'NOT SET');
        
        if (!process.env.MONGO_URI) {
            console.error('❌ MONGO_URI not found in .env file');
            process.exit(1);
        }
        
        await mongoose.connect(process.env.MONGO_URI);
        console.log('✅ MongoDB Connected Successfully!');
        console.log('📊 Database:', mongoose.connection.db.databaseName);
        console.log('🔗 Host:', mongoose.connection.host);
        
        // Test a simple operation
        const collections = await mongoose.connection.db.listCollections().toArray();
        console.log('📁 Collections:', collections.length > 0 ? collections.map(c => c.name).join(', ') : 'None (database is empty)');
        
        await mongoose.connection.close();
        console.log('✅ Connection test completed successfully!');
        process.exit(0);
    } catch (err) {
        console.error('❌ Connection Failed!');
        console.error('Error:', err.message);
        
        if (err.message.includes('authentication failed')) {
            console.error('\n💡 Tip: Check your username and password in the connection string');
        } else if (err.message.includes('ENOTFOUND') || err.message.includes('getaddrinfo')) {
            console.error('\n💡 Tip: Check your connection string and network access');
        } else if (err.message.includes('IP')) {
            console.error('\n💡 Tip: Whitelist your IP address in MongoDB Atlas Network Access');
        } else if (err.message.includes('ECONNREFUSED')) {
            console.error('\n💡 Tip: Make sure MongoDB is running locally on port 27017');
            console.error('   Try: Check MongoDB service status or start MongoDB');
        }
        
        process.exit(1);
    }
};

testConnection();
