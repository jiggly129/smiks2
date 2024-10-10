const allCoinDivs = []

const bitcoinDiv = document.getElementById('bitcoin')
allCoinDivs.push(bitcoinDiv)

const getBitcoin = async () => {
    try {
        let response = await fetch('https://api.coindesk.com/v1/bpi/currentprice.json')
        let json = await response.json()
        return json
    } catch (error) {
        console.log(error)
   }
}

const updatePrices = setInterval(async () => {
    let bitcoin = await getBitcoin()

    console.log(bitcoin.bpi)

    allCoinDivs.forEach((div) => {
        let children = Array.from(div.children)

        children.forEach((child) => {
            console.log(child)
        })
    })
},5000)