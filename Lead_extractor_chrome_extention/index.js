// the purpose of storing the urls in local storage is if u
// add few urls and  and close the tab and open again , the 
// extention should get the prevoiusly stored urls from the local storage(dynamic in nature)

let myLeads=[]
const inputEl=document.getElementById("input-el")   // user input field
const inputBtn=document.getElementById("input-btn")  // SAVE INPUT btn
const ulEl=document.getElementById("ul-el")
const deleteBtn=document.getElementById("delete-btn")  // DELETE ALL btn
const leadsFromLocalStorage=JSON.parse(localStorage.getItem("myLeads"))
const tabBtn=document.getElementById("tab-btn")   // SAVE tab url btn
if(leadsFromLocalStorage)  // it checks if there were urls previously added
{
    myLeads=leadsFromLocalStorage
    render(myLeads)
}

tabBtn.addEventListener("click",function(){
    chrome.tabs.query({active:true,currentWindow:true},function(tabs){  // chrome.tabs.query gets the active tab in the current window
        myLeads.push(tabs[0].url)                                // The query function takes an object as its parameter with two properties: active set to true and currentWindow set to true. This ensures that only the active tab in the current window is queried.
    localStorage.setItem("myLeads",JSON.stringify(myLeads))
    render(myLeads)
    })
    
})

function render(leads){
    let listItems=""
for(let i=0;i<leads.length;i++)
{
    listItems+=`
    <li>
    <a target='_blank' href='${leads[i]}'>  ${leads[i]} </a>
    </li>`
}
ulEl.innerHTML=listItems
}

deleteBtn.addEventListener("dblclick",function (){
    localStorage.clear()
    myLeads=[]
    render(myLeads)
})
inputBtn.addEventListener("click",function(){
    myLeads.push(inputEl.value)
    inputEl.value=""
    localStorage.setItem("myLeads",JSON.stringify(myLeads))
    render(myLeads)
})



