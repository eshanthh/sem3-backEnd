
const express = require("express");

const app = express();

const User = require("../db/db.js");

const cors = require("cors");

const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");

const { sendEmail } = require("./utils/sendMail.js");

const crypto = require("crypto");


app.use(cors());

app.use(express.json());



// DATABASE

app.listen(3000, () => {
    console.log("server is running on port 3000");
});

User.db
    .openUri("mongodb://127.0.0.1:27017/db")
    .then(() => {
        console.log("db connected");
    })
    .catch((err) => {
        console.log("DB connection error:", err);
    });


// SIGNUP

app.post("/signUp", async (req, res) => {
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


// LOGIN

app.post("/login", async (req, res) => {

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


// AUTH

let auth = (req, res, next) => {

    try {

        let token = req.headers.authorization;

        if (!token) {
            return res.status(401).send("who are youu");
        }

        let decoded = jwt.verify(token, "secret");

        console.log(decoded, "deccc");

        req.user = decoded;

        next();

    } catch (error) {

        console.log("AUTH ERROR:", error);

        return res.status(401).send(
            "Invalid or expired token"
        );

    }

};


// ROLE CHECK

let roleCheck = (role) => {

    return (req, res, next) => {

        if (req.user.role != role) {
            return res.status(403).send("wrong access");
        }

        next();

    };

};


// ADMIN API

app.get(
    "/api",
    auth,
    roleCheck("admin"),
    (req, res) => {

        res.send("apiiii");

    }
);


// GET MY PROFILE

app.get("/me", auth, async (req, res) => {

    try {

        let uId = req.user.userId;

        let findUser = await User
            .findById(uId)
            .select("-passWord");

        if (!findUser) {

            return res.status(404).json({
                msg: "User not found"
            });

        }

        res.json(findUser);

    } catch (error) {

        console.log("ME ERROR:", error);

        res.status(500).json({
            msg: "Error",
            error: error.message
        });

    }

});


// UPDATE MY NAME

app.put("/me", auth, async (req, res) => {

    try {

        let { name } = req.body;

        let updateUser = await User.findByIdAndUpdate(
            req.user.userId,
            {
                name: name
            },
            {
                new: true
            }
        ).select("-passWord");

        if (!updateUser) {

            return res.status(404).json({
                msg: "User not found"
            });

        }

        res.json(updateUser);

    } catch (error) {

        console.log("UPDATE ERROR:", error);

        res.status(500).json({
            msg: "Error",
            error: error.message
        });

    }

});


// FORGOT PASSWORD

app.post("/forgot-password", async (req, res) => {

    try {

        const { email } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).send("User not found");
        }

        const resetToken = crypto
            .randomBytes(20)
            .toString("hex");

        user.resetToken = resetToken;

        user.resetTokenExpiry =
            Date.now() + 3600000;

        await user.save();

        const resetUrl =
            `http://localhost:5173/reset?token=${encodeURIComponent(resetToken)}`;

        console.log("RESET URL:", resetUrl);

        await sendEmail(
            user.email,
            "Password Reset Request",
            `Click the link below to reset your password:\n\n${resetUrl}`
        );

        res.status(200).send(
            "Password reset email sent"
        );

    } catch (error) {

        console.log(
            "FORGOT PASSWORD ERROR:",
            error
        );

        res.status(500).send(
            "Error sending password reset email: " +
            error.message
        );

    }

});


// RESET PASSWORD

app.post("/api/reset-password/:token", async (req, res) => {

    try {

        const { token } = req.params;

        const { passWord } = req.body;

        if (!passWord) {

            return res.status(400).send(
                "Password is required"
            );

        }

        const user = await User.findOne({

            resetToken: token,

            resetTokenExpiry: {
                $gt: Date.now()
            }

        });

        if (!user) {

            return res.status(400).send(
                "Invalid or expired token"
            );

        }

        const updatedPassword =
            await bcrypt.hash(passWord, 10);

        user.passWord = updatedPassword;

        user.resetToken = undefined;

        user.resetTokenExpiry = undefined;

        await user.save();

        res.send(
            "Password reset successful"
        );

    } catch (error) {

        console.log(
            "RESET PASSWORD ERROR:",
            error
        );

        res.status(500).send(
            "Error resetting password: " +
            error.message
        );

    }

});

app.get('/error',(req,res)=>{
    try{
    let user=null
    console.log(user.name);
    console.log("hello")
    res.send("yoooo")
    }

    catch(err){
        res.send('errroror');
        
    }
})