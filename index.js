const express = require('express')
const app = express()
const port = process.env.PORT || 5000
const { MongoClient, ServerApiVersion } = require('mongodb');
const cors = require('cors')
require('dotenv').config()
app.use(cors())
app.use(express.json())




const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.1m4kiwj.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
const userCollection = client.db('eRepliqDB').collection('users')
async function run() {
    try {

        app.post('/users', async (req, res) => {
            const query = req.body
            const result = await userCollection.insertOne(query)
            res.send(result);
            console.log(result);
        })


    } finally {

    }
} run().catch(err => console.error(err))

app.get('/', async (req, res) => {
    res.send('server is running')
})

app.listen(port, () => {
    console.log(`server is running on port ${port}`)
})