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

 let res = await fetch("https://dull-lime-ant-gown.cyclic.app/product/",{
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
        let res=await fetch("https://dull-lime-ant-gown.cyclic.app/product/cart",{
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

document.querySelector(".search_bar").addEventListener("input",(e)=>{
    if (e.target.value!=""){
        suggestion_bar(e.target.value);
    } 
    
})


function suggestion_bar(text){
    let suggestions = JSON.parse(localStorage.getItem("sug"))||[];
    let filtered_data=suggestions.filter((ele)=>{
    return ele.toLowerCase().includes(text.toLowerCase());
    })
    displayFilteredData(filtered_data);
}


function displayFilteredData(data){
    document.querySelector(".suggestion").innerHTML="";
    data.forEach(element => {
        let li = document.createElement("li");
        li.innerText = element;
        li.addEventListener("click",()=>{
            document.querySelector(".search_bar").value = element;
            suggestion_bar(element);
        })
        document.querySelector(".suggestion").append(li);
    });
}


/* ***********************Search function********************* */
document.querySelector("#search_button").addEventListener("click",async ()=>{
    let value = document.querySelector(".search_bar").value;
    let suggestions = JSON.parse(localStorage.getItem("sug"))|| [];
    suggestions.push(value);
    localStorage.setItem("sug",JSON.stringify(suggestions));
    let res = await fetch("https://dull-lime-ant-gown.cyclic.app/product/",{
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

