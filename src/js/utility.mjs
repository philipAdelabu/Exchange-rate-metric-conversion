import {MetricBaseURL, EXCH_RATE_URL } from "./config";
import {saveToStorage , getFromStorage} from "./storage";

export function switchTab(tab) {
        document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
        document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));

        if (tab === 'currency') {
            loadAnimation();
            document.getElementById('currencyResult').innerText = "";
            const lastCurrencyConversion = getFromStorage('lastCurrencyConversion');
            if(lastCurrencyConversion){
               document.getElementById('currencyResult').innerText = lastCurrencyConversion;
            }

            document.querySelectorAll('.tab')[0].classList.add('active');
            document.getElementById('currency').classList.add('active');
        } else {
            
            document.getElementById('metricResult').innerText = "";
            document.getElementById('FromMetricType').innerHTML = "";
            document.getElementById('ToMetricType').innerHTML = "";
            document.getElementById('metricValue').value = "";
            document.getElementById('category').value = "";
            loadAnimation(true);
            getCategories();
            document.querySelectorAll('.tab')[1].classList.add('active');
            document.getElementById('metric').classList.add('active');
            loadAnimation(false);
        }
    }



   export async function convertCurrency() {
        
        const amount = parseFloat(document.getElementById('amount').value);
        const from = document.getElementById('fromCurrency').value;
        const to = document.getElementById('toCurrency').value;
        
        if (isNaN(amount)) {
            document.getElementById('currencyResult').innerText = "Please enter a valid amount.";
            return;
        }
       
       loadAnimation(true);
       const rates = await getRate(EXCH_RATE_URL, from);
       if(rates){
        const usdAmount = amount / rates[from];
        const converted = usdAmount * rates[to];
        const result =  `${amount} ${from} = ${converted.toFixed(2)} ${to}`;
        document.getElementById('currencyResult').innerText = result;
        saveToStorage('lastCurrencyConversion', result );
        loadAnimation(false);
       }
    }

   export function convertMetric() {
        document.getElementById('metricResult').innerText = "";
        const category = parseFloat(document.getElementById('category').value);
        const from = document.getElementById('FromMetricType').value;
        const to = document.getElementById('ToMetricType').value;

        const value = document.getElementById('metricValue').value;

        if (isNaN(value)) {
            document.getElementById('metricResult').innerText = "Please enter a valid value.";
            return;
        }
        loadAnimation(true);
       const result = getMetricResult(from, to, value, category);   
        saveToStorage('lastMetricConversion', result);
        document.getElementById('metricResult').innerText = result;  
        loadAnimation(false);  
    }

    export async function getRate(url, from){
       const URL = url+"/latest/"+from;
       console.log(URL)
       const resp = await fetch(URL); 
       const res = await resp.json();
       if(res.result === "success")
         return res.conversion_rates;
       return undefined;
    }

    export async function getCategories(){
       const URL = MetricBaseURL+"categories";
       const resp = await fetch(URL);
       const res = await resp.json();
       const categories = document.querySelector("#categories");
       if(res){
        const cat = res.categories;
         cat.forEach( item => {
         let option = document.createElement("option");
         option.setAttribute("value", item.id);
         option.innerText = item.name;
         categories.appendChild(option);
        });
        categories.addEventListener("change", async (e) => {
            const categoryId = e.target.value;
            const typesURL = MetricBaseURL+"units/"+categoryId;
            const resp = await fetch(typesURL);
            const res = await resp.json();
            const fromSelect = document.querySelector("#FromMetricType");
            const toSelect = document.querySelector("#ToMetricType");
            fromSelect.innerHTML = "";
            toSelect.innerHTML = "";
            if(res){
                const units = res.units;
                document.getElementById("category").value = res.category;
                units.forEach( item => {
                    let option1 = document.createElement("option");
                    option1.setAttribute("value", item.value);
                    option1.innerText = item.label;
                    fromSelect.appendChild(option1);

                    let option2 = document.createElement("option");
                    option2.setAttribute("value", item.value);
                    option2.innerText = item.label;
                    toSelect.appendChild(option2);
                });
            }
        });

       }
    }

    export async function getMetricResult(from, to, value, category){
        const URL = MetricBaseURL+"convert?from="+from+"&to="+to+"&value="+value+"&category="+category;
        const resp = await fetch(URL);
        const res = await resp.json();
        if(res){
         const result =  `${value} ${from} = ${res.result.toFixed(4)} ${to}`;
          return result;
        }
    }

 export async function loadTemplate(path){
   const res = await fetch(path);
   const template = await res.text();
   return template;
}

export async function loadPartials(){
  const currencies = await loadTemplate("/partials/currencies.html");
  const fromCurrency = document.querySelector("#fromCurrency");
  const toCurrency = document.querySelector("#toCurrency");
  fromCurrency.innerHTML = currencies;
  toCurrency.innerHTML = currencies;
 
}

export  function loadAnimation(status=false){
      let loader = document.querySelector("#loader-container");
       let container = document.querySelector(".container");

       if(status == true){
           container.style.display = 'none';
           loader.style.display = 'block';
       }else{
            container.style.display = 'block';
            loader.style.display = 'none';
       }
}

