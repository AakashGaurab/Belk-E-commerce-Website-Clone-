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
    if (obj.category=="update"){
        patch(obj);
    }
    else {
        post_product(obj);
    }
    
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

async function patch(data){
    let res = await fetch("http://localhost:3500/product/",{
        method:"PATCH",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(data)
    })
    let response = await res.json();
    alert(response);
}


document.querySelector("#update").addEventListener("click",async ()=>{
    let res=await fetch("http://localhost:3500/product/",{
        method:"GET",
        headers:{
            "Content-Type":"application/json"
        }
    })
    let data = await res.json();
    display_in_table(data);
})

function display_in_table(data){
    document.querySelector(".product").innerHTML="";
    data.forEach(element => {
        let row = document.createElement("tr");
        let td1 = document.createElement("td");
        let img = document.createElement("img");
        img.setAttribute("src",element.img);
        let td2 = document.createElement("td");
        td2.innerText=element.title;
        let td3 = document.createElement("td");
        td3.innerText=element.price;
        td1.append(img);
        row.append(td1,td2,td3);
        document.querySelector(".product").append(row);

    });
}