const express = require('express');
const app = express();
const port = 4000;

const morgan = require("morgan");
app.use(morgan("combined"));

const bodyParser = require("body-parser");
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));

const cors = require("cors");
app.use(cors());

const { MongoClient, ObjectId } = require('mongodb');
const client = new MongoClient("mongodb://127.0.0.1:27017");
client.connect();
const database = client.db("FashionData");
const fashionCollection = database.collection("Fashion");

app.listen(port, () => {
    console.log(`Server Fashion đang chạy tại http://localhost:${port}`);
});

app.get("/", (req, res) => {
    res.send("Server Fashion API - Exercise 58 đang hoạt động!");
});

// Helper: map document từ schema MongoDB gốc sang schema đề bài 58
function mapFashion(doc) {
    return {
        _id: doc._id,
        fashion_title: doc.fashion_title || doc.fashion_subject || '',
        fashion_detail: doc.fashion_detail || '',
        thumbnail: doc.thumbnail || doc.fashion_image || '',
        style: doc.style || '',
        creation_date: doc.creation_date || doc._id.getTimestamp()
    };
}

app.get("/fashions", cors(), async (req, res) => {
    try {
        const result = await fashionCollection.find({}).toArray();
        res.send(result.map(mapFashion));
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
});

app.get("/fashions/style/:style", cors(), async (req, res) => {
    try {
        const result = await fashionCollection
            .find({ style: req.params.style })
            .toArray();
        res.send(result.map(mapFashion));
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
});

app.get("/fashions/:id", cors(), async (req, res) => {
    try {
        const result = await fashionCollection.findOne({ _id: new ObjectId(req.params.id) });
        if (!result) return res.status(404).send({ error: "Không tìm thấy Fashion" });
        res.send(mapFashion(result));
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
});

app.post("/fashions", cors(), async (req, res) => {
    try {
        const newFashion = {
            fashion_title: req.body.fashion_title,
            fashion_detail: req.body.fashion_detail,
            thumbnail: req.body.thumbnail,
            style: req.body.style,
            creation_date: new Date(req.body.creation_date || Date.now())
        };
        const result = await fashionCollection.insertOne(newFashion);
        newFashion._id = result.insertedId;
        res.send(newFashion);
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
});

app.put("/fashions/:id", cors(), async (req, res) => {
    try {
        const o_id = new ObjectId(req.params.id);
        const updateData = {
            fashion_title: req.body.fashion_title,
            fashion_detail: req.body.fashion_detail,
            thumbnail: req.body.thumbnail,
            style: req.body.style,
            creation_date: new Date(req.body.creation_date || Date.now())
        };
        const result = await fashionCollection.updateOne({ _id: o_id }, { $set: updateData });
        if (result.matchedCount === 0) return res.status(404).send({ error: "Không tìm thấy Fashion" });
        updateData._id = o_id;
        res.send(updateData);
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
});

app.delete("/fashions/:id", cors(), async (req, res) => {
    try {
        const result = await fashionCollection.deleteOne({ _id: new ObjectId(req.params.id) });
        if (result.deletedCount === 0) return res.status(404).send({ error: "Không tìm thấy Fashion" });
        res.send({ message: "Xóa Fashion thành công!", _id: req.params.id });
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
});
