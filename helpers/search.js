module.exports = (query) => {
    let objectSearch = {
        keyword: "",
    }

    if(query.keyword){
        objectSearch.keyword = query.keyword;
        //tìm kiếm ko fix cứng bằng regex
        const regex = new RegExp(objectSearch.keyword, "i");
        objectSearch.regex = regex;
    }
    
    return objectSearch;
}