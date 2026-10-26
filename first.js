let nameInput = document.getElementById("nameInput");
let priceInput = document.getElementById("priceInput");
let resultDiv = document.getElementById("resultDiv");
let sizeInput = document.getElementById("sizeInput");
let demoResult = document.getElementById("demoResult");
let totalText = document.getElementById("totalText");
let totalAmount = 1850;
class Clothing{
    constructor(name,price,size){
        this.name = name;
        this.price = price;
        this.size = size;
    }
}
function updateCount(){
    totalText.innerHTML = `Total: ${resultDiv.children.length}item &nbsp; . &nbsp; ₹${totalAmount}`
}
function createCard(item){
    let card = document.createElement("div");
    card.classList.add("card");
    card.setAttribute("data-price", item.price)
    card.innerHTML = `
    <div>🧥<div>
    <b>${item.name}</b>
    <div class="price">${item.price}</div>
    <div class="size" >${item.size}</div>
    `;
    card.addEventListener("click",(e) => {
        totalAmount -= Number(e.currentTarget.getAttribute("data-price"))
        e.currentTarget.remove()
        updateCount();
    })
    return card;
}
let defaultItems = [
    new Clothing("T-shirt", 500, "M"),
    new Clothing("jeans", 900, "L"),
    new Clothing("Hoodies", 450, "s")
]
defaultItems.forEach(i => resultDiv.append(createCard(i)))
document.getElementById("addBtn").addEventListener("click",()=>{
    if(!nameInput.value || !priceInput.value) return;
    let item = new Clothing(nameInput.value, priceInput.value, sizeInput.value ||  "M")
    resultDiv.append(createCard(item))
    totalAmount += Number(item.price)
    updateCount();
    nameInput.value = "";
    priceInput.value = "";
    sizeInput.value = ""
});
//topic 1//
document.getElementById("syncBtn").addEventListener("click", ()=>{
    demoResult.innerText = "> Sync start... 2 sec Block";
    let start = Date.now();
    while(Date.now() - start < 2000){}
    demoResult.innerText = "> Sync khatam, sab ruka tha"
})
// topic 2//
document.getElementById("asyncBtn").addEventListener("click",()=>{
    demoResult.innerText = "> Async start...page chalta rahega";
    setTimeout(()=>  demoResult.innerText = "> setTimeout done(Asyc)", 2000)
})
//topic3//
document.getElementById("callbackBtn").addEventListener("click", ()=>{
    function getData(cb){setTimeout(()=> cb("Callback se data aaya"),1000);}
    getData((msg)=> demoResult.innerText = ">" + msg);
})
//topic4//
document.getElementById("promiseBtn").addEventListener("click", ()=>{
    demoResult.innerHTML = "> Promise pending...";
    new Promise(res => setTimeout(()=> res("Promise resolve ho gya"),1000))
    .then(m => demoResult.innerText = "> " + m)
    
})
//topic5//
document.getElementById("asyncAwaitBtn").addEventListener("click",async()=>{
demoResult.innerText ="> Await kar rahe..."
let p = new Promise(r => setTimeout(()=> r("Async/Await se data mil gaya"), 1000))
    let result = await p;
    demoResult.innerText = "> " + result;
})
document.getElementById("apiBtn").addEventListener("click", async()=>{
    try{
        demoResult.innerText = "> Fetch APi se data aa raha..."
        let res = await fetch("https://fakestoreapi.com/products?limit=1");
        let data = await res.json()
        await Promise.all([new Promise(r=> setTimeout(r, 500))]);
        let item = new Clothing(data[0].title.slice(0.7), Math.round(data[0].price), "M"); 
        resultDiv.append(createCard(item))
        totalAmount += Number(item.price);
        updateCount()
        demoResult.innerText ="> API + Promise.all success"
    }catch(e){
        demoResult.innerHTML = "> API Error " + e;
    }
})