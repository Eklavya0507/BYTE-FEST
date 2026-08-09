const fee={ "UI Showdown":"₹100 per team","Code Sprint":"₹100 per team","Bug Hunt":"₹100 per team","Tech Quiz":"₹50 per team","Checkmate":"₹50 per team" };
const sel=document.querySelector("#event"), box=document.querySelector("#feeBox");
const qs=new URLSearchParams(location.search); const preset=qs.get("event");
if(preset){ const map={ui:"UI Showdown",code:"Code Sprint",bug:"Bug Hunt",quiz:"Tech Quiz",checkmate:"Checkmate"}; sel.value=map[preset]||preset; updateFee(); }
function updateFee(){ const v=sel.value; box.innerHTML=v?`<strong>${fee[v]}</strong><span>Official UPI ID/QR should be configured by the organizer before launch. Enter the transaction reference after payment.</span>`:`<strong>Select an event</strong><span>The correct fee and payment instructions will appear here.</span>`; }
sel.addEventListener("change",updateFee); updateFee();
document.querySelector("#regForm").addEventListener("submit",e=>{
 e.preventDefault(); const d=Object.fromEntries(new FormData(e.target)); const prefix={"UI Showdown":"UI","Code Sprint":"CS","Bug Hunt":"BH","Tech Quiz":"TQ","Checkmate":"CM"}[d.event];
 const key="bf_"+prefix; const n=Number(localStorage.getItem(key)||0)+1; localStorage.setItem(key,n);
 const id=`BF26-${prefix}-${String(n).padStart(3,"0")}`; d.registrationId=id; d.createdAt=new Date().toISOString();
 const arr=JSON.parse(localStorage.getItem("bytefest_registrations")||"[]"); arr.push(d); localStorage.setItem("bytefest_registrations",JSON.stringify(arr));
 document.querySelector("#rid").textContent=id; e.target.classList.add("hidden"); document.querySelector("#success").classList.remove("hidden");
});