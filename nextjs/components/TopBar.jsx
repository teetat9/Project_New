import Image from 'next/image'
import React from 'react'

export default function TopBar() {
  return (
    <header className="w-full bg-neutral-300/60 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3">
        <div className="flex items-center gap-3">
          <Image src="/images/logo_alone.png" alt="Logo" width={30} height={30} />
          <span className="text-[22px] font-bold text-black">Dashboard</span>
        </div>
        <div className="flex items-center gap-4">
          {/* Bell icon (inline SVG to avoid deps) */}
          <button
                    className="rounded-full p-2 hover:bg-neutral-100"
                    title="Notifications"
                    >
                <img
                    src="/logo/bell.png"  // ไฟล์ของคุณ
                    alt="Notifications"
                    className="h-5 w-5"
                />
            </button>

          <button className="rounded-full bg-white/80 px-4 py-1 text-sm font-medium text-gray-800 shadow-sm hover:bg-white">
            Log Out
          </button>
        </div>
      </div>
    </header>
  )
}
