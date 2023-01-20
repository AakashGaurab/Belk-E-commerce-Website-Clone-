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