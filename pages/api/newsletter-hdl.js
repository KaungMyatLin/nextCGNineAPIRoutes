import { connectDB, insertDocument } from '../../helpers/db-util'
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
            await insertDocument(client, 'newsletter', {email: em});
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