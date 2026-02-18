import '../css/style.css';
import '../css/loader.css';


import viteLogo from '/images/vite.svg'
import init from "./convert.js";


document.querySelector('#app').innerHTML = `
   
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

`

init();
