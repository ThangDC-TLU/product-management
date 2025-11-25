const Product = require("../../model/product.model");
const filterStatusHelper = require("../../helpers/filterStatus");
const searchHelper = require("../../helpers/search");
const paginationHelper = require("../../helpers/pagination")
const systemConfig = require("../../config/system")

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

    const products = await Product.find(find).sort({position: "desc"}).limit(objectPagination.limitItem).skip(objectPagination.skip);

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
    req.flash("success", "Cập nhập trạng thái thành công");
    res.redirect(refererUrl);
};

//[Patch] /admin/products/change-multi
module.exports.changeMulti = async (req, res) => {
    const refererUrl = req.headers.referer;
    const type = req.body.type;
    const ids = req.body.ids.split(", ");

    switch(type){
        case "active":
            await Product.updateMany({_id: { $in: ids }}, {status: "active"});
            req.flash("success", `Cập nhập trạng thái hoạt động ${ids.length} sản phẩm`);
            break;
        case "inactive":
            await Product.updateMany({_id: { $in: ids }}, {status: "inactive"});
            req.flash("success", `Cập nhập trạng thái dừng hoạt động ${ids.length} sản phẩm`);
            break;
        case "delete-all":
            await Product.updateMany({_id: { $in: ids }}, {
                deleted: true,
                deleteAt: new Date()
            })
            req.flash("success", `Xóa thành công ${ids.length} sản phẩm`);
            break;
        case "change-position":
            console.log(ids);
            for(const element of ids){
                let [id, position] = element.split("-");
                position = parseInt(position);
                console.log(id);
                console.log(position);
                await Product.updateMany({_id: id}, {position: position});
            }
            req.flash("success", `Thay đổi vị trí thành công ${ids.length} sản phẩm`);
            break;
        default:
            break;
    }


    res.redirect(refererUrl);
};

//[Delete] /admin/products/delete/:id
module.exports.deleteProduct = async (req, res) => {
    const refererUrl = req.headers.referer;
    const id = req.params.id;
    await Product.deleteOne({ _id: id });
    res.redirect(refererUrl);
}

//[Get] /admin/products/create
module.exports.create = async (req, res) => {
    res.render("admin/pages/product/create", {
        pageTitle: "Thêm mới sản phẩm"
    });
} 

//[Post] /admin/products/create
module.exports.createProduct = async (req, res) => {
    req.body.price = parseInt(req.body.price);
    req.body.discountPercentage = parseInt(req.body.discountPercentage);
    req.body.stock = parseInt(req.body.stock);

    if(req.body.position == ""){
        const countProducts = await Product.countDocuments();
        req.body.position = countProducts + 1;
    } else{
        req.body.position = parseInt(req.body.position);
    }
    if(req.file){
        req.body.thumbnail = `/uploads/${req.file.filename}`;
    }
    const product = new Product(req.body);
    await product.save()
    res.redirect(`${systemConfig.prefixAdmin}/products`)
}

//[Get] /admin/products/edit/:id
module.exports.edit = async (req, res) => {
    try {
        const productCurrent = await Product.findOne({_id: req.params.id});
        res.render("admin/pages/product/edit", {
            pageTitle: "Chỉnh sửa sản phẩm", 
            product: productCurrent
        });
    } catch (error) {
        res.redirect(`${systemConfig.prefixAdmin}/products`)
    }
}

//[Patch] /admin/products/edit/:id
module.exports.editProduct = async (req, res) => {
    const refererUrl = req.headers.referer;
    const id = req.params.id;
    req.body.price = parseInt(req.body.price);
    req.body.discountPercentage = parseInt(req.body.discountPercentage);
    req.body.stock = parseInt(req.body.stock);
    req.body.position = parseInt(req.body.position);
    if(req.file){
        req.body.thumbnail = `/uploads/${req.file.filename}`;
    }
    try {
        await Product.updateOne({_id: id}, req.body);
        req.flash("success", "Cập nhập sản phẩm thành công");
    } catch (error) {
        req.flash("error", "Cập nhập sản phẩm thất bại");
    }

    res.redirect(refererUrl);
}