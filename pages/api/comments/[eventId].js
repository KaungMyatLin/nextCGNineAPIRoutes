import { connectDB, insertDocument, getAllDocuments } from '../../../helpers/db-util'
async function handler(req,res) {
    const eventId = req.query.eventId;
    let client;
    try{
        client = await connectDB();
    }
    catch (err) {
        res.status(500).json({message: "connecting to db failed"})
        return;
    }
    if (req.method === 'POST') {
        const {name, text, email} = req.body;
        if (!email.includes('@') || !name || name.trim() === '' || !text || text.trim() === '') {
            res.status(422).json( { message: "invalid input"})
            client.close();
            return;
        }
        const newComment = {
            email,
            name,
            text,
            eventId,
        }
        try{
            const result = await insertDocument(client, 'comments', newComment)
            newComment._id = result.insertedId
            res.status(201).json( { message: "Added comment!", comment: newComment, result: result})
        }
        catch (err) {
            res.status(500).json({message: "inserting to db failed"})
        }
    }
    if (req.method === 'GET') {
            // {id: 'c1', name: 'Max', text: "A first comment"},
            // {id: 'c2', name: 'Manual', text: "A second comment"},
        try {
            const documents = await getAllDocuments(client, 'comments', {_id: -1} )     // {eventId: eventId}
            res.status(200).json({comments: documents})
        }
        catch (err) {
            res.status(500).json({message: "getting from db failed"})
        }
    }
    client.close();
}
export default handler