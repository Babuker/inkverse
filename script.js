async function startVerification() {
    const btn = document.getElementById('verify-btn');
    btn.innerText = "Checking Blockchain...";
    
    const wallet = "THRhk1ARg2ntebnP2AMWNAg5zYeMU8idt1";
    const apiUrl = `https://api.trongrid.io/v1/accounts/${wallet}/transactions/trc20?limit=5`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        
        // البحث عن عملية بقيمة 5000000 (لأن الـ USDT لديه 6 خانات عشرية)
        const success = data.data.some(tx => 
            tx.token_info.symbol === "USDT" && 
            tx.value === "5000000" && 
            tx.to === wallet
        );

        if (success) {
            document.getElementById('payment-area').style.display = 'none';
            document.getElementById('download-area').style.display = 'block';
        } else {
            alert("Payment not found yet. Please wait a minute and try again.");
            btn.innerText = "Verify Payment & Download";
        }
    } catch (error) {
        console.error("Error verifying payment:", error);
    }
}
