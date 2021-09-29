const passwordSchema = require('../models/password');


// vérifie que le mot de passe valide le schema décrit
module.exports = (req, res, next) => {
    if (!passwordSchema.validate(req.body.password)) {
        res.send("Mot de passe requis : 8 caractères minimun. Au moins 1 Majuscule, 1 minuscule et 1 chiffre. Sans espace");
    } else {
        next();
    }
};