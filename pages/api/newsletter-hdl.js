import { MongoClient } from 'mongodb'
async function newsletterHandler(req, res) {
    if (req.method === 'POST') {
        const em = req.body.email

        if (!em || !em.includes('@')) {
            res.status(422).json( {message: "invalid em"})
            return;
        }
        const client = await MongoClient.connect('mongodb+srv://anyadmin:tw22d56f@cluster0.l3tew0h.mongodb.net/events?retryWrites=true&w=majority')
        const db = client.db();
        await db.collection('newsletter').insertOne({email: em})
        client.close();
        res.status(201).json({message: "signed up done!"})
    }
}

export default newsletterHandler