import { switchTab, convertCurrency, convertMetric} from "./utility.mjs";


export default function init() {
    const currency = document.querySelector("#currencyTab");
    currency.addEventListener('click', () => {
          switchTab('currency');
    });
    const metric = document.querySelector("#metricTab");
    metric.addEventListener("click", ()=>{
        switchTab("metric");
    })

    const buttons = document.querySelectorAll('button');
    buttons[0].addEventListener('click', convertCurrency);
    buttons[1].addEventListener('click', convertMetric);
}
