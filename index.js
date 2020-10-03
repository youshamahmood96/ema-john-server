const express = require('express');
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.json());
const cors = require('cors')
app.use(cors())



require('dotenv').config()


const MongoClient = require('mongodb').MongoClient;
const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASS}@cluster0.k3wts.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true,useUnifiedTopology: true });
client.connect(err => {
  const collectionD = client.db(`${process.env.DB_NAME}`).collection("produts");
  const collectionOrder = client.db(`${process.env.DB_NAME}`).collection("orders")
  app.post('/addProduct',(req, res) =>{
      const products = req.body
      collectionD.insertOne(products)
      .then(result =>{
          console.log(result.insertedCount);
          res.send(result.insertedCount)
      })
  })
  app.post('/addOrder',(req, res) =>{
    const order = req.body
    collectionOrder.insertOne(order)
    .then(result =>{
        res.send(result.insertedCount>0)
    })
})
  app.get('/products',(req, res) =>{
    collectionD.find({})
    .toArray((err,documents) =>{
        res.send(documents)
    })
})
  app.get(`/singleProduct/:key`,(req, res) =>{
      collectionD.find({key:req.params.key})
      .toArray((err,documents) =>{
          res.send(documents[0])
      })
  })
  app.post('/productsByKeys',(req, res)=>{
      const productKeys = req.body
      collectionD.find({key:{$in:productKeys}})
      .toArray((err,documents)=>{
          res.send(documents)
      })

  })
  app.post('/addOrder',(req, res) =>{
    const order = req.body
    collectionOrder.insertOne(products)
    .then(result =>{
        res.send(result.insertedCount>0)
    })
})
 

});
  
const port =5000

app.listen(process.env.PORT || port)















app.listen(5000)