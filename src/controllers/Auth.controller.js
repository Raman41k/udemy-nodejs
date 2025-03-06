const User = require('../models/User.model');

const getLoginPage = (req, res, next) => {
    const url = req.url;

    res.render('auth/login', {
        url,
        documentTitle: 'Login page',
        isAuthenticated: req.session.isLoggedIn,
    });
};

const postLogin = (req, res, next) => {
    User.findById('67c813e581a85165a32bf64e').then(user => {
        req.session.user = user;
        req.session.isLoggedIn = true;
        req.session.save((err, user) => {
            console.log(err);
            res.redirect('/');
        })
    }).catch(err => {
        console.log(err);
    })
}

const postLogout = (req, res, next) => {
    req.session.destroy((err) => {
        console.log(err)
        res.redirect('/');
    });
}

module.exports = {
    getLoginPage,
    postLogin,
    postLogout
}