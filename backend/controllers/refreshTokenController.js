const User = require('../model/User');
const jwt = require('jsonwebtoken');

const handleRefreshToken = async (req, res) => {
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(401);
    const refreshToken = cookies.jwt;

    const foundUser = await User.findOne({ refreshToken }).exec();
    if (!foundUser) return res.sendStatus(403);
    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err, decoded) => {
            if (err || foundUser.username !== decoded.username) return res.sendStatus(403);
            const roles = Object.values(foundUser.roles);
            const username = decoded.username
            const fname = decoded.fname;
            const lname = decoded.lname;
            const email = decoded.email;
            const vacationLeaves = decoded.vacationLeaves;
            const accessToken = jwt.sign(
                {
                    "UserInfo": {
                        "username": username,
                        "roles":  roles,
                        "fname": fname,
                        "lname": lname,
                        "email": email,
                        "vacationLeaves": vacationLeaves
                    }
                },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '5m' }
            );
            res.json({ roles, username, fname, lname, email, vacationLeaves, accessToken })
        }
    );
}

module.exports = { handleRefreshToken }