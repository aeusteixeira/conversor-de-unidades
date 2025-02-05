document.addEventListener("DOMContentLoaded", function () {
    updateConverter();
    loadHistory();
});

function toggleTheme() {
    document.body.classList.toggle("dark-mode");
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
    if (converterType === "tempo") {
        const conversionRates = {
            Dias: { Horas: 24, Minutos: 1440, Segundos: 86400 },
            Horas: { Dias: 1 / 24, Minutos: 60, Segundos: 3600 },
            Minutos: { Dias: 1 / 1440, Horas: 1 / 60, Segundos: 60 },
            Segundos: { Dias: 1 / 86400, Horas: 1 / 3600, Minutos: 1 / 60 }
        };
        result = inputValue * (conversionRates[fromUnit][toUnit] || 1);
    } else {
        result = inputValue;
    }
    document.getElementById("result").innerText = `Resultado: ${result.toFixed(2)} ${toUnit}`;
    saveToHistory(`${inputValue} ${fromUnit} = ${result.toFixed(2)} ${toUnit}`);
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