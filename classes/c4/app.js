const express = require("express");
const app = express();
const User = require("../db/db.js");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
app.use(cors());
app.use(express.json());
User.db
    .openUri("mongodb://127.0.0.1:27017/db")
    .then(() => {
        console.log("db connected");
        app.listen(3000, () => {
            console.log("server is running on port 3000");
        });
    })
    .catch((err) => {
        console.log("DB connection error:", err);
    });
app.post("/signUp", async (req, res) => {
    let { name, email, passWord, role } = req.body;
    let findData = await User.findOne({ email });
    console.log(findData, "hjehehe");
    if (findData) {
        return res.send("user jinda haii....");
    }
    let updateddP = await bcrypt.hash(passWord, 10);
    console.log(updateddP, "dekhoooooo");
    let UserInfo = new User({
        name,
        email,
        passWord: updateddP,
        role: role || "user"
    });
    await UserInfo.save();
    res.send("done.......");
});
app.post("/login", async (req, res) => {
    let { email, passWord } = req.body;
    let findData = await User.findOne({ email });
    console.log(findData);
    if (!findData) {
        return res.send("user not found");
    }
    let validP = await bcrypt.compare(
        passWord,
        findData.passWord
    );
    if (!validP) {
        return res.send("kuch nhiiii");
    }
    let token = jwt.sign(
        {
            email: findData.email,
            role: findData.role
        },
        "secret"
    );
    console.log(token);
    res.json({ msg: "Done", token: token });
});
let auth = (req, res, next) => {
    let token = req.headers.authorization
    if (!token) return res.send("who are youu")
    let decoded = jwt.verify(token, "secret")
    req.user = decoded;
    next()
}
app.get('/api', auth, (req, res) => {
    res.send("apiiii")
})