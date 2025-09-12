import Link from 'next/link'
import React from 'react'

/**
 * Props:
 * - id: string (used to build href `/classroom/[id]`)
 * - name: string
 * - className?: string
 */
export default function RoomCard({ id, name, className = '' }) {
  const href = `/classroom/${id}`

  return (
    <Link
      href={href}
      className={`group relative block rounded-2xl bg-neutral-200/70 shadow-[inset_0_1px_0_rgba(255,255,255,.6)] ring-0 transition hover:shadow-lg hover:ring-2 hover:ring-black/10 focus:outline-none focus:ring-2 focus:ring-black/20 ${className}`}
    >
      <div className="absolute left-4 top-3 text-sm font-medium text-black/80">
        {name}
      </div>

      {/* subtle hover overlay */}
      <div className="absolute inset-0 rounded-2xl bg-black/0 transition group-hover:bg-black/[.02]" />
    </Link>
  )
}
