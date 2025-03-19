
const mongoose = require("mongoose");

const taskModels = require("../models/taskModel")


// Create Task

exports.CreateTask = async (req, res) => {

    try {
        const { title, description, status } = req.body

        if (!title || !description) {
            return res.send({ message: "All fields are Required" })
        }

        const existingTitle = await taskModels.findOne({ title })

        if (existingTitle) {
            return res.status(400).send({
                success: false,
                message: "Already Used Same Title.",
            })
        }

        const createNewTask = await new taskModels({
            title,
            description,
            status,
            createdBy: req.userInformation.userTokenId
        }).save()

        res.status(200).send({
            success: true,
            message: "New Task Successfully",
            output: createNewTask
        })



    }

    catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error in Creating New Task",
            error
        })
    }
}



// Update Task Status
// Dont need req body only use parameter 
// get method

exports.UpdatetaskStatus = async (req, res) => {

    try {

        let taskId = req.params.tid
        let statuss = req.params.taskStatus

        // Start:// this part needed: only the creator of the task can update it 
        // Find the task to check its owner
        let task = await taskModels.findById(taskId);

        if (!task) {
            return res.status(404).send({
                success: false,
                message: "Task not found"
            });
        }


        // Ensure that only the creator of the task can update it
        if (task.createdBy.toString() !== req.userInformation.userTokenId) {
            return res.status(403).send({
                success: false,
                message: "You are not authorized to update this task"
            });
        }

        // End:// this part needed: only the creator of the task can update it 

        let updateData = {
            status: statuss
        }

        let updatedTask = await taskModels.findByIdAndUpdate(taskId, { $set: updateData }, { new: true });

        // let updatedTask = await taskModels.findByIdAndUpdate(taskId, { $set: { status: statuss } }, { new: true });

        //let updatedTask = await taskModels.findByIdAndUpdate(taskId, { status: statuss }, { new: true });

        if (!updatedTask) {
            return res.status(404).send(
                {
                    success: false,
                    message: "Task not found"
                });
        }

        res.status(200).send({
            success: true,
            message: "Status Updated successfully",
            output: updatedTask
        });
    }

    catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error in Updating Status",
            error
        })
    }

}




// Delete task

exports.DeleteTask = async (req, res) => {

    try {

        let deleteTask = await taskModels.findByIdAndDelete(req.params.tid)

        res.status(200).send({
            success: true,
            message: "Task has been Deleted"
        })
    }

    catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error in Deleting Task",
            error
        })
    }

}


exports.ListTaskByStatus = async (req, res) => {
    try {

        let taskStatus = req.params.statuss;

        const userStringId = req.userInformation.userTokenId
        let userObjectId = new mongoose.Types.ObjectId(userStringId);  // convert String to object Id (because this id is store in database as a objectId)

        // if (!userId) {
        //     return res.status(400).send({
        //         success: false,
        //         message: "User not authenticated. No user ID found in cookies."
        //     });
        // }


        findData = {
            status: taskStatus, //Filter tasks by status // status comes from Database 
            createdBy: userObjectId // Filter tasks for the current user
        }

        let taskListkByStatus = await taskModels.find(findData); //.lean()


        res.status(200).send({
            success: true,
            output: taskListkByStatus
        })

    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error in getting Task list by Status",
            error
        });
    }
};



exports.CountTotalNumberByTaskStatus = async (req, res) => {
    try {

        const userStringId = req.userInformation.userTokenId  // logged in user

        let userObjectId = new mongoose.Types.ObjectId(userStringId);

        //console.log(objectId)

        let statusCount = await taskModels.aggregate([
            { $match: { createdBy: userObjectId } },
            { $group: { _id: "$status", total: { $sum: 1 } } }
        ]);


        res.status(200).send({
            success: true,
            output: statusCount
        })

    } catch (error) {

        res.status(500).send({
            success: false,
            message: "Error in Counting total Task by Status",
            error
        });
    }
}


// Find and update the task only if the requesting user is the creator
//  let updatedTask = await taskModels.findOneAndUpdate(
//     { _id: taskId, createdBy: req.userInformation.individualUserTokenId }, // Filter
//     { $set: { status: statuss } }, // Update
//     { new: true } // Return the updated document
// );