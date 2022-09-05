import { MongoClient } from 'mongodb'

async function handler(req,res) {
    const eventId = req.query.eventId;
    const client = await MongoClient.connect('mongodb+srv://anyadmin:tw22d56f@cluster0.l3tew0h.mongodb.net/events?retryWrites=true&w=majority')
    if (req.method === 'POST') {
        const {name, text, email} = req.body;
        console.log("🚀 ~ req.body", req.body)
        console.log("🚀 ~ email", email)
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
        console.log(result)
        res.status(201).json( { message: "Added comment!", comment: newComment})
    }
    if (req.method === 'GET') {
            // {id: 'c1', name: 'Max', text: "A first comment"},
            // {id: 'c2', name: 'Manual', text: "A second comment"},
        const db = client.db();
        const documents = await db.collection('comments').find().sort({ _id: -1 }).toArray()
        res.status(201).json({comments: documents})
    }
    client.close();
}
export default handler