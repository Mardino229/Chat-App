const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useUnifiedTopology: true,
            useNewUrlParser: true
        });
        console.log("Connexion à MongoDB réussie !")
    } catch (err) {
        console.error(err);
        console.log("Connexion à MongoDB échoué !")

    }
}

module.exports = connectDB