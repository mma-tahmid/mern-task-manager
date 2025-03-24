const usersModel = require("../models/userModel")
const bcrypts = require('bcrypt')
var jwt = require('jsonwebtoken');
const cloudinary = require("../utility/cloudinary");
const getDataUri = require("../utility/dataUri");


// Registration
exports.Registration = async (req, res) => {

    try {
        const { email, firstName, lastName, mobile, password } = req.body;

        if (!email || !firstName || !lastName || !mobile || !password) {
            return res.send({ message: "All fields are required" })
        }

        //1st Step: Check existing users

        const existingUser = await usersModel.findOne({ email });

        if (existingUser) {
            return res.status(400).send({
                success: false,
                message: "You are already registered. Please Login"
            })
        }

        // Step 2: Create Hashed Password
        const salt = bcrypts.genSaltSync(10);
        const hashed = bcrypts.hashSync(password, salt)

        // Step3: Create New User


        const createNewUser = await new usersModel({
            email,
            firstName,
            lastName,
            mobile,
            password: hashed
        }).save()

        res.status(200).send({
            success: true,
            message: "user Register Successfully",
            output: createNewUser
        })
    }

    catch (error) {
        //console.log(error)
        res.status(500).send({
            success: false,
            message: "Error in Registration",
            error
        })
    }

}

// Login

exports.Login = async (req, res) => {

    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.send({ message: "All fields are required" })
        }

        const validUser = await usersModel.findOne({ email });

        if (!validUser) {
            return res.status(400).send({
                success: false,
                message: "Email is not Registered"
            })
        }

        const isPasswordMatching = await bcrypts.compare(password, validUser.password)

        if (!isPasswordMatching) {
            return res.status(400).send({
                success: false,
                message: "Wrong Credentials"
            })
        }


        // Step 3: Create Token
        // Create Token using sign() method

        const createToken = jwt.sign(
            { userTokenId: validUser._id },
            process.env.JWT_SECRET_KEY,
            { expiresIn: '1d' }
        )

        const { password: excludedPassword, ...otherDetails } = validUser.toObject();

        res.cookie(
            "access_token", // token name
            createToken,
            {
                expires: new Date(Date.now() + 3600000), // 1hour
                // expires: new Date(Date.now() + 3 * 3600000), // 3 hours
                // expires: new Date(Date.now() + 24 * 3600000), // one day
                httpOnly: true,
                sameSite: 'strict'
            }
        ).status(200).send({
            success: true,
            message: "Login Successfully",
            output: otherDetails,
            tokens: createToken
        })
    }

    catch (error) {
        //console.log(error)
        res.status(500).send({
            success: false,
            message: "Error in Login",
            error
        })
    }

}




// Update Profile

exports.UpdateProfile = async (req, res) => {

    //uid means user id
    if (req.userInformation.userTokenId !== req.params.uid) {
        return res.status(401).send({ message: "You can update only your account" }) // middleware authentication
    }

    try {
        const { firstName, lastName, mobile } = req.body

        let imagefile = req.file

        let imageUrl
        //let resumeName

        if (imagefile) {

            if (imagefile.size > 5 * 1024 * 1024) {
                return res.status(400).send({ message: "File size exceeds 5MB limit" });
            }

            const fileUri = getDataUri(imagefile);
            const cloudResponse = await cloudinary.uploader.upload(fileUri.content, {
                folder: "mern_task_manager",
                public_id: publicId, // Use the same public_id to replace the image
                overwrite: true, // Ensure the old image is replaced
            });

            imageUrl = cloudResponse.secure_url;
            //console.log(resumeUrl)
            // resumeName = file.originalname;
            //console.log(resumeName)
        }


        const updateData = {
            firstName,
            lastName,
            mobile,
            photo: imageUrl
        };

        const updatedUser = await usersModel.findByIdAndUpdate(req.params.uid, { $set: updateData }, { new: true });



        //const { password, ...rest } = updateUser.toObject();
        const { password, ...rest } = updatedUser.toObject();

        res.status(200).send({
            success: true,
            message: "User updated Successfully",
            output: rest
        })



    }

    catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error in Update user",
            error
        })
    }

}

// Logout

exports.LogOut = async (req, res) => {

    try {
        return res.status(200).cookie(
            "access_token",
            "",
            { maxAge: 0 }

        ).send({
            success: true,
            message: "Log Out Successfully "
        })

    }

    catch (error) {
        console.log(error)
        res.status(200).send({
            success: false,
            message: "Error in LogOut",
            error
        })
    }

}