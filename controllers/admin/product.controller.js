const Product = require("../../model/product.model");
const filterStatusHelper = require("../../helpers/filterStatus");
const searchHelper = require("../../helpers/search");
const paginationHelper = require("../../helpers/pagination")

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

    //Pagination
    const countProducts = await Product.countDocuments(find);
    let objectPagination = paginationHelper(
        {
            currentPage: 1,
            limitItem: 4
        }, 
        req.query, 
        countProducts
    );

    const products = await Product.find(find).limit(objectPagination.limitItem).skip(objectPagination.skip);

    res.render("admin/pages/product/index", {
        pageTitle: "Danh sách sản phẩm",
        products: products, 
        filterStatus: filterStatus, 
        keyword: objectSearch.keyword,
        pagination: objectPagination
    });
};

//[Patch] /admin/products/change-status/:status/:id
module.exports.changeStatus = async (req, res) => {
    const status = req.params.status;
    const id = req.params.id;
    const refererUrl = req.headers.referer;
    await Product.updateOne({_id: id}, {status: status});

    res.redirect(refererUrl);
};
