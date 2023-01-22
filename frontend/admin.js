document.querySelector("#password_prompt form").addEventListener("submit",(event)=>{
    event.preventDefault();
    let input = document.querySelectorAll("#password_prompt input");
    let obj={};
    for (let i=0;i<input.length;i++){
        obj[input[i].id]=input[i].value;
    }
    login(obj);
})


async function login(obj){
    let res = await fetch("http://localhost:3500/user/login",{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
       body:JSON.stringify(obj)
    })
    let data = await res.json();
    if (data.token!="undefined"){
        let token = data.token;
        sessionStorage.setItem("token",token);
        website_content.style.display="block";
        password_prompt.style.display="none";
    }
    else {
        alert("Wrong Credentials")
    }
}


document.querySelector(".display form").addEventListener("submit",(event)=>{
    event.preventDefault();
    let input = document.querySelectorAll(".display input");
    let obj={};
    for (let i=0;i<input.length-1;i++){
        obj[input[i].id]=input[i].value;
    }
    let sel=document.querySelector("#category");
    obj[sel.id]=sel.value;
    post_product(obj);
})

async function post_product(data){
    let res= await fetch("http://localhost:3500/product/add",{
        method:"POST",
        headers:{
            "Content-Type":"application/json",
            token:sessionStorage.getItem("token")
        },
        body:JSON.stringify(data)
    })

    let response = await res.json();
    if (response=="product uploaded"){
       alert(response);
    }
    else {
        alert(response);
    }
}