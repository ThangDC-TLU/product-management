//Change-status
const buttonChangeStatus = document.querySelectorAll("[button-change-status]");
console.log(buttonChangeStatus);
if(buttonChangeStatus){
    const formChangeStatus = document.querySelector("#form-change-status");
    const path = formChangeStatus.getAttribute("data-path");
    console.log(formChangeStatus);
    buttonChangeStatus.forEach((button) => {
        button.addEventListener("click", () =>{
            const statusCurrent = button.getAttribute("data-status"); 
            const idCurrent = button.getAttribute("data-id");
            console.log(`${statusCurrent} + ${idCurrent}`);
            
            let statusChange = statusCurrent === "active" ? "inactive" : "active";
            const action = path + `/${statusChange}/${idCurrent}?_method=PATCH`;
            formChangeStatus.action = action;

            formChangeStatus.submit();
        });
    });
}