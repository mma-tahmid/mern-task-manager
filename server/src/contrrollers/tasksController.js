const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({

    email: { type: String, unique: true },
    firstName: { type: String },
    lastName: { type: String },
    mobile: { type: String },
    Password: { type: String, required: true },
    photo: { type: String },
    createdDate: { type: Date, default: Date.now() }
},

    { timestamps: true, versionKey: false }
)

const userModels = mongoose.model("user", userSchema);
module.exports = userModels;