const jwt = require('jsonwebtoken');

const verifyJWT = (req, res, next) => {
    const authHeader = req.headers.authorization || req.headers.Authorization;
    if (!authHeader?.startsWith('Bearer ')) return res.sendStatus(401);
    const token = authHeader.split(' ')[1];
    console.log(token)
    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        (err, decoded) => {
            if (err) return res.sendStatus(403);
            req.user = decoded.UserInfo.username;
            req.roles = decoded.UserInfo.roles;
            req.fname = decoded.UserInfo.fname;
            req.lname = decoded.UserInfo.lname;
            req.email = decoded.UserInfo.email;
            req.vacationLeaves = decoded.UserInfo.vacationLeaves;
            next();
        }
    );
}

module.exports = verifyJWT