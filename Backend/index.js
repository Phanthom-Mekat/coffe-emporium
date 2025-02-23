const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express()
const port = process.env.PORT || 5000;

app.use(cors())
app.use(express.json())


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.zhb6u.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

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

     
    const coffeCollection = client.db("coffeeDB").collection('coffes')
    const userCollection = client.db("coffeeDB").collection('users')

    app.get('/coffee',async(req,res)=>{
        const cursor = coffeCollection.find()
        const result = await cursor.toArray();
        res.send(result)
    })
    app.get('/coffee/:id',async(req,res)=>{
        const id =req.params.id
        const query = {_id: new ObjectId(id)}
        const result = await coffeCollection.findOne(query)
        res.send(result)
    })

    app.post("/coffee",async(req,res)=>{
        const newCoffee= req.body;
        console.log(newCoffee)
        const result = await coffeCollection.insertOne(newCoffee);
        res.send(result)
    })

    app.put('/coffee/:id',async(req,res)=>{
        const id = req.params.id
        const filter= {_id: new ObjectId(id)}
        const options = { upsert: true }
        const updatedCoffee = req.body
        const coffee = {
            $set: {
                name: updatedCoffee.name,
                chef: updatedCoffee.chef,
                supplier: updatedCoffee.supplier,
                taste: updatedCoffee.taste,
                category: updatedCoffee.category,
                details: updatedCoffee.details,
                photo: updatedCoffee.photo
            }
        }
        const result = await coffeCollection.updateOne(filter,coffee,options)
        res.send(result)

    })

    app.delete("/coffee/:id", async(req,res)=>{
        const id = req.params.id
        const query ={_id: new ObjectId(id)}
        const result = await coffeCollection.deleteOne(query)
        res.send(result)
    })

    // user info db apis
  app.get("/users",async(req,res)=>{
    const cursor =  userCollection.find();
    const result = await cursor.toArray();
    res.send(result)
  })


    app.post("/users",async(req,res)=>{
        const newUser= req.body;
        console.log(newUser)
        const result = await userCollection.insertOne(newUser);
        res.send(result)
    })

    app.patch('/users',async(req,res)=>{
        const email = req.body.email
        const filter = { email }
        const updatedUser = req.body
        const user = {
            $set: {
              signinTime: updatedUser?.signinTime,
            }
        }
        const result = await userCollection.updateOne(filter,user)
        res.send(result)
    })

    app.delete('/users/:id',async(req,res)=>{
      const id =req.params.id
      const query ={_id:new ObjectId(id) }
      const result = await userCollection.deleteOne(query)
      res.send(result)
    })




    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    
  }
}
run().catch(console.dir);


app.get('/',(req,res)=>{
    res.send('coffe started')
})

app.listen(port,()=>{
    console.log(`Coffe is running in port :${port}`)
})