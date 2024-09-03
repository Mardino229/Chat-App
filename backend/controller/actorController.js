const Actor = require('../model/Actor');


const getActor = (req, res)=> {
    Actor.find({}, {username:1, _id:1})
        .then(data=> {
            res.status(200).json(data);
        })
        .catch(err => res.status(500).json(err));
}

module.exports = {getActor}