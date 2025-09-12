import React from 'react'
import clsx from 'clsx'

export default function GlassCard({ children, className }) {
  return (
    <div
      className={clsx(
        'rounded-[26px] bg-white/45 backdrop-blur-xl',
        'shadow-[inset_0_1px_0_rgba(255,255,255,.55),0_18px_50px_rgba(0,0,0,.18)]',
        'border border-white/40',
        className
      )}
    >
      {children}
    </div>
  )
}
