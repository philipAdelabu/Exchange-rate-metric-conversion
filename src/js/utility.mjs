export function switchTab(tab) {
        document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
        document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));

        if (tab === 'currency') {
            document.querySelectorAll('.tab')[0].classList.add('active');
            document.getElementById('currency').classList.add('active');
        } else {
            document.querySelectorAll('.tab')[1].classList.add('active');
            document.getElementById('metric').classList.add('active');
        }
    }

    // Sample static exchange rates (base USD)
    const rates = {
        USD: 1,
        EUR: 0.92,
        GBP: 0.78
    };

   export function convertCurrency() {
        const amount = parseFloat(document.getElementById('amount').value);
        const from = document.getElementById('fromCurrency').value;
        const to = document.getElementById('toCurrency').value;

        if (isNaN(amount)) {
            document.getElementById('currencyResult').innerText = "Please enter a valid amount.";
            return;
        }

        const usdAmount = amount / rates[from];
        const converted = usdAmount * rates[to];

        document.getElementById('currencyResult').innerText =
            `${amount} ${from} = ${converted.toFixed(2)} ${to}`;
    }

   export function convertMetric() {
        const value = parseFloat(document.getElementById('metricValue').value);
        const type = document.getElementById('metricType').value;

        if (isNaN(value)) {
            document.getElementById('metricResult').innerText = "Please enter a valid value.";
            return;
        }

        let result;

        switch (type) {
            case "km-miles":
                result = value * 0.621371;
                document.getElementById('metricResult').innerText =
                    `${value} km = ${result.toFixed(2)} miles`;
                break;

            case "miles-km":
                result = value / 0.621371;
                document.getElementById('metricResult').innerText =
                    `${value} miles = ${result.toFixed(2)} km`;
                break;

            case "kg-lbs":
                result = value * 2.20462;
                document.getElementById('metricResult').innerText =
                    `${value} kg = ${result.toFixed(2)} lbs`;
                break;

            case "lbs-kg":
                result = value / 2.20462;
                document.getElementById('metricResult').innerText =
                    `${value} lbs = ${result.toFixed(2)} kg`;
                break;
        }
    }