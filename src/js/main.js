import '../css/style.css';

import viteLogo from '/images/vite.svg'
import init from "./convert.js";

document.querySelector('#app').innerHTML = `
   
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
`

init();
