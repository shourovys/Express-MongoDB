const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient;
require('dotenv').config()

const app = express()
app.use(cors())
app.use(bodyParser.json())

const product = [
    { name: 'laptop', price: 333 },
    { name: 'honda', price: 65476 },
    { name: 'car', price: 4567 },
    { name: 'rax', price: 44 },
    { name: 'rod', price: 333 },
    { name: 'phone', price: 3553 },
    { name: 'rat', price: 356 },
    { name: 'pat', price: 678 }
]

// const pass = process.env.DB_PASS
const uri = process.env.DB_PATH;

let client = new MongoClient(uri, { useNewUrlParser: true });

//this api for get product for user
app.get('/product/:id', (req, res) => {
    const productId = req.params.id
    if (product[productId]) {
        const reqProduct = product[productId]
        res.send(reqProduct)
    } else {
        res.send(`${productId} product is coming`)
    }
})



//this api for post product for user to database
app.post('/addProduct', (req, res) => {
    client = new MongoClient(uri, { useNewUrlParser: true });
    const newProduct = req.body
    //connect with database
    client.connect(err => {
        console.log('in new ', err)
        const collection = client.db("EStore").collection("Product");
        // perform actions on the collection object
        collection.insertOne(newProduct, (error, result) => {
            if (result) {
                res.send(result.ops[0])
                // console.log(result.ops);
            }
            else {
                console.log(error);
            }
        })
        client.close();
    });

})


app.get('/products', (req, res) => {
    client = new MongoClient(uri, { useNewUrlParser: true });
    //connect with database
    client.connect(err => {
        const collection = client.db("EStore").collection("Product");
        // perform actions on the collection object
        collection.find().limit(5).toArray((error, documents) => {
            if (error) {
                console.log('get error', error);
            }
            else {
                res.send(documents)
            }
        })
        client.close();
    });
})
//103.87.249.98
const prot = process.env.PORT || 3000
app.listen(prot, () => "your app listen on 3000")














