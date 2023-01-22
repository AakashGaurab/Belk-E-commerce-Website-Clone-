document.querySelector("#login").addEventListener("click",()=>{
    window.location.href="login.html"
})

document.querySelector("#signup").addEventListener("click",()=>{
    window.location.href="signup.html"
})

document.querySelector("#cart").addEventListener("click",()=>{
    window.location.href="cart.html";
})

document.querySelector(".logo").addEventListener("click",()=>{
    window.location.href="landing_page.html"
})

let data;
main();
async  function main(){

 let res = await fetch("http://localhost:3500/product/",{
    headers:{
        "Content-Type":"application/json",  
    }
 });
   data = await res.json();
  display(data);
}
//  *******************sorting function ***********
document.querySelector("#sort").addEventListener("change",async ()=>{
    let value = document.querySelector("#sort").value;
    if (value ==""){
       display(data); 
    }
    else if (value =="HTL"){
        let sorted_data=data.sort((a,b)=>{
             return Number(b.price)-Number(a.price);
        })
        console.log(sorted_data);
        display(sorted_data);
    }
    else if (value=="LTH"){
        let sorted_data=data.sort((a,b)=>{
           return Number(a.price)-Number(b.price);
           })
        display(sorted_data);
    }
})
//******************displaying function ***************** */
function display(data){
    document.querySelector(".display").innerHTML="";
    data.forEach(element => {
        let div = document.createElement("div");
        let img = document.createElement("img");
        img.setAttribute("src",element.img);
        let title=document.createElement("h3");
        title.innerText=element.title;
        let price = document.createElement("h3");
        price.innerText=`Rs ${element.price}`;
        let cart_button=document.createElement("button");
        cart_button.innerText="Add to Cart";
        cart_button.addEventListener("click",()=>{
            cart(element);
        })
        div.append(img,title,price,cart_button);
        document.querySelector(".display").append(div);
    });
}
/* ***********************cart function ************************* */
async function cart(data){
    let token = sessionStorage.getItem("token");
    if (token!=undefined){
        let res=await fetch("http://localhost:3500/product/cart",{
            method:"POST",
            headers:{
                "Content-Type":"application/json",
                token:token
    
            },
            body:JSON.stringify(data)
        })
        let response = await res.json();
        console.log(response);
        alert(response);

    }
    else {
        alert("Login First");
    }
    
}

/* ***********************Search function********************* */
document.querySelector("#search_button").addEventListener("click",async ()=>{
    let value = document.querySelector(".search_bar").value;
    let res = await fetch("http://localhost:3500/product/",{
    headers:{
        "Content-Type":"application/json",  
    }
 });
   data1 = await res.json();
  let filtered_data=data1.filter((ele)=>{
    return ele.title.toLowerCase().includes(value.toLowerCase());
  })
  data=filtered_data
  display(filtered_data);
})

