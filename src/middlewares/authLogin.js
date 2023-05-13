module.exports = async (req, res, next) => {
    if(req.session.login){
        return res.render('home', {user: 'leonardo'})
    }
    return res.redirect('/')
}