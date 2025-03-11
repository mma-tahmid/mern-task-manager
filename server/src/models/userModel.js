const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({

    email: { type: String, unique: true, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    mobile: { type: String, required: true },
    password: { type: String, required: true },
    photo: { type: String },
    createdDate: { type: Date, default: Date.now() }
},

    { timestamps: true, versionKey: false }
)

const userModels = mongoose.model("user", userSchema);
module.exports = userModels;