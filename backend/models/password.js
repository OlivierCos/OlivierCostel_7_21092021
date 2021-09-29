const passwordValidator = require('password-validator');

// Schéma de mot de passe plus sécure
const passwordSchema = new passwordValidator();

// Contraintes du mot de passe
passwordSchema
.is().min(8)                                    // Longueur minimun : 8
.has().uppercase()                              // Doit avoir au moins une majuscule
.has().lowercase()                              // Doit avoir au moins une minuscule
.has().digits()                                 // Doit avoir au moins un chiffre
.has().not().spaces()                           // Ne doit pas avoir d'espace
.is().not().oneOf(['Password0', 'Pass1234']);   // Blacklist de valeurs à proscrire

module.exports = passwordSchema;