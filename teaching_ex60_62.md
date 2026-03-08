# 📚 Ôn tập Exercise 60 → 62 — Chuẩn bị cho Exercise 63

> Bài 60 → 62 là **nền tảng kiến thức** cho bài tập lớn Exercise 63 (Shopping Cart).  
> Mỗi bài dạy 1 kỹ thuật lưu trữ dữ liệu tạm thời trên web.

---

## 🔗 Mối liên hệ giữa các bài

```mermaid
flowchart LR
    Ex60["📗 Ex 60\nCookie cơ bản\nLưu data ở CLIENT"]
    Ex61["📘 Ex 61\nLogin + Cookie\nỨng dụng thực tế Cookie"]
    Ex62["📙 Ex 62\nSession cơ bản\nLưu data ở SERVER"]
    Ex63["📕 Ex 63\nShopping Cart\nSession nâng cao\n+ MongoDB + Angular"]

    Ex60 --> Ex61
    Ex60 --> Ex62
    Ex61 --> Ex63
    Ex62 --> Ex63

    style Ex63 fill:#ff6b6b,color:#fff,stroke:#333
```

---

## 📗 Exercise 60 — Cookie Programming

### Cookie là gì?
Cookie là **dữ liệu nhỏ được lưu ở trình duyệt (client)**. Server gửi cookie → browser lưu → browser gửi lại cookie mỗi lần request.

### Cài đặt
```bash
npm install --save cookie-parser
```

### Code trong dự án — [Index.js](file:///d:/K234112E/my-server-mongodb/Index.js#L14-L15)

```javascript
var cookieParser = require('cookie-parser');
app.use(cookieParser());  // Middleware để đọc cookie
```

### 3 thao tác chính với Cookie

```mermaid
flowchart LR
    CREATE["✍️ TẠO Cookie\nres.cookie('key', 'value')"] 
    READ["📖 ĐỌC Cookie\nreq.cookies.key"]
    DELETE["🗑️ XÓA Cookie\nres.clearCookie('key')"]
    
    CREATE -->|"Lưu vào browser"| READ
    READ -->|"Hết hạn hoặc xóa"| DELETE
```

| API | Method | Code quan trọng | Giải thích |
|-----|--------|----------------|------------|
| `/create-cookie` | GET | `res.cookie("username", "tranduythanh")` | Server gửi cookie cho browser lưu |
| `/read-cookie` | GET | `req.cookies.username` | Server đọc cookie từ request browser gửi lên |
| `/clear-cookie` | GET | `res.clearCookie("account")` | Server bảo browser xóa cookie |

### Cookie có thời hạn
```javascript
// Cách 1: expire — mốc thời gian hết hạn
res.cookie("infor_limit1", 'value', { expire: 360000 + Date.now() });

// Cách 2: maxAge — sống bao lâu (ms)
res.cookie("infor_limit2", 'value', { maxAge: 360000 });  // 6 phút

// Cookie không thời hạn → mất khi đóng browser
res.cookie("username", "tranduythanh")
```

### 💡 Điểm cần nhớ cho thi
- Cookie lưu **ở client** → dùng `res` để gửi, `req` để đọc
- Cookie có thể lưu **string** hoặc **object** (`res.cookie("account", {username, password})`)
- Tắt server → cookie **vẫn còn** (vì nằm ở browser)
- Đóng browser → cookie **không thời hạn** sẽ mất

---

## 📘 Exercise 61 — Login + Cookie (Ứng dụng thực tế)

### Bài toán
Khi user đăng nhập thành công → **lưu username/password vào cookie** → lần sau mở trang login → **tự điền sẵn** (Remember Me).

### Luồng hoạt động

```mermaid
sequenceDiagram
    participant Browser as 🌐 Browser (Angular)
    participant Server as ⚙️ Server (Express)
    participant DB as 🗄️ MongoDB (USER)

    Note over Browser: Mở trang Login
    Browser->>Server: GET /user-login-cookie
    Server-->>Browser: { username, password } từ cookie (nếu có)
    Note over Browser: Tự điền vào ô input

    Note over Browser: User nhấn Đăng nhập
    Browser->>Server: POST /user-login { username, password }
    Server->>DB: findOne({ username })
    DB-->>Server: user document
    Server->>Server: bcrypt.compare(password, user.password)
    
    alt Đúng mật khẩu
        Server-->>Browser: { success: true } + Set-Cookie header
        Note over Browser: Cookie được lưu tự động
    else Sai mật khẩu
        Server-->>Browser: { success: false }
    end
```

### Code quan trọng — [Index.js](file:///d:/K234112E/my-server-mongodb/Index.js#L34-L62)

```javascript
// ĐĂNG NHẬP — kiểm tra password bằng bcrypt, lưu cookie nếu đúng
app.post("/user-login", cors(), async (req, res) => {
    const { username, password } = req.body;
    const user = await userCollection.findOne({ username });
    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
        // ⭐ Lưu cookie 7 ngày
        res.cookie("login_username", username, { maxAge: 7*24*60*60*1000 });
        res.cookie("login_password", password, { maxAge: 7*24*60*60*1000 });
        res.send({ success: true });
    }
})

// ĐỌC COOKIE — Angular gọi khi mở trang login
app.get("/user-login-cookie", cors(), (req, res) => {
    res.send({
        username: req.cookies.login_username || "",
        password: req.cookies.login_password || ""
    });
})
```

