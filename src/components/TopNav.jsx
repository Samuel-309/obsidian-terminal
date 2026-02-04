import React from 'react'

export default function TopNav({ portfolioValue, change24h, loading }) {
  const isPositive = change24h >= 0

  return (
    <div className="glass-strong border-b border-[#2a2e4a] px-6 py-4 flex items-center justify-between">
      {/* Logo/Branding */}
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#00d9ff] to-[#39ff14] flex items-center justify-center font-mono text-xs font-bold text-[#0a0e27]">
          CV
        </div>
        <h1 className="text-lg font-bold text-[#e8eaf6]">CryptoVault</h1>
      </div>

      {/* Portfolio Stats */}
      <div className="flex items-center gap-8">
        <div className="text-right">
          <p className="text-xs text-[#9fa3c1] mb-1">Portfolio Value</p>
          <p className="text-2xl font-bold text-[#e8eaf6] font-mono">
            ${portfolioValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </p>
        </div>

        <div className="w-px h-12 bg-[#3a3f5a]"></div>

        <div className="text-right">
          <p className="text-xs text-[#9fa3c1] mb-1">24h Change</p>
          <div className="flex items-center gap-2">
            <p className={`text-2xl font-bold font-mono ${isPositive ? 'text-[#39ff14]' : 'text-[#ff3d5a]'}`}>
              {isPositive ? '+' : ''}{change24h.toFixed(2)}%
            </p>
            <svg
              className={`w-5 h-5 ${isPositive ? 'text-[#39ff14]' : 'text-[#ff3d5a]'} ${isPositive ? '' : 'transform rotate-180'}`}
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V9.414l-4.293 4.293a1 1 0 01-1.414-1.414L13.586 8H12z" clipRule="evenodd" />
            </svg>
          </div>
        </div>
      </div>

      {/* Settings/Menu */}
      <button className="hover-glow p-2 rounded-lg border border-[#3a3f5a] text-[#9fa3c1] hover:text-[#00d9ff]">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5A2.25 2.25 0 008.25 22.5h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-4 0v3m4-3v3m-9 8h14m-7 4v4m0-4v-2" />
        </svg>
      </button>
    </div>
  )
}