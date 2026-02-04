import React, { useState, useEffect } from 'react'
import SparklineChart from './SparklineChart'

const coinMetadata = [
  { id: 'BTC', name: 'Bitcoin', symbol: 'BTC' },
  { id: 'ETH', name: 'Ethereum', symbol: 'ETH' },
  { id: 'SOL', name: 'Solana', symbol: 'SOL' },
  { id: 'XRP', name: 'Ripple', symbol: 'XRP' },
  { id: 'ADA', name: 'Cardano', symbol: 'ADA' }
]

export default function Sidebar({ selectedCoin, onSelectCoin, coinPrices }) {
  const [sparkData, setSparkData] = useState(generateSparkData())

  useEffect(() => {
    const interval = setInterval(() => {
      setSparkData(generateSparkData())
    }, 1500)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="w-72 glass-strong border-r border-[#2a2e4a] flex flex-col overflow-hidden">
      {/* Header */}
      <div className="px-6 py-6 border-b border-[#2a2e4a]">
        <h2 className="text-sm font-bold text-[#e8eaf6] tracking-wider uppercase mb-1">Watchlist</h2>
        <p className="text-xs text-[#9fa3c1]">Top 5 Cryptocurrencies</p>
      </div>

      {/* Coin List */}
      <div className="flex-1 overflow-y-auto space-y-2 px-4 py-4">
        {coinMetadata.map((coin) => {
          const priceData = coinPrices?.[coin.id]
          const isSelected = selectedCoin === coin.id
          const isPositive = (priceData?.change24h || 0) >= 0

          return (
            <button
              key={coin.id}
              onClick={() => onSelectCoin(coin.id)}
              className={`w-full group p-4 rounded-lg border transition-all duration-300 relative overflow-hidden ${
                isSelected
                  ? 'glass-strong border-[#00d9ff] shadow-card animate-pulse-glow'
                  : 'glass border-[#3a3f5a] hover:border-[#00d9ff]/50'
              }`}
            >
              {/* Hover gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#00d9ff]/0 via-[#00d9ff]/5 to-[#00d9ff]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              <div className="relative">
              {/* Coin Header */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${
                      coin.id === 'BTC'
                        ? 'bg-orange-500/30 text-orange-400'
                        : coin.id === 'ETH'
                        ? 'bg-purple-500/30 text-purple-400'
                        : coin.id === 'SOL'
                        ? 'bg-green-500/30 text-green-400'
                        : coin.id === 'XRP'
                        ? 'bg-blue-500/30 text-blue-400'
                        : 'bg-indigo-500/30 text-indigo-400'
                    }`}
                  >
                    {coin.symbol.charAt(0)}
                  </div>
                  <div className="text-left">
                    <p className="text-xs font-bold text-[#e8eaf6]">{coin.symbol}</p>
                    <p className="text-xs text-[#9fa3c1]">{coin.name}</p>
                  </div>
                </div>
                <p className="font-mono text-xs font-bold text-[#e8eaf6]">
                  {priceData ? `$${priceData.price.toLocaleString('en-US', { maximumFractionDigits: 2 })}` : '-'}
                </p>
              </div>

              {/* Sparkline Chart */}
              <div className="mb-3 h-10 -mx-2">
                <SparklineChart data={sparkData[coin.id]} isPositive={coin.change24h >= 0} />
              </div>

                {/* Change % */}
                <div className={`text-right text-xs font-bold font-mono transition-all group-hover:text-lg ${
                  isPositive ? 'text-[#39ff14]' : 'text-[#ff3d5a]'
                }`}>
                  {isPositive ? '↑' : '↓'} {priceData ? Math.abs(priceData.change24h).toFixed(2) : '-'}%
                </div>
              </div>
            </button>
          )
        })}
      </div>

      {/* Footer Stats */}
      <div className="border-t border-[#2a2e4a] px-6 py-4 space-y-3">
        <div className="glass rounded-lg p-3">
          <p className="text-xs text-[#9fa3c1] mb-1">Total Holdings</p>
          <p className="text-sm font-bold text-[#e8eaf6] font-mono">$847,250.42</p>
        </div>
        <button className="w-full bg-gradient-to-r from-[#00d9ff] to-[#39ff14] text-[#0a0e27] font-bold py-2 px-4 rounded-lg hover-lift text-sm">
          + Add Coin
        </button>
      </div>
    </div>
  )
}

function generateSparkData() {
  const data = {}
  coinMetadata.forEach((coin) => {
    data[coin.id] = Array.from({ length: 20 }, () => Math.random() * 100)
  })
  return data
}