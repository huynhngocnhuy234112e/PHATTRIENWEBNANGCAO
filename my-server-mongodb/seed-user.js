// Script tạo user với mật khẩu đã mã hóa vào MongoDB
// Chạy: node seed-user.js
const { MongoClient } = require('mongodb');
const bcrypt = require('bcrypt');

async function seedUser() {
    const client = new MongoClient("mongodb://127.0.0.1:27017");
    await client.connect();

    const db = client.db("FashionData");
    const userCollection = db.collection("User");

    // Xóa user cũ nếu có (để tránh trùng khi chạy lại)
    await userCollection.deleteMany({});

    // Danh sách user cần tạo (plaintext password)
    const users = [
        { username: "admin", password: "123456" },
        { username: "user1", password: "abc123" },
    ];

    for (const user of users) {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        await userCollection.insertOne({
            username: user.username,
            password: hashedPassword  // Chỉ lưu mật khẩu đã mã hóa, không lưu bản thật
        });
        console.log(`✅ Đã tạo user: ${user.username} | password gốc: ${user.password} | hash: ${hashedPassword}`);
    }

    console.log("\n🎉 Seed user xong! Mật khẩu gốc KHÔNG được lưu trong database.");
    await client.close();
}

seedUser().catch(console.error);
