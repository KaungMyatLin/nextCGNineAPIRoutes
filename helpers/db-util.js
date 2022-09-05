
async function getAllDocuments(client, collection, sort, filter = {}) {
    console.log("🚀 ~ client, collection, sort", client, collection, sort)
    const db = client.db();
    const documents = await db.collection(collection).find().sort(sort).toArray()
    return documents;
}

export default getAllDocuments