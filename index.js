const express = require("express");
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());


/** 
 *username: bduser2
 *password:  bGC3coToiahFVAAT
*/



const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://bduser2:bGC3coToiahFVAAT@cluster0.crafy20.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();
        // Send a ping to confirm a successful connection 
        const usercollection = await client.db("MongoCurd").collection("users");
        console.log('before post')
        app.post('/users', async (req, res) => {
            console.log("post is called")
            const user = req.body;
            const result = await usercollection.insertOne(user);
            res.send(result)
        })
        console.log('after post')
    } finally {
        // Ensures that the client will close when you finish/error
        //await client.close();
    }
}
run().catch(console.dir);

app.get('/', (req, res) => {
    res.send("Hello from server2");
})

app.listen(port, () => {
    console.log(`lesting form port=${port}`)
})