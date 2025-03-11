const mongoose = require('mongoose')

const taskSchema = new mongoose.Schema({
    title: { type: String, unique: true, required: true },
    description: { type: String, required: true },
    status: { type: String },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true
    },
    createdDate: { type: Date, default: Date.now }
    //createdDate: { type: Date, default: Date.now() }
},
    {
        timestamps: true,
        versionKey: false,
        toJSON: { virtuals: true },
        toObject: { virtuals: true } // ✅ Corrected virtuals placement
    }
)


// Define a virtual field to format `createdAt`
taskSchema.virtual("formattedDate").get(function () {
    return this.createdDate.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });
});

//Virtual for Formatted Time
taskSchema.virtual("formattedTime").get(function () {
    return this.createdDate.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true // 12-hour format (AM/PM)
    });
});


const taskModels = mongoose.model('task', taskSchema)
module.exports = taskModels