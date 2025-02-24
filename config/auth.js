const jwt = require('jsonwebtoken');

const verifyUser = (req, res, next) => {
    const token = req.cookies?.token;
    if (!token) return res.redirect('/auth/login');

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (!token) return res.redirect('/auth/login');
        req.user = decoded; // Store user info in request
        next();
    });
};

module.exports = verifyUser;