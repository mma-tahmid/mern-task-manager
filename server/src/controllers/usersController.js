const usersModel = require("../models/userModel")
const bcrypts = require('bcrypt')
var jwt = require('jsonwebtoken')


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

    const { email, password } = req.body;

    if (!email || !password) {
        return res.send({ message: "All fields are required" })
    }

    const validUser = await usersModel.findOne({ email });

    if (!validUser) {
        return res.send(400).send({
            success: false,
            message: "Email is not Registered"
        })
    }

    const isPasswordMatching = await bcrypts.compare(password, validUser.password)

    if (!isPasswordMatching) {
        return res.send(400).send({
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


// Update Profile

exports.UpdateProfile = async (req, res) => {

    //uid means user id
    if (req.userInformation.userTokenId !== req.params.uid) {
        return res.status(401).send({ message: "You can update only your account" }) // middleware authentication
    }

    try {
        const { firstName, lastName, mobile } = req.body

        const updateData = {
            firstName,
            lastName,
            mobile,
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