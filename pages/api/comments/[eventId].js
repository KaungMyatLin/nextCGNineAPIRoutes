import { MongoClient } from 'mongodb'
import getAllDocuments from '../../../helpers/db-util'
async function handler(req,res) {
    const eventId = req.query.eventId;
    const client = await MongoClient.connect('mongodb+srv://anyadmin:tw22d56f@cluster0.l3tew0h.mongodb.net/events?retryWrites=true&w=majority')
    if (req.method === 'POST') {
        const {name, text, email} = req.body;
        if (!email.includes('@') || !name || name.trim() === '' || !text || text.trim() === '') {
            res.status(422).json( { message: "invalid input"})
            return
        }
        const newComment = {
            email,
            name,
            text,
            eventId,
        }
        const db = client.db();
        const result = await db.collection('comments').insertOne(newComment)
        res.status(201).json( { message: "Added comment!", comment: newComment, result: result})
    }
    if (req.method === 'GET') {
            // {id: 'c1', name: 'Max', text: "A first comment"},
            // {id: 'c2', name: 'Manual', text: "A second comment"},
        // const documents = await db.collection('comments').find().sort({_id: -1}).toArray()
        const db = client.db();
        const documents = await db.collection('comments').find().sort({_id: -1}).toArray()
        console.log("🚀 ~ documents", documents)
        res.status(201).json({comments: documents})
    }
    client.close();
}
export default handler