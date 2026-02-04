import React, { useState, useEffect } from 'react'
import TopNav from './components/TopNav'
import Sidebar from './components/Sidebar'
import MainChart from './components/MainChart'
import OrderBook from './components/OrderBook'
import RecentTrades from './components/RecentTrades'
import { fetchCoinPrices, fetchCoinMarketChart } from './services/cryptoApi'

export default function App() {
  const [selectedCoin, setSelectedCoin] = useState('BTC')
  const [coinPrices, setCoinPrices] = useState(null)
  const [portfolioValue, setPortfolioValue] = useState(847250.42)
  const [change24h, setChange24h] = useState(0)
  const [chartData, setChartData] = useState(generateChartData())
  const [loading, setLoading] = useState(true)

  // Fetch real coin prices on mount
  useEffect(() => {
    const loadPrices = async () => {
      const prices = await fetchCoinPrices()
      if (prices) {
        setCoinPrices(prices)
        setChange24h(prices.BTC.change24h)
      }
      setLoading(false)
    }
    loadPrices()
  }, [])

  // Fetch chart data when coin changes
  useEffect(() => {
    const loadChartData = async () => {
      const coinMap = {
        BTC: 'bitcoin',
        ETH: 'ethereum',
        SOL: 'solana',
        XRP: 'ripple',
        ADA: 'cardano'
      }
      const data = await fetchCoinMarketChart(coinMap[selectedCoin], 7)
      if (data) setChartData(data)
    }
    if (coinPrices) loadChartData()
  }, [selectedCoin, coinPrices])

  // Update prices every 30 seconds
  useEffect(() => {
    const interval = setInterval(async () => {
      const prices = await fetchCoinPrices()
      if (prices) {
        setCoinPrices(prices)
        setChange24h(prices[selectedCoin]?.change24h || 0)
      }
    }, 30000)
    return () => clearInterval(interval)
  }, [selectedCoin])

  return (
    <div className="flex h-screen w-screen bg-[#0a0e27] overflow-hidden">
      {/* Sidebar */}
      <Sidebar selectedCoin={selectedCoin} onSelectCoin={setSelectedCoin} coinPrices={coinPrices} />

      {/* Main Content */}
      <div className="flex flex-col flex-1">
        {/* Top Navigation */}
        <TopNav portfolioValue={portfolioValue} change24h={change24h} loading={loading} />

        {/* Dashboard Grid */}
        <div className="flex-1 overflow-hidden p-6 space-y-6">
          {loading ? (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <div className="animate-spin w-12 h-12 border-4 border-[#3a3f5a] border-t-[#00d9ff] rounded-full mb-4 mx-auto"></div>
                <p className="text-[#9fa3c1]">Loading live data...</p>
              </div>
            </div>
          ) : (
            <>
              {/* Charts Row */}
              <div className="grid grid-cols-3 gap-6 h-1/2">
                {/* Main Candlestick Chart */}
                <div className="col-span-2">
                  <MainChart coin={selectedCoin} data={chartData} coinPrice={coinPrices?.[selectedCoin]} />
                </div>

                {/* Order Book */}
                <div>
                  <OrderBook coin={selectedCoin} basePrice={coinPrices?.[selectedCoin]?.price} />
                </div>
              </div>

              {/* Recent Trades Table */}
              <div className="h-1/2">
                <RecentTrades coinPrices={coinPrices} />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

function generateChartData() {
  return Array.from({ length: 60 }, (_, i) => {
    const base = 42000 + Math.random() * 2000
    const open = base
    const close = base + (Math.random() - 0.5) * 500
    const high = Math.max(open, close) + Math.random() * 300
    const low = Math.min(open, close) - Math.random() * 300

    return {
      time: i,
      open: parseFloat(open.toFixed(2)),
      close: parseFloat(close.toFixed(2)),
      high: parseFloat(high.toFixed(2)),
      low: parseFloat(low.toFixed(2)),
      volume: Math.floor(Math.random() * 1000000)
    }
  })
}