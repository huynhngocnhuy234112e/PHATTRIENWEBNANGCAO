const express = require('express');
const app = express();
const port = 3002;
const morgan = require("morgan")
app.use(morgan("combined"))
const bodyParser = require("body-parser")
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb' }));
app.use(express.json());
const cors = require("cors");
app.use(cors())
var cookieParser = require('cookie-parser');
app.use(cookieParser());

// --- SESSION (Exercise 62) ---
var session = require('express-session');
app.use(session({ secret: "Shh, its a secret!" }));
app.listen(port, () => {
    console.log(`My Server listening on port ${port}`)
})
app.get("/", (req, res) => {
    res.send("This Web server is processed for MongoDB")
})
const { MongoClient, ObjectId } = require('mongodb');
client = new MongoClient("mongodb://127.0.0.1:27017");
client.connect();
database = client.db("FashionData");
fashionCollection = database.collection("Fashion");
userCollection = database.collection("USER");
productCollection = database.collection("Product");
const bcrypt = require('bcrypt');

// --- LOGIN + COOKIE (Exercise 61) ---
app.post("/user-login", cors(), async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await userCollection.findOne({ username: username });
        if (!user) {
            return res.send({ success: false, message: "Sai tên đăng nhập hoặc mật khẩu!" });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (isMatch) {
            // Lưu thông tin đăng nhập vào Cookie
            res.cookie("login_username", username, { maxAge: 7 * 24 * 60 * 60 * 1000 }); // 7 ngày
            res.cookie("login_password", password, { maxAge: 7 * 24 * 60 * 60 * 1000 });
            res.send({ success: true, message: "Đăng nhập thành công!" });
        } else {
            res.send({ success: false, message: "Sai tên đăng nhập hoặc mật khẩu!" });
        }
    } catch (err) {
        console.error(err);
        res.status(500).send({ success: false, message: "Lỗi server!" });
    }
})

// Đọc cookie đăng nhập (để Angular gọi lúc mở trang login)
app.get("/user-login-cookie", cors(), (req, res) => {
    const savedUsername = req.cookies.login_username || "";
    const savedPassword = req.cookies.login_password || "";
    res.send({ username: savedUsername, password: savedPassword });
})

app.get("/fashions", cors(), async (req, res) => {
    const result = await fashionCollection.find({}).toArray();
    res.send(result)
}
)
app.get("/fashions/:id", cors(), async (req, res) => {
    var o_id = new ObjectId(req.params["id"]);
    const result = await fashionCollection.find({ _id: o_id }).toArray();
    res.send(result[0])
}
)
app.post("/fashions", cors(), async (req, res) => {
    //put json Fashion into database
    await fashionCollection.insertOne(req.body)
    //send message to client(send all database to client)
    res.send(req.body)
})

// --- COOKIE APIs ---

// Tạo Cookies
app.get("/create-cookie", cors(), (req, res) => {
    res.cookie("username", "tranduythanh")
    res.cookie("password", "123456")
    account = { "username": "tranduythanh", "password": "123456" }
    res.cookie("account", account)
    // Cookie có thời hạn
    res.cookie("infor_limit1", 'I am limited Cookie - way 1', { expire: 360000 + Date.now() });
    res.cookie("infor_limit2", 'I am limited Cookie - way 2', { maxAge: 360000 });
    res.send("cookies are created")
})

// Đọc Cookies
app.get("/read-cookie", cors(), (req, res) => {
    // cookie lưu ở client nên dùng req
    username = req.cookies.username
    password = req.cookies.password
    account = req.cookies.account
    infor = "username = " + username + "<br/>"
    infor += "password = " + password + "<br/>"
    if (account != null) {
        infor += "account.username = " + account.username + "<br/>"
        infor += "account.password = " + account.password + "<br/>"
    }
    res.send(infor)
})

// Xóa Cookie
app.get("/clear-cookie", cors(), (req, res) => {
    res.clearCookie("account")
    res.send("[account] Cookie is removed")
})

// --- SESSION APIs (Exercise 62) ---

// Demo đếm số lần visit bằng Session
app.get("/contact", cors(), (req, res) => {
    if (req.session.visited != null) {
        req.session.visited++
        res.send("You visited this page " + req.session.visited + " times")
    } else {
        req.session.visited = 1
        res.send("Welcome to this page for the first time!")
    }
})

// ============================================
// --- PRODUCT + CART APIs (Exercise 63) ---
// ============================================

// Lấy toàn bộ sản phẩm
app.get("/products", cors(), async (req, res) => {
    try {
        const result = await productCollection.find({}).toArray();
        res.send(result);
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
})

// Lấy 1 sản phẩm theo ID
app.get("/products/:id", cors(), async (req, res) => {
    try {
        const result = await productCollection.findOne({ _id: new ObjectId(req.params.id) });
        if (!result) return res.status(404).send({ error: "Product not found" });
        res.send(result);
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
})

// Thêm sản phẩm vào giỏ hàng (lưu vào Session)
app.post("/cart/add", cors(), (req, res) => {
    if (!req.session.cart) {
        req.session.cart = [];
    }
    const product = req.body;
    const existingIndex = req.session.cart.findIndex(item => item._id === product._id);
    if (existingIndex >= 0) {
        req.session.cart[existingIndex].qty += 1;
    } else {
        product.qty = 1;
        req.session.cart.push(product);
    }
    res.send({ message: "Added to cart!", cart: req.session.cart });
})

// Xem giỏ hàng
app.get("/cart", cors(), (req, res) => {
    res.send(req.session.cart || []);
})

// Cập nhật số lượng sản phẩm trong giỏ
app.put("/cart/update", cors(), (req, res) => {
    const updatedItems = req.body;
    if (!req.session.cart) return res.send([]);
    updatedItems.forEach(item => {
        const index = req.session.cart.findIndex(c => c._id === item._id);
        if (index >= 0) req.session.cart[index].qty = item.qty;
    });
    req.session.cart = req.session.cart.filter(item => item.qty > 0);
    res.send(req.session.cart);
})

// Xóa sản phẩm khỏi giỏ hàng
app.delete("/cart/remove/:id", cors(), (req, res) => {
    if (!req.session.cart) return res.send([]);
    req.session.cart = req.session.cart.filter(item => item._id !== req.params.id);
    res.send(req.session.cart);
})