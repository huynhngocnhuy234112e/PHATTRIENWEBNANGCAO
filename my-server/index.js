const express = require("express")
const app = express()
const port = 3000
const morgan = require("morgan")
app.use(morgan("combined"))
//create default API
app.get("/", (req, res) => {
    res.send("Xin chào quý khách!")
})
app.listen(port, () => {
    console.log(`My Server is starting at port =${port}`)
})

const cors = require("cors")
app.use(cors())

const bodyParser = require("body-parser")
app.use(bodyParser.json())


const path = require("path")
app.use("/static", express.static(path.join(__dirname, "public")))

let database = [
    { "BookId": "b1", "BookName": "Kỹ thuật lập trình cơ bản", "Price": 70, "Image": "b1.png" },
    { "BookId": "b2", "BookName": "Kỹ thuật lập trình nâng cao", "Price": 100, "Image": "b2.png" },
    { "BookId": "b3", "BookName": "Máy học cơ bản", "Price": 200, "Image": "b3.png" },
    { "BookId": "b4", "BookName": "Máy học nâng cao", "Price": 300, "Image": "b4.png" },
    { "BookId": "b5", "BookName": "Lập trình Robot cơ bản", "Price": 250, "Image": "b5.png" },
]
app.get("/books", (req, res) => {
    res.send(database)
})
app.get("/books/:id", cors(), (req, res) => {
    id = req.params["id"]
    let p = database.find(x => x.BookId == id)
    res.send(p)
})
app.post("/books", cors(), (req, res) => {
    //put json book into database
    database.push(req.body);
    //send message to client(send all database to client)
    res.send(database)
})
app.put("/books", cors(), (req, res) => {
    book = database.find(x => x.BookId == req.body.BookId)
    if (book != null) {
        book.BookName = req.body.BookName
        book.Price = req.body.Price
        book.Image = req.body.Image
    }
    res.send(database)
})
app.delete("/books/:id", cors(), (req, res) => {
    id = req.params["id"]
    database = database.filter(x => x.BookId !== id);
    res.send(database)
})

const bcrypt = require('bcrypt');
const { MongoClient } = require('mongodb');
const mongoClient = new MongoClient("mongodb://127.0.0.1:27017");
mongoClient.connect();
const userCollection = mongoClient.db("FashionData").collection("USER");

app.post("/login", cors(), async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await userCollection.findOne({ username: username });
        if (!user) {
            return res.status(401).send({ success: false, message: "Sai tên đăng nhập hoặc mật khẩu!" });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (isMatch) {
            res.send({ success: true, message: "Đăng nhập thành công!" });
        } else {
            res.status(401).send({ success: false, message: "Sai tên đăng nhập hoặc mật khẩu!" });
        }
    } catch (err) {
        res.status(500).send({ success: false, message: "Lỗi server!" });
    }
})

app.post("/register", cors(), async (req, res) => {
    const { username, password } = req.body;
    try {
        const existingUser = await userCollection.findOne({ username: username });
        if (existingUser) {
            return res.status(400).send({ success: false, message: "Tên đăng nhập đã tồn tại!" });
        }

        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        await userCollection.insertOne({
            username: username,
            password: hashedPassword
        });

        res.send({ success: true, message: "Đăng ký thành công!" });
    } catch (err) {
        console.error("Lỗi đăng ký:", err);
        res.status(500).send({ success: false, message: "Lỗi server!" });
    }
})