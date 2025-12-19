// test_mongo.js
const { MongoClient } = require("mongodb");

const uri = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017";
const dbName = process.env.MONGODB_DB || "ai_interview_db";

async function run() {
  const client = new MongoClient(uri);
  try {
    await client.connect();
    console.log("✅ Connected to MongoDB");
    const db = client.db(dbName);
    // create a collection and insert a test doc
    const r = await db.collection("healthcheck").insertOne({ ok: true, ts: new Date() });
    console.log("Inserted:", r.insertedId);
    const docs = await db.collection("healthcheck").find().toArray();
    console.log("Health docs:", docs);
  } catch (e) {
    console.error("❌ MongoDB Connection Error:", e);
  } finally {
    await client.close();
  }
}
run();
