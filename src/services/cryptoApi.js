const COINGECKO_BASE = 'https://api.coingecko.com/api/v3'

const COIN_IDS = {
  BTC: 'bitcoin',
  ETH: 'ethereum',
  SOL: 'solana',
  XRP: 'ripple',
  ADA: 'cardano'
}

export async function fetchCoinPrices() {
  try {
    const ids = Object.values(COIN_IDS).join(',')
    const res = await fetch(
      `${COINGECKO_BASE}/simple/price?ids=${ids}&vs_currencies=usd&include_24hr_vol=true&include_market_cap=true&include_last_updated_at=true`,
      { headers: { 'Accept': 'application/json' } }
    )
    const data = await res.json()

    return {
      BTC: {
        price: data.bitcoin.usd,
        change24h: data.bitcoin.usd_24h_change || 0,
        volume: data.bitcoin.usd_24h_vol || 0
      },
      ETH: {
        price: data.ethereum.usd,
        change24h: data.ethereum.usd_24h_change || 0,
        volume: data.ethereum.usd_24h_vol || 0
      },
      SOL: {
        price: data.solana.usd,
        change24h: data.solana.usd_24h_change || 0,
        volume: data.solana.usd_24h_vol || 0
      },
      XRP: {
        price: data.ripple.usd,
        change24h: data.ripple.usd_24h_change || 0,
        volume: data.ripple.usd_24h_vol || 0
      },
      ADA: {
        price: data.cardano.usd,
        change24h: data.cardano.usd_24h_change || 0,
        volume: data.cardano.usd_24h_vol || 0
      }
    }
  } catch (error) {
    console.error('Failed to fetch prices:', error)
    return null
  }
}

export async function fetchCoinMarketChart(coinId, days = 7) {
  try {
    const res = await fetch(
      `${COINGECKO_BASE}/coins/${coinId}/market_chart?vs_currency=usd&days=${days}&interval=hourly`,
      { headers: { 'Accept': 'application/json' } }
    )
    const data = await res.json()
    return data.prices.map((price, i) => ({
      time: i,
      close: price[1],
      open: i > 0 ? data.prices[i - 1][1] : price[1],
      high: price[1] * (1 + Math.random() * 0.02),
      low: price[1] * (1 - Math.random() * 0.02),
      volume: Math.floor(Math.random() * 1000000)
    }))
  } catch (error) {
    console.error('Failed to fetch market chart:', error)
    return null
  }
}

export function generateMockTrade(coins) {
  const coinList = ['BTC', 'ETH', 'SOL', 'XRP', 'ADA']
  const selectedCoin = coinList[Math.floor(Math.random() * coinList.length)]
  const price = coins[selectedCoin]?.price || 1000 + Math.random() * 50000
  const side = Math.random() > 0.5 ? 'buy' : 'sell'

  return {
    id: Math.random(),
    coin: selectedCoin,
    price: price + (Math.random() - 0.5) * 100,
    amount: Math.random() * 500,
    total: (price + (Math.random() - 0.5) * 100) * Math.random() * 500,
    side,
    time: new Date().toLocaleTimeString('en-US', { hour12: false })
  }
}