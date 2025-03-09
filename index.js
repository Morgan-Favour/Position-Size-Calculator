document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById("form");
    const entryPrize = document.getElementById("EP");
    const slPrice = document.getElementById("SL");
    const accountSize = document.getElementById("AS");
    const riskRatio = document.getElementById("riskRatio");
    const rewardRatio = document.getElementById("rewardRatio");
    const buySell = document.getElementById("buy_sell");
    const money = document.getElementById("money");
    const sizing = document.getElementById("sizing");
    const tpPrice = document.getElementById("tpPrice");

    form.addEventListener("submit", (event) => {
        event.preventDefault();

        // Convert input values to numbers
        const entryPrice = parseFloat(entryPrize.value);
        const stopLossPrice = parseFloat(slPrice.value);
        const accSize = parseFloat(accountSize.value);
        const riskPercent = parseFloat(riskRatio.value);
        const rewardPercent = parseFloat(rewardRatio.value);

        // Validate inputs
        if (!entryPrice || !stopLossPrice || !accSize || !riskPercent || !rewardPercent) {
            alert("Please fill in all fields");
            return;
        }

        // Calculate SL pips
        let slPips = Math.abs(entryPrice - stopLossPrice);
        const finalSlPips = slPips * 10000;
        const tpPips = finalSlPips / 10000;

        // Calculate money at risk and position sizing
        const moneyRisk = accSize * (riskPercent / 100);
        let positionSizing = moneyRisk / (finalSlPips * 10);

        // Calculate Take Profit
        let takeProfitPrice = 0;
        if (buySell.value === "buy") {
            takeProfitPrice = entryPrice + (tpPips * rewardPercent);
        } else if (buySell.value === "sell") {
            takeProfitPrice = entryPrice - (tpPips * rewardPercent);
        }

        // Update results
        money.textContent = moneyRisk.toFixed(2);
        sizing.textContent = positionSizing.toFixed(2);
        tpPrice.textContent = takeProfitPrice.toFixed(5);
    });
});