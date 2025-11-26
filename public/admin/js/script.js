// Button Status
const buttonsStatus = document.querySelectorAll("[button-status]");
console.log(buttonsStatus);
if(buttonsStatus.length > 0){
    let url = new URL(window.location.href);
    buttonsStatus.forEach((button) => {
        button.addEventListener("click", () => {
            const status = button.getAttribute("button-status");
            console.log(status);

            if(status){
                url.searchParams.set("status", status);
            } else{
                url.searchParams.delete("status");
            }

            window.location.href = url.href;
        })
    })
}

//Search
const formSearch = document.querySelector("#form-search");
if(formSearch){
    let url = new URL(window.location.href);
    // console.log(url);
    formSearch.addEventListener("submit", e =>{
        e.preventDefault();
        const keyword = e.target.elements.keyword.value;
        // console.log(keyword);
        if(keyword){
            url.searchParams.set("keyword", keyword);
        } else{
            url.searchParams.delete("keyword");
        }

        window.location.href = url.href;
    })
}

//Pagination
const buttonPagination = document.querySelectorAll("[button-pagination]");
if(buttonPagination){
    let url = new URL(window.location.href);
    buttonPagination.forEach(button => {
        button.addEventListener("click", () => {
            const page = button.getAttribute("button-pagination");
            url.searchParams.set("page", page);
            window.location.href = url;
        })
    });
}

//Check-box multi
const checkboxMulti = document.querySelector("[checkbox-multi]");
if(checkboxMulti){
    const inputCheckAll = checkboxMulti.querySelector("input[name = 'checkall']");
    const inputIds = checkboxMulti.querySelectorAll("input[name='id']");
    inputCheckAll.addEventListener("click", () => {
        if(inputCheckAll.checked){
            inputIds.forEach((input) => {
                input.checked = true;
            });
        } else{
            inputIds.forEach((input) => {
                input.checked = false;
            });
        }
    });

    inputIds.forEach((input) => {
        input.addEventListener("click", () => {
            const countChecked = checkboxMulti.querySelectorAll("input[name='id']:checked");
            if(countChecked.length === inputIds.length){
                inputCheckAll.checked = true;
            } else{
                inputCheckAll.checked = false;
            }
        });
    });

}


//Form change multi
const formChangeMulti = document.querySelector("[form-change-multi]");
if(formChangeMulti){
    formChangeMulti.addEventListener("submit", (e) => {
        e.preventDefault();
        const checkboxMulti = document.querySelector("[checkbox-multi]");
        const inputChecked = checkboxMulti.querySelectorAll("input[name='id']:checked");

        const typeChange = e.target.elements.type.value;
        if(typeChange == "delete-all"){
            const isConfirm = confirm("Bạn có chắc chắn muốn xóa những sản phẩm này không?");
            if(!isConfirm){
                return;
            }
        }

        if(inputChecked.length > 0){
            const inputIds = formChangeMulti.querySelector("input[name='ids']");
            console.log(inputIds);
            let ids = [];
            inputChecked.forEach((input) => {
                const id = input.value;
                if(typeChange == "change-position"){
                    const position = input.closest("tr").querySelector("input[name='position']").value;
                    ids.push(`${id}-${position}`);
                } else{
                    ids.push(id);
                }
            })
            console.log(ids);
            inputIds.value = ids.join(", ");

            formChangeMulti.submit();
        } else{
            alert("Vui lòng chọn ít nhất 1 bản ghi");
        }
    })
}

// Upload image
// Upload image
const uploadInput = document.querySelector("#thumbnail");
const uploadPreview = document.querySelector("#thumbnailPreview");

if (uploadInput) { 
    uploadInput.addEventListener("change", (e) => {
        const file = e.target.files[0];
        if (file) {
            uploadPreview.src = URL.createObjectURL(file);
            uploadPreview.style.display = "block";
        }
    });
}


//Sort
const sort = document.querySelector("[sort]");
console.log(sort);
if(sort){
    let url = new URL(window.location.href);
    const sortSelect = sort.querySelector("[sort-select]");
    const sortClear = sort.querySelector("[sort-clear]");
    
    sortSelect.addEventListener("change", (e) => {
        const value = e.target.value;
        console.log(value);
        const [sortKey, sortValue] = value.split("-");
        url.searchParams.set("sortKey", sortKey);
        url.searchParams.set("sortValue", sortValue);
        window.location.href = url.href;
    });

    sortClear.addEventListener("click", () => {
        url.searchParams.delete("sortKey");
        url.searchParams.delete("sortValue");
        window.location.href = url.href;
    });

    //Thêm selected
    const sortKey = url.searchParams.get("sortKey");
    const sortValue = url.searchParams.get("sortValue");
    if(sortKey && sortValue){
        const value = `${sortKey}-${sortValue}`;
        console.log(value);
        const optionalSelected = sortSelect.querySelector(`option[value='${value}']`);
        optionalSelected.selected = true;
    }
}
