var jwt = require('jsonwebtoken');


// Check token is correct or Not

exports.VerifyToken = (req, res, next) => {
    const tokenKey = req.cookies.access_token;

    // token validation check
    if (!tokenKey) {
        return res.status(401).send({ success: false, message: "You need to login" }); // if token is not set in cookies
    }
    // You are not Authenticated

    // token decoded
    jwt.verify(tokenKey, process.env.JWT_SECRET_KEY, (err, information) => {
        if (err) {
            return res.status(401).send({ success: false, message: "Token is not Valid" }); // if token is wrong
        }
        req.userInformation = information;  // get decode user _id
        next();
    });
};