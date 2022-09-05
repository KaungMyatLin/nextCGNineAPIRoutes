import { MongoClient } from 'mongodb'
async function connectDB() {
    const client = await MongoClient.connect('mongodb+srv://anyadmin:tw22d56f@cluster0.l3tew0h.mongodb.net/events?retryWrites=true&w=majority')
    return client;
}
async function insertDocument(client, documents) {
    const db = client.db();
    await db.collection('newsletter').insertOne(documents)
}
async function newsletterHandler(req, res) {
    if (req.method === 'POST') {
        const em = req.body.email

        if (!em || !em.includes('@')) {
            res.status(422).json( {message: "invalid em"})
            return;
        }
        let client;
        try {
            client = await connectDB();
        }
        catch (err) {
            res.status(500).json({message: "connecting to db failed"})
            return;
        }

        try {
            await insertDocument(client, {email: em});
            client.close();
        }
        catch (err) {
            res.status(500).json({message: "inserting to db failed"})
            return;
        }

        res.status(201).json({message: "signed up done!"})
    }
}

export default newsletterHandler