let data;
async  function main(){
 let res = await fetch("http://localhost:3500/product/",{
    headers:{
        "Content-Type":"application/json",
        token:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjNjNjQ1ZWIzNmI3ZTNkZGQwM2E5MGFiIiwiaWF0IjoxNjc0MTEwMDEwLCJleHAiOjE2NzQxMjgwMTB9.Tp210eV2Zhs95tzD9ZgGdgK6epWEC2va05ri8cEbVC4"
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
    let info=data.map(element => {
        return `<div class="tag">
        <img src="${element.img}" alt="">
        <h3>${element.title}</h3>
        <h3>Rs ${element.price}</h3>
        <button onclick="cart()">Add to Cart</button>
    </div>`
    });
    document.querySelector(".display").innerHTML=info.join(" ");
}
/* ***********************cart function ************************* */
function cart(){
}


document.querySelector("#search_button").addEventListener("click",async ()=>{
    let value = document.querySelector(".search_bar").value;
  let filtered_data=data.filter((ele)=>{
    return ele.title.toLowerCase().includes(value.toLowerCase());
  })
  data=filtered_data
  display(filtered_data);
})
main();