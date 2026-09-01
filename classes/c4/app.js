const express = require("express");

const app = express();

const User = require("../db/db.js");

const bcrypt = require("bcryptjs");
const mongoose = require('mongoose')
app.use(express.json());
User.db
    .openUri("mongodb://127.0.0.1:27017/db")

    .then(() => {

        console.log("db connected");

        app.listen(3000, () => {

            console.log("server is running on port 3000");

        });

    });
app.post("/signUp", async (req, res) => {

    let { name, email, passWord } = req.body;

    let findData = await User.findOne({ email });

    console.log(findData, "hjehehe");

    if (findData) {

        return res.send("user jinda haii....");

    } else {

        let updateddP = await bcrypt.hash(passWord, 10);

        console.log(updateddP, "dekhoooooo");

        let UserInfo = new User({
            name,
            email,
            passWord: updateddP
        });

        await UserInfo.save();

        res.send("done.......");
    }
});
app.post("/login", async (req, res) => {

    let { email, passWord } = req.body;



    let findData = await User.findOne({ email });

    console.log(findData);
    let validP = await bcrypt.compare(passWord, findData.passWord)
    if (!validP) return res.send("kuch nhiiii")
    res.send("all done....")

});

