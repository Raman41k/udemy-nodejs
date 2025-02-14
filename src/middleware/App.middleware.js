const homePageMiddleware = (req,res,next) => {
    console.log('homePageMiddleware 1');
    res.send('<p>Homepage middleware</p>')
}

const usersPageMiddleware = (req,res,next) => {
    console.log('usersMiddleware 1');
    res.send('<p>Users middleware</p>')
}

module.exports = {
    homePageMiddleware,
    usersPageMiddleware
};