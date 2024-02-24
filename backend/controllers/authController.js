const User = require('../model/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const day = 24 * 60 * 60 * 1000;    

const handleLogin = async (req, res) => {
    const { user, pwd } = req.body;
    if (!user || !pwd) return res.status(400).json({ 'message': 'Username and password are required.' });

    const foundUser = await User.findOne({ username: user }).exec();
    if (!foundUser) return res.sendStatus(401);
    const match = await bcrypt.compare(pwd, foundUser.password);
    const username = foundUser.username;
    const fname = foundUser.fname;
    const lname = foundUser.lname;
    const email = foundUser.email;
    const vacationLeaves = foundUser.vacationLeaves;
    if (match) {
        const roles = Object.values(foundUser.roles).filter(Boolean);
        const accessToken = jwt.sign(
            {
                "UserInfo": {
                    "username": username,
                    "roles": roles,
                    "fname": fname,
                    "lname": lname,
                    "email": email,
                    "vacationLeaves": vacationLeaves
                }
            },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '15s' }
        );
        const refreshToken = jwt.sign(
            { "username": username },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: '1d' }
        );
        foundUser.refreshToken = refreshToken;
        const result = await foundUser.save();
        console.log(result);
        console.log(roles);

        res.cookie('jwt', refreshToken, { httpOnly: true, secure: true, sameSite: 'None', maxAge: day });

        res.json({ username, fname, lname, email, roles, accessToken, vacationLeaves });

    } else {
        res.sendStatus(401);
    }
}

module.exports = { handleLogin };