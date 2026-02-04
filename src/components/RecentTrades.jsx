import React, { useState, useEffect } from 'react'

const initialTrades = [
  { id: 1, coin: 'BTC', price: 42850.50, amount: 0.245, total: 10496.37, side: 'buy', time: '14:23:45' },
  { id: 2, coin: 'ETH', price: 2245.80, amount: 5.120, total: 11498.74, side: 'sell', time: '14:23:42' },
  { id: 3, coin: 'SOL', price: 98.45, amount: 125.50, total: 12348.98, side: 'buy', time: '14:23:39' },
  { id: 4, coin: 'BTC', price: 42825.00, amount: 0.150, total: 6423.75, side: 'sell', time: '14:23:36' },
  { id: 5, coin: 'ETH', price: 2242.60, amount: 2.500, total: 5606.50, side: 'buy', time: '14:23:33' },
  { id: 6, coin: 'XRP', price: 2.10, amount: 4750.00, total: 9975.00, side: 'buy', time: '14:23:30' },
  { id: 7, coin: 'SOL', price: 98.80, amount: 200.00, total: 19760.00, side: 'sell', time: '14:23:27' },
  { id: 8, coin: 'ADA', price: 0.78, amount: 5000.00, total: 3900.00, side: 'buy', time: '14:23:24' },
]

export default function RecentTrades({ coinPrices }) {
  const [trades, setTrades] = useState(initialTrades)
  const [highlightedId, setHighlightedId] = useState(null)

  useEffect(() => {
    const interval = setInterval(() => {
      const coinList = ['BTC', 'ETH', 'SOL', 'XRP', 'ADA']
      const selectedCoin = coinList[Math.floor(Math.random() * coinList.length)]
      const basePrice = coinPrices?.[selectedCoin]?.price || (1000 + Math.random() * 50000)
      
      const newTrade = {
        id: Math.random(),
        coin: selectedCoin,
        price: basePrice + (Math.random() - 0.5) * (basePrice * 0.01),
        amount: Math.random() * 500,
        total: 0,
        side: Math.random() > 0.5 ? 'buy' : 'sell',
        time: new Date().toLocaleTimeString('en-US', { hour12: false })
      }
      newTrade.total = newTrade.price * newTrade.amount

      setTrades(prev => [newTrade, ...prev.slice(0, 7)])
      setHighlightedId(newTrade.id)

      setTimeout(() => setHighlightedId(null), 1000)
    }, 2500)

    return () => clearInterval(interval)
  }, [coinPrices])

  return (
    <div className="glass-strong border border-[#3a3f5a] rounded-xl shadow-lg-custom h-full flex flex-col overflow-hidden">
      {/* Header */}
      <div className="border-b border-[#2a2e4a] px-6 py-4">
        <h3 className="text-lg font-bold text-[#e8eaf6]">Recent Trades</h3>
        <p className="text-xs text-[#9fa3c1] mt-1">Live order flow</p>
      </div>

      {/* Table */}
      <div className="flex-1 overflow-y-auto">
        <table className="w-full">
          <thead className="sticky top-0 bg-[#0a0e27]/80 backdrop-blur border-b border-[#2a2e4a]">
            <tr className="text-xs font-bold text-[#9fa3c1] uppercase tracking-wider">
              <th className="px-6 py-3 text-left">Time</th>
              <th className="px-6 py-3 text-left">Coin</th>
              <th className="px-6 py-3 text-right">Price</th>
              <th className="px-6 py-3 text-right">Amount</th>
              <th className="px-6 py-3 text-right">Total</th>
              <th className="px-6 py-3 text-center">Side</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#2a2e4a]">
            {trades.map((trade) => (
              <tr
                key={trade.id}
                className={`group transition-all cursor-pointer ${
                  highlightedId === trade.id ? 'data-update bg-[#39ff14]/15' : 'hover:bg-[#1a1f3a] transition-colors duration-150'
                }`}
              >
                <td className="px-6 py-4 text-xs font-mono text-[#9fa3c1] group-hover:text-[#e8eaf6]">
                  {trade.time}
                </td>
                <td className="px-6 py-4 text-sm font-bold text-[#e8eaf6]">
                  {trade.coin}
                </td>
                <td className="px-6 py-4 text-right font-mono text-sm text-[#e8eaf6]">
                  ${trade.price.toFixed(2)}
                </td>
                <td className="px-6 py-4 text-right font-mono text-sm text-[#9fa3c1] group-hover:text-[#e8eaf6]">
                  {trade.amount.toFixed(3)}
                </td>
                <td className="px-6 py-4 text-right font-mono text-sm font-bold text-[#e8eaf6]">
                  ${trade.total.toFixed(2)}
                </td>
                <td className="px-6 py-4 text-center">
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                      trade.side === 'buy'
                        ? 'bg-[#39ff14]/20 text-[#39ff14]'
                        : 'bg-[#ff3d5a]/20 text-[#ff3d5a]'
                    }`}
                  >
                    {trade.side}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="border-t border-[#2a2e4a] px-6 py-3 text-xs text-[#9fa3c1]">
        Showing 8 most recent trades • Auto-refresh every 2.5s
      </div>
    </div>
  )
}