const Product = require("../../model/product.model");
const filterStatusHelper = require("../../helpers/filterStatus");
const searchHelper = require("../../helpers/search");

//[GET] /admin/products
module.exports.product = async (req, res) => {
    //Tạo đối tượng filterStatus
    const filterStatus = filterStatusHelper(req.query);

    let find = {
        deleted: false
    }
    
    if(req.query.status){
        find.status = req.query.status;
    }

    //logic search title 
    const objectSearch = searchHelper(req.query);
    if(objectSearch.regex){
        find.title = objectSearch.regex;
    }

    const products = await Product.find(find);

    res.render("admin/pages/product/index", {
        pageTitle: "Danh sách sản phẩm",
        products: products, 
        filterStatus: filterStatus, 
        keyword: objectSearch.keyword
    });
};
