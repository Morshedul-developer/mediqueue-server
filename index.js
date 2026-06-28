const express = require("express");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const cors = require("cors");
const dotenv = require("dotenv");
const app = express();
const port = process.env.PORT || 5000;

dotenv.config();
app.use(cors());
app.use(express.json());

const uri = process.env.MONGODB_URI;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    // await client.db("admin").command({ ping: 1 });

    const db = client.db("mediqueue");
    const tutorsCollection = db.collection("tutorsCollection");
    const myTutorsCollection = db.collection("myTutorCollection");

    app.get("/tutors", async (req, res) => {
      const cursor = tutorsCollection.find();
      const result = await cursor.toArray();
      res.send(result);
    });
    app.get("/available-tutors", async (req, res) => {
      const cursor = tutorsCollection.find();
      const result = await cursor.limit(6).toArray();
      res.send(result);
    });

    app.get("/tutors/:id", async (req, res) => {
      const { id } = req.params;
      const query = { _id: new ObjectId(id) };
      const result = await tutorsCollection.findOne(query);
      res.send(result);
    });

    app.get("/myAddedTutors", async (req, res) => {
      const email = req.query.email;

      const query = {
        email: email,
      };

      const cursor = myTutorsCollection.find(query);
      const result = await cursor.toArray();

      res.send(result);
    });

    app.post("/addMyTutor", async (req, res) => {
      const myTutor = req.body;

      await myTutorsCollection.insertOne(myTutor);
      const result = await tutorsCollection.insertOne(myTutor);

      res.send(result);
    });

    app.patch("/myAddedTutors/:id", async (req, res) => {
      const id = req.params.id;
      const updatedTutor = req.body;

      const tutor = await myTutorsCollection.findOne({
        _id: new ObjectId(id),
      });

      const updateDoc = {
        $set: updatedTutor,
      };

      const myTutorResult = await myTutorsCollection.updateOne(
        { _id: new ObjectId(id) },
        updateDoc,
      );

      const query = {
        email: tutor.email,
        tutorName: tutor.tutorName,
      };

      await tutorsCollection.updateOne(query, updateDoc);

      res.send(myTutorResult);
    });

    app.delete("/myAddedTutors/:id", async (req, res) => {
      const id = req.params.id;

      const query = {
        _id: new ObjectId(id),
      };

      const result = await myTutorsCollection.deleteOne(query);

      res.send(result);
    });

    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!",
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