### 💡 Điểm cần nhớ
- Dùng **bcrypt** để hash password (không lưu plain text trong DB)
- `bcrypt.compare(plainText, hashedText)` → trả về `true/false`
- Cookie maxAge `7*24*60*60*1000` ms = **7 ngày**

---

## 📙 Exercise 62 — Session Programming

### Session là gì?
Session là **dữ liệu được lưu trên server** (RAM). Mỗi browser được cấp 1 session ID (qua cookie) để server nhận diện.

### So sánh Cookie vs Session

```mermaid
flowchart TB
    subgraph COOKIE["📦 COOKIE"]
        C1["Lưu ở: Browser ✈️"]
        C2["Truy cập: res.cookie / req.cookies"]
        C3["Tắt server: Vẫn còn ✅"]
        C4["Đóng browser: Mất (nếu ko có maxAge)"]
        C5["Bảo mật: Kém ⚠️ (user có thể sửa)"]
        C6["Dung lượng: ~4KB"]
    end
    
    subgraph SESSION["🔐 SESSION"]
        S1["Lưu ở: Server RAM 🖥️"]
        S2["Truy cập: req.session.key"]
        S3["Tắt server: MẤT ❌"]
        S4["Đóng browser: MẤT ❌"]
        S5["Bảo mật: Tốt ✅ (user ko sửa được)"]
        S6["Dung lượng: Không giới hạn"]
    end
```

| Tiêu chí | Cookie | Session |
|----------|--------|---------|
| **Lưu ở đâu** | Browser (client) | Server (RAM) |
| **Truy cập** | `req.cookies` / `res.cookie()` | `req.session` |
| **Tắt server** | Vẫn còn ✅ | **MẤT** ❌ |
| **Đóng browser** | Tuỳ maxAge | **MẤT** ❌ |
| **Bảo mật** | Kém (user sửa được) | Tốt (server giữ) |
| **Kích thước** | ~4KB/cookie | Không giới hạn |
| **Dùng cho** | Remember me, preferences | Giỏ hàng, phiên đăng nhập |

### Cài đặt
```bash
npm install --save express-session
```

### Code — [Index.js](file:///d:/K234112E/my-server-mongodb/Index.js#L17-L19)

```javascript
var session = require('express-session');
app.use(session({ secret: "Shh, its a secret!" }));
// secret = chuỗi bí mật dùng để mã hóa session ID
```

### API đếm lượt truy cập — [Index.js](file:///d:/K234112E/my-server-mongodb/Index.js#L120-L128)

```javascript
app.get("/contact", cors(), (req, res) => {
    if (req.session.visited != null) {
        req.session.visited++    // ⭐ Tăng biến session
        res.send("You visited this page " + req.session.visited + " times")
    } else {
        req.session.visited = 1  // ⭐ Lần đầu = khởi tạo
        res.send("Welcome to this page for the first time!")
    }
})
```

### 💡 Điểm cần nhớ
- `req.session` là **object**, lưu bất kỳ data gì: string, number, array, object
- Mỗi browser có **session riêng** (Chrome vs Firefox = 2 session khác nhau)
- Session **mất** khi: restart server, đóng browser, hoặc hết timeout
- `secret` dùng để **ký** (sign) session ID cookie → chống giả mạo

---

## 🎯 Tổng kết — Chuẩn bị cho Exercise 63

Exercise 63 sẽ kết hợp **TẤT CẢ** kiến thức trên:

```mermaid
flowchart TB
    subgraph EX63["📕 Exercise 63: Shopping Cart"]
        direction TB
        MONGO["🗄️ MongoDB\nCollection: Product\n(từ Ex 58)"]
        SESSION["🔐 Session\nreq.session.cart = []\n(từ Ex 62)"]
        API["⚙️ Express APIs\nGET /products\nPOST /cart/add\nGET /cart\nPUT /cart/update\nDELETE /cart/remove\n(từ Ex 60)"]
        ANGULAR["🌐 Angular\nProduct List page\nCart page\n(từ Ex 58)"]
        
        MONGO --> API
        SESSION --> API
        API --> ANGULAR
    end

    EX60["Ex 60: Cookie\n→ Hiểu cơ chế\nlưu trữ tạm"] --> EX63
    EX61["Ex 61: Login\n→ Hiểu luồng\nrequest/response"] --> EX63
    EX62["Ex 62: Session\n→ req.session\nlưu data server"] --> EX63

    style EX63 fill:#ff6b6b,color:#fff
```

### Trong Exercise 63, Session dùng để:
1. **`req.session.cart = []`** — Mảng sản phẩm khách đã chọn
2. Khi click "Add to cart" → **push product vào `req.session.cart`**
3. Khi xem giỏ hàng → **đọc `req.session.cart`**
4. Khi update số lượng / xóa → **sửa `req.session.cart`**
5. Chỉ khi **thanh toán** thành công → mới lưu vào **MongoDB**
6. Tắt server → giỏ hàng **MẤT** (đúng ý đề bài!)
