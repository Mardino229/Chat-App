const Actor = require('../model/Actor');
const jwt = require('jsonwebtoken');

const handleRefreshToken = async (req, res) => {
    console.log(req.cookies.refreshToken);
    const cookies = req.cookies;
    if (!cookies?.refreshToken) return res.sendStatus(401);
    const refreshToken = cookies.refreshToken;

    const foundUser = await Actor.findOne({ refreshToken: refreshToken }).exec();
    console.log(foundUser)
    if (!foundUser) return res.sendStatus(403); //Forbidden 
    console.log(foundUser)
    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err, decoded) => {
            if (err || foundUser.email !== decoded.email) return res.sendStatus(403);
            const accessToken = jwt.sign(
                {userId: foundUser._id},
                process.env.JWT_SECRET,
                {expiresIn: '1h'});
            res.json({accessToken})
        }
    );
}

module.exports = { handleRefreshToken }