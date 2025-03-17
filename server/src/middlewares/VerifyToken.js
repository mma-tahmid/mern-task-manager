var jwt = require('jsonwebtoken');


// Check token is correct or Not

exports.VerifyToken = (req, res, next) => {
    const tokenKey = req.cookies.access_token;

    // token validation check
    if (!tokenKey) {
        return res.status(401).send({ success: false, message: "You need to login" }); // if token is not set in cookies
    }
    //message: 'Unauthorized: No token provided'
    // You are not Authenticated

    // token decoded
    jwt.verify(tokenKey, process.env.JWT_SECRET_KEY, (err, information) => {
        if (err) {
            return res.status(401).send({ success: false, message: "Token is not Valid" }); // if token is wrong
            // message: 'Unauthorized: Token expired'
        }
        req.userInformation = information;  // get decode user _id
        next();
    });
};


// const verifyToken = (req, res, next) => {
//     const token = req.cookies?.token;
  
//     if (!token) {
//       return res.status(401).json({ message: 'Unauthorized: No token provided' });
//     }
  
//     jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
//       if (err) {
//         return res.status(401).json({ message: 'Unauthorized: Token expired' });
//       }
  
//       req.user = decoded; // Attach user info to request
//       next();
//     });
//   };
  