(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))c(t);new MutationObserver(t=>{for(const o of t)if(o.type==="childList")for(const i of o.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&c(i)}).observe(document,{childList:!0,subtree:!0});function n(t){const o={};return t.integrity&&(o.integrity=t.integrity),t.referrerPolicy&&(o.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?o.credentials="include":t.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function c(t){if(t.ep)return;t.ep=!0;const o=n(t);fetch(t.href,o)}})();function s(e){document.querySelectorAll(".tab").forEach(r=>r.classList.remove("active")),document.querySelectorAll(".section").forEach(r=>r.classList.remove("active")),e==="currency"?(document.querySelectorAll(".tab")[0].classList.add("active"),document.getElementById("currency").classList.add("active")):(document.querySelectorAll(".tab")[1].classList.add("active"),document.getElementById("metric").classList.add("active"))}const l={USD:1,EUR:.92,GBP:.78};function u(){const e=parseFloat(document.getElementById("amount").value),r=document.getElementById("fromCurrency").value,n=document.getElementById("toCurrency").value;if(isNaN(e)){document.getElementById("currencyResult").innerText="Please enter a valid amount.";return}const t=e/l[r]*l[n];document.getElementById("currencyResult").innerText=`${e} ${r} = ${t.toFixed(2)} ${n}`}function d(){const e=parseFloat(document.getElementById("metricValue").value),r=document.getElementById("metricType").value;if(isNaN(e)){document.getElementById("metricResult").innerText="Please enter a valid value.";return}let n;switch(r){case"km-miles":n=e*.621371,document.getElementById("metricResult").innerText=`${e} km = ${n.toFixed(2)} miles`;break;case"miles-km":n=e/.621371,document.getElementById("metricResult").innerText=`${e} miles = ${n.toFixed(2)} km`;break;case"kg-lbs":n=e*2.20462,document.getElementById("metricResult").innerText=`${e} kg = ${n.toFixed(2)} lbs`;break;case"lbs-kg":n=e/2.20462,document.getElementById("metricResult").innerText=`${e} lbs = ${n.toFixed(2)} kg`;break}}function a(){document.querySelector("#currencyTab").addEventListener("click",()=>{s("currency")}),document.querySelector("#metricTab").addEventListener("click",()=>{s("metric")});const n=document.querySelectorAll("button");n[0].addEventListener("click",u),n[1].addEventListener("click",d)}document.querySelector("#app").innerHTML=`
   
<div class="container">
    <h2>Converter</h2>

    <div class="tabs">
        <div id="currencyTab" class="tab active">Currency</div>
        <div id="metricTab" class="tab">Metric</div>
    </div>

    <!-- Currency Converter -->
    <div id="currency" class="section active">
        <input type="number" id="amount" placeholder="Enter Amount">

        <select id="fromCurrency">
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
            <option value="GBP">GBP</option>
        </select>

        <select id="toCurrency">
            <option value="EUR">EUR</option>
            <option value="USD">USD</option>
            <option value="GBP">GBP</option>
        </select>

        <button>Convert</button>
        <div class="result" id="currencyResult"></div>
    </div>

    <!-- Metric Converter -->
    <div id="metric" class="section">
        <input type="number" id="metricValue" placeholder="Enter Value">

        <select id="metricType">
            <option value="km-miles">Kilometers to Miles</option>
            <option value="miles-km">Miles to Kilometers</option>
            <option value="kg-lbs">Kilograms to Pounds</option>
            <option value="lbs-kg">Pounds to Kilograms</option>
        </select>

        <button>Convert</button>
        <div class="result" id="metricResult"></div>
    </div>
</div>
`;a();
