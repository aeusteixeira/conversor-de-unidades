document.addEventListener("DOMContentLoaded", function () {
    updateConverter();
    loadHistory();
});

async function getExchangeRate(from, to) {
    const apiKey = "3e024880fcd7e5638464a1bf"; // Substitua pela sua chave de API
    const url = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/${from}`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data.conversion_rates[to] || 1;
    } catch (error) {
        console.error("Erro ao obter taxa de câmbio:", error);
        return 1;
    }
}

function updateConverter() {
    const converterType = document.getElementById("converterType").value;
    const fromUnit = document.getElementById("fromUnit");
    const toUnit = document.getElementById("toUnit");
    
    const units = {
        moeda: ["USD", "EUR", "BRL"],
        temperatura: ["Celsius", "Fahrenheit", "Kelvin"],
        peso: ["Quilogramas", "Libras", "Gramas"],
        medida: ["Metros", "Centímetros", "Polegadas"],
        tempo: ["Dias", "Horas", "Minutos", "Segundos"]
    };

    fromUnit.innerHTML = "";
    toUnit.innerHTML = "";
    
    units[converterType].forEach(unit => {
        fromUnit.innerHTML += `<option value="${unit}">${unit}</option>`;
        toUnit.innerHTML += `<option value="${unit}">${unit}</option>`;
    });
}

async function convert() {
    const converterType = document.getElementById("converterType").value;
    const inputValue = parseFloat(document.getElementById("inputValue").value);
    const fromUnit = document.getElementById("fromUnit").value;
    const toUnit = document.getElementById("toUnit").value;
    let result = 0;

    if (isNaN(inputValue)) {
        document.getElementById("result").innerText = "Por favor, insira um valor válido.";
        return;
    }

    if (converterType === "moeda") {
        const rate = await getExchangeRate(fromUnit, toUnit);
        result = inputValue * rate;
    } else if (converterType === "temperatura") {
        result = convertTemperature(inputValue, fromUnit, toUnit);
    } else if (converterType === "peso") {
        result = convertWeight(inputValue, fromUnit, toUnit);
    } else if (converterType === "medida") {
        result = convertMeasure(inputValue, fromUnit, toUnit);
    } else if (converterType === "tempo") {
        result = convertTime(inputValue, fromUnit, toUnit);
    }

    document.getElementById("result").innerText = `Resultado: ${result.toFixed(2)} ${toUnit}`;
    saveToHistory(`${inputValue} ${fromUnit} = ${result.toFixed(2)} ${toUnit}`);
}

function convertTemperature(value, from, to) {
    if (from === to) return value;
    if (from === "Celsius") return to === "Fahrenheit" ? (value * 9/5) + 32 : value + 273.15;
    if (from === "Fahrenheit") return to === "Celsius" ? (value - 32) * 5/9 : (value - 32) * 5/9 + 273.15;
    if (from === "Kelvin") return to === "Celsius" ? value - 273.15 : (value - 273.15) * 9/5 + 32;
    return value;
}

function convertWeight(value, from, to) {
    const conversionRates = {
        Quilogramas: { Libras: 2.20462, Gramas: 1000 },
        Libras: { Quilogramas: 1 / 2.20462, Gramas: 453.592 },
        Gramas: { Quilogramas: 1 / 1000, Libras: 1 / 453.592 }
    };
    return value * (conversionRates[from][to] || 1);
}

function convertMeasure(value, from, to) {
    const conversionRates = {
        Metros: { Centímetros: 100, Polegadas: 39.3701 },
        Centímetros: { Metros: 1 / 100, Polegadas: 0.393701 },
        Polegadas: { Metros: 1 / 39.3701, Centímetros: 2.54 }
    };
    return value * (conversionRates[from][to] || 1);
}

function convertTime(value, from, to) {
    const conversionRates = {
        Dias: { Horas: 24, Minutos: 1440, Segundos: 86400 },
        Horas: { Dias: 1 / 24, Minutos: 60, Segundos: 3600 },
        Minutos: { Dias: 1 / 1440, Horas: 1 / 60, Segundos: 60 },
        Segundos: { Dias: 1 / 86400, Horas: 1 / 3600, Minutos: 1 / 60 }
    };
    return value * (conversionRates[from][to] || 1);
}

function saveToHistory(conversion) {
    let history = JSON.parse(localStorage.getItem("conversionHistory")) || [];
    history.unshift(conversion);
    if (history.length > 5) history.pop();
    localStorage.setItem("conversionHistory", JSON.stringify(history));
    loadHistory();
}

function loadHistory() {
    let history = JSON.parse(localStorage.getItem("conversionHistory")) || [];
    let historyTable = document.getElementById("history");
    historyTable.innerHTML = history.map(entry => `<tr><td>${entry}</td></tr>`).join("");
}
