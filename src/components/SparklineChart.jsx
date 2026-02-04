import React from 'react'

export default function SparklineChart({ data, isPositive }) {
  if (!data || data.length === 0) return null

  const min = Math.min(...data)
  const max = Math.max(...data)
  const range = max - min || 1

  const points = data
    .map((value, i) => {
      const x = (i / (data.length - 1)) * 100
      const y = 100 - ((value - min) / range) * 100
      return `${x},${y}`
    })
    .join(' ')

  const color = isPositive ? '#39ff14' : '#ff3d5a'
  const fillColor = isPositive ? 'rgba(57, 255, 20, 0.1)' : 'rgba(255, 61, 90, 0.1)'

  return (
    <svg viewBox="0 0 100 40" className="w-full h-full" preserveAspectRatio="none">
      <defs>
        <linearGradient id={`sparkGradient-${isPositive}`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={color} stopOpacity="0.3" />
          <stop offset="100%" stopColor={color} stopOpacity="0.01" />
        </linearGradient>
      </defs>
      <polyline
        points={points}
        fill="none"
        stroke={color}
        strokeWidth="1.5"
        vectorEffect="non-scaling-stroke"
      />
      <polygon
        points={`0,40 ${points} 100,40`}
        fill={`url(#sparkGradient-${isPositive})`}
      />
    </svg>
  )
}