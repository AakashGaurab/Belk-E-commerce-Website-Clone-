document.querySelector("#search_button").addEventListener("click",()=>{
    let querry = document.querySelector(".search_bar").value;
    window.location.href="product.html";
})

document.querySelector(".logo").addEventListener("click",()=>{
    window.location.href="landing_page.html"
})

let all_img=document.querySelectorAll("body img")
for (let i=0;i<all_img.length;i++){
    all_img[i].addEventListener("click",()=>{
        window.location.href="product.html";
    })
}