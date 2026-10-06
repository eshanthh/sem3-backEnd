const express = require('express')
const router = express.Router()
const User = require('../models/user')
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')
router.get('/',(req,res)=>{
    console.log("signuppp");
    
})

router.post("/signUp", async (req, res) => {
        console.log("SIGNUP ROUTE HIT");
    try {

        console.log("BODY:", req.body);

        let { name, email, passWord, role } = req.body;

        if (!name || !email || !passWord) {
            return res.status(400).json({
                msg: "name, email, and passWord are required"
            });
        }

        if (role && !["user", "admin"].includes(role)) {
            return res.status(400).json({
                msg: "role must be user or admin"
            });
        }

        console.log("PASSWORD:", passWord);

        let findData = await User.findOne({ email });

        if (findData) {
            return res.status(400).send("user already exists");
        }

        let updateddP = await bcrypt.hash(passWord, 10);

        let UserInfo = new User({
            name,
            email,
            passWord: updateddP,
            role: role || "user"
        });

        await UserInfo.save();

        res.send("done.......");

    } catch (error) {
        console.log("SIGNUP ERROR:", error);
        res.status(500).send("Signup error: " + error.message);
    }
});


router.post("/login", async (req, res) => {

    try {

        let { email, passWord } = req.body;

        console.log("LOGIN BODY:", req.body);

        let findData = await User.findOne({ email });

        console.log("USER:", findData);

        if (!findData) {
            return res.status(404).send("user not found");
        }

        let validP = await bcrypt.compare(
            passWord,
            findData.passWord
        );

        console.log("PASSWORD VALID:", validP);

        if (!validP) {
            return res.status(401).send("wrong password");
        }

        let token = jwt.sign(
            {
                userId: findData._id,
                email: findData.email,
                role: findData.role
            },
            "secret"
        );

        console.log("TOKEN:", token);

        res.json({
            msg: "Done",
            token: token
        });

    } catch (error) {

        console.log("LOGIN ERROR:", error);

        res.status(500).send(
            "Login error: " + error.message
        );

    }

});


module.exports=router