const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({

    name: String,

    email: String,

    passWord: String,

    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user"
    },

    resetToken: String,

    resetTokenExpiry: Date

});

const User = mongoose.model("user", userSchema);

module.exports = User;