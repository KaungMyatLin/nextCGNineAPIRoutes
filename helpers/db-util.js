import { MongoClient } from 'mongodb'
export async function connectDB() {
    const client = await MongoClient.connect('mongodb+srv://an:tw22d56f@cluster0.l3tew0h.mongodb.net/events?retryWrites=true&w=majority')
    return client;
}
export async function insertDocument(client, collection, documents) {
    const db = client.db();
    return await db.collection(collection).insertOne(documents)
}
export async function getAllDocuments(client, collection, sort, filter = {}) {
    const db = client.db();
    const documents = await db.collection(collection).find().sort(sort).toArray()
    return documents;
}