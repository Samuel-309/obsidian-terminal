import React, { useMemo } from 'react'
import CandlestickChart from './CandlestickChart'

export default function MainChart({ coin, data, coinPrice }) {
  const stats = useMemo(() => {
    if (!data || data.length === 0) return { high: 0, low: 0, change: coinPrice?.change24h || 0 }

    const closes = data.map(d => d.close)
    const opens = data.map(d => d.open)
    const high = Math.max(...data.map(d => d.high))
    const low = Math.min(...data.map(d => d.low))
    const change = ((closes[closes.length - 1] - opens[0]) / opens[0]) * 100

    return { high, low, change }
  }, [data, coinPrice])

  const isPositive = stats.change >= 0

  return (
    <div className="glass-strong border border-[#3a3f5a] rounded-xl shadow-lg-custom h-full flex flex-col overflow-hidden">
      {/* Header */}
      <div className="border-b border-[#2a2e4a] px-6 py-4">
        <div className="flex items-end justify-between">
          <div>
            <h2 className="text-2xl font-bold text-[#e8eaf6] mb-1">{coin}/USD</h2>
            <p className="text-xs text-[#9fa3c1]">Live Price</p>
          </div>
          <div className="flex items-center gap-6">
            <div className="text-right">
              <p className="text-xs text-[#9fa3c1] mb-1">24h High</p>
              <p className="text-sm font-mono font-bold text-[#e8eaf6]">${stats.high.toFixed(2)}</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-[#9fa3c1] mb-1">24h Low</p>
              <p className="text-sm font-mono font-bold text-[#e8eaf6]">${stats.low.toFixed(2)}</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-[#9fa3c1] mb-1">24h Change</p>
              <p className={`text-sm font-mono font-bold ${isPositive ? 'text-[#39ff14]' : 'text-[#ff3d5a]'}`}>
                {isPositive ? '+' : ''}{stats.change.toFixed(2)}%
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="flex-1 overflow-hidden gradient-cyan-lime">
        <CandlestickChart data={data} />
      </div>

      {/* Time Frame Selector */}
      <div className="border-t border-[#2a2e4a] px-6 py-3 flex gap-3">
        {['1h', '4h', '1d', '1w', '1m'].map((tf) => (
          <button
            key={tf}
            className={`px-3 py-1 rounded text-xs font-bold transition-all ${
              tf === '1d'
                ? 'bg-[#00d9ff] text-[#0a0e27]'
                : 'text-[#9fa3c1] hover:text-[#e8eaf6]'
            }`}
          >
            {tf}
          </button>
        ))}
      </div>
    </div>
  )
}