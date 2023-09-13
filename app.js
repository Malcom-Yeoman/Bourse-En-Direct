const cryptoList = ["bitcoin", "ethereum", "ripple", "litecoin", "cardano", "polkadot", "binancecoin", "chainlink"];

function fetchCryptoPrices() {
    // Appel à l'API de CoinGecko pour obtenir les prix des cryptomonnaies
    fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${cryptoList.join(',')}&vs_currencies=usd`)
        .then(response => response.json())
        .then(data => {
            let displayContent = '';
            
            for (const crypto of cryptoList) {
                if (data[crypto] && data[crypto].usd) {
                    displayContent += `
                    <div class="crypto-card">
                        <h2>${crypto.toUpperCase()}</h2>
                        <p>$${data[crypto].usd}</p>
                    </div>`;
                } else {
                    displayContent += `
                    <div class="crypto-card">
                        <h2>${crypto.toUpperCase()}</h2>
                        <p>Données non disponibles</p>
                    </div>`;
                }
            }
        
            document.getElementById('cryptoDisplay').innerHTML = displayContent;
        })
        .catch(error => {
            console.error('Erreur lors de la requête:', error);
            document.getElementById('cryptoDisplay').innerText = "Erreur lors de la récupération des prix.";
        });
}

// Appel initial
fetchCryptoPrices();

// Rafraîchir les données toutes les 60 secondes
setInterval(fetchCryptoPrices, 60000);
