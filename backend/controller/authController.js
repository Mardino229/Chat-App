const bcrypt = require('bcrypt');
const Actor = require('../model/Actor');
require('dotenv').config();
const jwt = require('jsonwebtoken');


const signup = (req ,res, next) => {
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            new Actor({
                ...req.body,
                password: hash,
            }).save()
                .then(() => {
                    res.status(201).json({message: 'Actor created successfully.'});
                })
                .catch((err) => {
                    res.json({message: 'Actor created failed', error: err}).status(err.status || 400);
                })
        })
        .catch((err) => {
            res.json({message: 'Error hashing password', error: err}).status(500);
        })
}


const login = (req, res) => {
    Actor.findOne({ email: req.body.email })
        .then(user => {
            if (!user){
                res.status(401).json({error: 'Paire identifiant/mot de passe incorrecte'});
            } else{
                bcrypt.compare(req.body.password, user.password)
                    .then(valid=>{
                        if (!valid){
                            res.status(401).json({error: 'Paire identifiant/mot de passe incorrecte'});
                        } else{
                            const authToken = jwt.sign(
                                {userId: user._id},
                                process.env.JWT_SECRET,
                                {expiresIn: '1h'})
                            res.status(200).json({
                                userId: user._id,
                                token: jwt.sign(
                                    {userId: user._id},
                                    process.env.JWT_SECRET,
                                    {expiresIn: '1h'}
                                )
                            }).cookie("authToken", authToken, {
                                path: "/",
                                maxAge: 24 * 60 * 60 * 1000,
                                httpOnly: true,
                            })
                        }
                    })
                    .catch(error=> {
                        res.status(500).json({error});
                    })
            }
        })
        .catch(error => {
            res.status(500).json({ error });
        })
}

module.exports = {signup, login}