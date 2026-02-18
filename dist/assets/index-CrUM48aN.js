(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))o(n);new MutationObserver(n=>{for(const c of n)if(c.type==="childList")for(const s of c.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&o(s)}).observe(document,{childList:!0,subtree:!0});function r(n){const c={};return n.integrity&&(c.integrity=n.integrity),n.referrerPolicy&&(c.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?c.credentials="include":n.crossOrigin==="anonymous"?c.credentials="omit":c.credentials="same-origin",c}function o(n){if(n.ep)return;n.ep=!0;const c=r(n);fetch(n.href,c)}})();const b="5d5f4569f0c1e6824a6e8bd5",h=`https://v6.exchangerate-api.com/v6/${b}`,m="https://api.unitconvr.com/v1/";function T(t,e){localStorage.setItem(t,JSON.stringify(e)),console.log("saving: "+e)}function f(t){const e=localStorage.getItem(t);return e?JSON.parse(e):null}function g(t){if(document.querySelectorAll(".tab").forEach(e=>e.classList.remove("active")),document.querySelectorAll(".section").forEach(e=>e.classList.remove("active")),t==="currency"){i(),document.getElementById("saved").innerText="",document.getElementById("currencyResult").innerText="";const e=f("lastCurrencyConversion");e&&(document.getElementById("saved").innerText="Last saved: "+e),document.querySelectorAll(".tab")[0].classList.add("active"),document.getElementById("currency").classList.add("active")}else{document.getElementById("saved").innerText="",document.getElementById("metricResult").innerText="",document.getElementById("FromMetricType").innerHTML="",document.getElementById("ToMetricType").innerHTML="",document.getElementById("metricValue").value="",document.getElementById("category").value="",B();const e=f("lastMetricConversion");e&&(document.getElementById("saved").innerText="Last saved: "+e),document.querySelectorAll(".tab")[1].classList.add("active"),document.getElementById("metric").classList.add("active")}}async function L(){const t=parseFloat(document.getElementById("amount").value),e=document.getElementById("fromCurrency").value,r=document.getElementById("toCurrency").value;if(isNaN(t)){document.getElementById("currencyResult").innerText="Please enter a valid amount.";return}i(!0);const o=await I(h,e);if(o){const c=t/o[e]*o[r],s=`${t} ${e} = ${c.toFixed(2)} ${r}`;document.getElementById("currencyResult").innerText=s,T("lastCurrencyConversion",s),i(!1)}}async function C(){document.getElementById("metricResult").innerText="";const t=parseFloat(document.getElementById("category").value),e=document.getElementById("FromMetricType").value,r=document.getElementById("ToMetricType").value,o=document.getElementById("metricValue").value;if(isNaN(o)){document.getElementById("metricResult").innerText="Please enter a valid value.";return}i(!0);const n=await M(e,r,o,t);n&&(T("lastMetricConversion",n),document.getElementById("metricResult").innerText=n),i(!1)}async function I(t,e){const r=t+"/latest/"+e;console.log(r);const n=await(await fetch(r)).json();if(n.result==="success")return n.conversion_rates}async function B(){const t=m+"categories",r=await(await fetch(t)).json(),o=document.querySelector("#categories");r&&(r.categories.forEach(c=>{let s=document.createElement("option");s.setAttribute("value",c.id),s.innerText=c.name,o.appendChild(s)}),o.addEventListener("change",async c=>{const s=c.target.value,y=m+"units/"+s,l=await(await fetch(y)).json(),v=document.querySelector("#FromMetricType"),p=document.querySelector("#ToMetricType");if(v.innerHTML="",p.innerHTML="",l){const E=l.units;document.getElementById("category").value=l.category,E.forEach(a=>{let u=document.createElement("option");u.setAttribute("value",a.value),u.innerText=a.label,v.appendChild(u);let d=document.createElement("option");d.setAttribute("value",a.value),d.innerText=a.label,p.appendChild(d)})}}))}async function M(t,e,r,o){const n=m+"convert?from="+t+"&to="+e+"&value="+r+"&category="+o,s=await(await fetch(n)).json();if(s)return`${r} ${t} = ${s.result.toFixed(4)} ${e}`}async function S(t){return await(await fetch(t)).text()}async function x(){const t=await S("/partials/currencies.html"),e=document.querySelector("#fromCurrency"),r=document.querySelector("#toCurrency");e.innerHTML=t,r.innerHTML=t}function i(t=!1){let e=document.querySelector("#loader-container"),r=document.querySelector(".container");t==!0?(r.style.display="none",e.style.display="block"):(r.style.display="block",e.style.display="none")}function R(){document.querySelector("#currencyTab").addEventListener("click",()=>{g("currency")}),document.querySelector("#metricTab").addEventListener("click",()=>{g("metric")});const r=document.querySelectorAll("button");r[0].addEventListener("click",L),r[1].addEventListener("click",C),x()}document.querySelector("#app").innerHTML=`
   
<div class="container">
    <h2>Converter</h2>
    <p id="saved"></p>
    <div class="tabs">
        <div id="currencyTab" class="tab active">Currency</div>
        <div id="metricTab" class="tab">Metric</div>
    </div>

    <!-- Currency Converter -->
    <div id="currency" class="section active">
        <input type="number" id="amount" placeholder="Enter Amount">
        <select id="fromCurrency"></select>
        <select id="toCurrency"></select>
        <button>Convert</button>
        <div class="result" id="currencyResult"></div>
    </div>

    <!-- Metric Converter -->
    <div id="metric" class="section">
        <select id="categories" >
           <option> -- select a category -- </option>
        </select>
        <label for="FromMetricType">From:</label>
        <select id="FromMetricType"></select>

        <label for="ToMetricType">To:</label>
        <select id="ToMetricType"></select>
        <input type="hidden" id="category">
        <input type="number" id="metricValue" placeholder="Enter Value"> 
        <button>Convert</button>
        <div class="result" id="metricResult"></div>
    </div>
</div>
<div id="loader-container">
<div class="loader">
    <span></span>
    <span></span>
</div>
</div>

`;R();
