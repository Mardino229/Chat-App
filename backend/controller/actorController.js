const Actor = require('../model/Actor');


const getActor = (req, res)=> {
    Actor.find({}, {username:1, _id:1})
        .then(data=> {
            Actor.findOne({_id:req.auth.userId}, {username:1, _id:1})
                .then(actor => {
                    res.status(200).json({data, username: actor.username, id: actor._id});
                })
        })
        .catch(err => res.status(500).json(err));
}

module.exports = {getActor}