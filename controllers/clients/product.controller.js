const Product = require("../../model/product.model")
module.exports.index = async (req, res) => {
    const products = await Product.find({
        status: "active",
        deleted: false
    }).sort({position: "desc"});
    
    const newProducts = products.map((item) => {
        item.priceNew = (item.price * (100 - item.discountPercentage)/100).toFixed(0);
        return item;
    })
    res.render("client/pages/products/index", {
        pageTitle: "Danh sách sản phẩm",
        products: newProducts
        
    });
};

module.exports.detail = async (req, res) => {
    try {
        const find = {
            deleted: false,
            slug: req.params.slug,
            status: "active"
        }
        const productCurrent = await Product.findOne(find);
        console.log(productCurrent)
        res.render("client/pages/products/detail", {
            pageTitle: productCurrent.title, 
            product: productCurrent
        });
    } catch (error) {
        res.redirect(`/products`)
    }
}