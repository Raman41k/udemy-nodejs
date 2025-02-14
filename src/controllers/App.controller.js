const getHomePage = (req, res, next) => {
    res.send('Home page');
};

const getUsersPage = (req, res, next) => {
    res.send('Users page')
};

module.exports = {
    getHomePage,
    getUsersPage
}