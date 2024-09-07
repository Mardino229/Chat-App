const bcrypt = require('bcrypt');
const Actor = require('../model/Actor');
require('dotenv').config();
const jwt = require('jsonwebtoken');


const signup = (req ,res) => {
    console.log(req.body)
    Actor.findOne({email:req.body.email})
        .then((doc)=>{
        if (doc) {
            res.status(409).json({message: "Email already exists"});
        }
        else {
            Actor.findOne({email: req.body.username})
                .then((actor) => {
                    if (actor) {
                        res.status(409).json({message: "Username already exists"});
                    }
                    else{
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
                })
        }
        })}

const login = (req, res) => {
    console.log(req.body)
    Actor.findOne({ username: req.body.username})
        .then(user => {
            if (!user){
                res.status(401).json({message: 'Username and password don"t match'});
            } else{
                bcrypt.compare(req.body.password, user.password)
                    .then(valid=>{
                        if (!valid){
                            res.status(401).json({message: 'Paire identifiant/mot de passe incorrecte'});
                        } else{
                            const authToken = jwt.sign(
                                {userId: user._id},
                                process.env.JWT_SECRET,
                                {expiresIn: '1h'})
                            const refreshToken = jwt.sign(
                                { email: user.email },
                                process.env.REFRESH_TOKEN_SECRET,
                                { expiresIn: '1d' }
                            );
                            user.refreshToken = refreshToken;
                            console.log(user.refreshToken)
                            console.log(user)
                            user.save().then(()=>{
                                res.cookie("refreshToken", refreshToken, {
                                    secure: true,
                                    sameSite: 'None',
                                    maxAge: 24 * 60 * 60 * 1000,
                                    httpOnly: true,
                                })
                                res.status(200).json({
                                    userId: user._id,
                                    username: user.username,
                                    accessToken: authToken
                                })
                               }
                            ).catch(err=>{
                                res.status(500).json({message:err});
                            })
                        }
                    })
                    .catch(error=> {
                        res.status(500).json({message:error});
                    })
            }
        })
        .catch(error => {
            res.status(500).json({message: error });
        })
}

const logout = (req, res)=> {

    const cookies = req.cookies
    if (!cookies?.refreshToken) return res.sendStatus(204); //No content
    const refreshToken = cookies.refreshToken;

    Actor.findOne({ refreshToken})
        .then(actor =>{
            actor.refreshToken = '';
            actor.save().then(() => {
                res.clearCookie('refreshToken', { httpOnly: true, sameSite: 'None', secure: true });
                res.sendStatus(204);
            }).catch(err => {
                res.status(500).json({message:err});
            })
        }).catch(err => {
        res.clearCookie('refreshToken', {httpOnly: true, sameSite: 'None', secure: true});
        return res.sendStatus(204);
    });

}

module.exports = {signup, login, logout}