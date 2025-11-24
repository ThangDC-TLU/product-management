module.exports.createProduct = async (req, res, next) => {
    const refererUrl = req.headers.referer;
    if(!req.body.title){
        req.flash("error", "Vui lòng nhập tiêu đề");
        res.redirect(refererUrl);
        return;
    };
    next();
}