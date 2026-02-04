import React, { useMemo, useState } from 'react'

export default function CandlestickChart({ data }) {
  const [hoveredCandle, setHoveredCandle] = useState(null)
  const chartDimensions = useMemo(() => {
    if (!data || data.length === 0) return { width: 800, height: 400, padding: 40 }

    const prices = data.flatMap(d => [d.high, d.low])
    const minPrice = Math.min(...prices)
    const maxPrice = Math.max(...prices)
    const range = maxPrice - minPrice || 1

    return {
      width: 1000,
      height: 400,
      padding: 40,
      minPrice,
      maxPrice,
      range
    }
  }, [data])

  const candlesticks = useMemo(() => {
    if (!data || data.length === 0) return []

    const { width, height, padding, minPrice, range } = chartDimensions
    const candleWidth = (width - 2 * padding) / data.length - 2
    const priceToY = (price) => padding + (1 - (price - minPrice) / range) * (height - 2 * padding)

    return data.map((candle, i) => {
      const x = padding + (i * (width - 2 * padding)) / data.length + candleWidth / 2
      const open = candle.open
      const close = candle.close
      const high = candle.high
      const low = candle.low

      const isGain = close >= open
      const color = isGain ? '#39ff14' : '#ff3d5a'
      const bodyTop = priceToY(Math.max(open, close))
      const bodyBottom = priceToY(Math.min(open, close))
      const wickTop = priceToY(high)
      const wickBottom = priceToY(low)

      return {
        x,
        wickTop,
        wickBottom,
        bodyTop,
        bodyBottom,
        color,
        isGain,
        candleWidth
      }
    })
  }, [data, chartDimensions])

  const { width, height } = chartDimensions

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className="w-full h-full"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <linearGradient id="chartBg" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="rgba(0, 217, 255, 0.05)" />
          <stop offset="100%" stopColor="rgba(57, 255, 20, 0.05)" />
        </linearGradient>
      </defs>

      {/* Background */}
      <rect width={width} height={height} fill="url(#chartBg)" />

      {/* Grid Lines */}
      {Array.from({ length: 5 }).map((_, i) => (
        <line
          key={`gridline-${i}`}
          x1={chartDimensions.padding}
          y1={(chartDimensions.height / 5) * (i + 1)}
          x2={width - chartDimensions.padding}
          y2={(chartDimensions.height / 5) * (i + 1)}
          stroke="rgba(42, 46, 74, 0.3)"
          strokeWidth="1"
          strokeDasharray="4,4"
        />
      ))}

      {/* Candlesticks */}
      {candlesticks.map((candle, i) => (
        <g key={`candle-${i}`} className="group">
          {/* Wick */}
          <line
            x1={candle.x}
            y1={candle.wickTop}
            x2={candle.x}
            y2={candle.wickBottom}
            stroke={candle.color}
            strokeWidth="1"
            opacity="0.6"
          />

          {/* Body */}
          <rect
            x={candle.x - candle.candleWidth / 2}
            y={Math.min(candle.bodyTop, candle.bodyBottom)}
            width={candle.candleWidth}
            height={Math.abs(candle.bodyBottom - candle.bodyTop) || 1}
            fill={candle.color}
            opacity="0.8"
            className="group-hover:opacity-100 transition-opacity"
          />

          {/* Hover Glow */}
          <rect
            x={candle.x - candle.candleWidth / 2 - 4}
            y={candle.wickTop - 4}
            width={candle.candleWidth + 8}
            height={candle.wickBottom - candle.wickTop + 8}
            fill="none"
            stroke={candle.color}
            strokeWidth="2"
            opacity={hoveredCandle === i ? "0.5" : "0"}
            className="transition-opacity duration-200 pointer-events-none"
            rx="2"
            onMouseEnter={() => setHoveredCandle(i)}
            onMouseLeave={() => setHoveredCandle(null)}
          />
        </g>
      ))}
    </svg>
  )
}