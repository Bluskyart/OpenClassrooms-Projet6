const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        
        if (!token) {
            // Permettre l'accès en lecture seule si aucun token n'est fourni
            req.auth = { userId: 'publicUser' };
            return next();
        }

        const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
        req.auth = { userId: decodedToken.userId };
        next();
    } catch (error) {
        res.status(401).json({ error });
    }
};