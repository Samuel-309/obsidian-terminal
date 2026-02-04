import React, { useState, useEffect } from 'react'

export default function OrderBook({ coin, basePrice }) {
  const [orderBook, setOrderBook] = useState(() => generateOrderBook(basePrice || 42500))

  useEffect(() => {
    const interval = setInterval(() => {
      setOrderBook(generateOrderBook(basePrice || 42500))
    }, 800)
    return () => clearInterval(interval)
  }, [coin, basePrice])

  const maxAskVolume = Math.max(...orderBook.asks.map(o => o.volume))
  const maxBidVolume = Math.max(...orderBook.bids.map(o => o.volume))
  const spread = orderBook.asks[0].price - orderBook.bids[0].price
  const spreadPercent = (spread / orderBook.bids[0].price) * 100

  return (
    <div className="glass-strong border border-[#3a3f5a] rounded-xl shadow-lg-custom h-full flex flex-col overflow-hidden">
      {/* Header */}
      <div className="border-b border-[#2a2e4a] px-4 py-3">
        <h3 className="text-sm font-bold text-[#e8eaf6] mb-2">Order Book</h3>
        <div className="text-xs text-[#9fa3c1]">
          Spread: <span className="text-[#00d9ff] font-mono">${spread.toFixed(2)}</span>
          {' '}
          <span className="text-[#9fa3c1]">({spreadPercent.toFixed(3)}%)</span>
        </div>
      </div>

      {/* Asks Section */}
      <div className="flex-1 overflow-y-auto border-b border-[#2a2e4a]">
        <div className="px-4 py-2 bg-[#ff3d5a]/5 border-b border-[#2a2e4a]">
          <div className="grid grid-cols-3 gap-2 text-xs font-bold text-[#9fa3c1]">
            <div>Price</div>
            <div className="text-right">Size</div>
            <div className="text-right">Total</div>
          </div>
        </div>
        <div className="space-y-0">
          {orderBook.asks.map((order, i) => {
            const volumePercent = (order.volume / maxAskVolume) * 100
            return (
              <div
                key={`ask-${i}`}
                className="px-4 py-2 relative group cursor-pointer transition-all hover:bg-[#ff3d5a]/5"
              >
                <div
                  className="absolute inset-0 bg-gradient-to-r from-[#ff3d5a]/20 to-[#ff3d5a]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                  style={{ width: `${volumePercent}%` }}
                ></div>
                <div className="relative grid grid-cols-3 gap-2 text-xs">
                  <div className="font-mono font-bold text-[#ff3d5a]">${order.price.toFixed(2)}</div>
                  <div className="text-right font-mono text-[#9fa3c1]">{(order.volume / 1000).toFixed(2)}k</div>
                  <div className="text-right font-mono text-[#e8eaf6]">${(order.price * order.volume / 1000000).toFixed(1)}m</div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Bids Section */}
      <div className="flex-1 overflow-y-auto">
        <div className="px-4 py-2 bg-[#39ff14]/5 border-b border-[#2a2e4a]">
          <div className="grid grid-cols-3 gap-2 text-xs font-bold text-[#9fa3c1]">
            <div>Price</div>
            <div className="text-right">Size</div>
            <div className="text-right">Total</div>
          </div>
        </div>
        <div className="space-y-0">
          {orderBook.bids.map((order, i) => {
            const volumePercent = (order.volume / maxBidVolume) * 100
            return (
              <div
                key={`bid-${i}`}
                className="px-4 py-2 relative group cursor-pointer transition-all hover:bg-[#39ff14]/5"
              >
                <div
                  className="absolute inset-0 bg-gradient-to-r from-[#39ff14]/20 to-[#39ff14]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                  style={{ width: `${volumePercent}%` }}
                ></div>
                <div className="relative grid grid-cols-3 gap-2 text-xs">
                  <div className="font-mono font-bold text-[#39ff14]">${order.price.toFixed(2)}</div>
                  <div className="text-right font-mono text-[#9fa3c1]">{(order.volume / 1000).toFixed(2)}k</div>
                  <div className="text-right font-mono text-[#e8eaf6]">${(order.price * order.volume / 1000000).toFixed(1)}m</div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

function generateOrderBook(basePrice = 42500) {
  const spread = basePrice * 0.001 // 0.1% spread
  const asks = Array.from({ length: 8 }, (_, i) => ({
    price: basePrice + (i + 1) * (spread / 8) + Math.random() * (spread / 20),
    volume: Math.floor(Math.random() * 500000 + 100000)
  }))

  const bids = Array.from({ length: 8 }, (_, i) => ({
    price: basePrice - (i + 1) * (spread / 8) - Math.random() * (spread / 20),
    volume: Math.floor(Math.random() * 500000 + 100000)
  }))

  return { asks, bids }
}