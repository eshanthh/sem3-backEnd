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
            userId: findData._id,
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
    console.log(decoded, 'deccc');
    req.user = decoded;
    next()
}

let roleCheck = (role) => {
    return (req, res, next) => {
        if (req.user.role != role) {
            return res.send("wrong acessss")
        }
        next()
    }
}
app.get('/api', auth, roleCheck("admin"), (req, res) => {
    res.send("apiiii")
})

app.get('/me', auth, async (req, res) => {
    console.log(req.user);
    let uId = req.user.userId;
    let findUser = await User.find()
    console.log(findUser, 'heehe');
    if (!findUser) {
        return res.status(404).json({ msg: "Error" });
    }
    res.json(findUser);
});

app.put('/me', auth, async (req, res) => {
    let { name } = req.body;
    let updateUser = await User.findByIdAndUpdate(
        req.user.userId,
        { name: name },
        { new: true }
    )
    if (!updateUser) {
        return res.status(400).json({ msg: "Error" })
    }
    res.json(updateUser)
})