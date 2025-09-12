import React, { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import TopBar from '../components/TopBar'
import GlassCard from '../components/GlassCard'
import * as classroomService from '../lib/classroomService'

export default function Dashboard() {
  const userId = 'guest'
  const [classrooms, setClassrooms] = useState([])
  const [loading, setLoading] = useState(true)

  const [newRoomName, setNewRoomName] = useState('')
  const [joinCode, setJoinCode] = useState('')
  const [error, setError] = useState(null)

  const [showAll, setShowAll] = useState(false)

  useEffect(() => {
    let mounted = true

    async function bootstrap() {
      const rooms = await classroomService.getUserClassrooms(userId)

      // Seed demo rooms once if empty (local mock only)
      if (rooms.length === 0) {
        const seed = [
          'Adv_compro',
          'Algorithm',
          'Physics Lab',
          'History Notes',
          'Chemistry',
          'Math Club',
          'Biology',
          'Art Board',
        ]
        for (const name of seed) await classroomService.createClassroom(userId, name)
      }

      const after = await classroomService.getUserClassrooms(userId)
      if (mounted) {
        setClassrooms(after)
        setLoading(false)
      }
    }

    bootstrap()
    return () => { mounted = false }
  }, [userId])

  const handleCreate = async (e) => {
    e.preventDefault()
    setError(null)
    if (!newRoomName.trim()) return
    const created = await classroomService.createClassroom(userId, newRoomName.trim())
    setClassrooms((prev) => [...prev, created])
    setNewRoomName('')
  }

  const handleJoin = async (e) => {
    e.preventDefault()
    setError(null)
    if (!joinCode.trim()) return
    try {
      const joined = await classroomService.joinClassroom(userId, joinCode.trim())
      setClassrooms((prev) => prev.find((r) => r.id === joined.id) ? prev : [...prev, joined])
      setJoinCode('')
    } catch (err) {
      setError(err.message || 'Failed to join classroom')
    }
  }

  // Show up to 6 on the main grid
  const gridItems = useMemo(() => {
    const maxSlots = 6
    const items = [...classrooms.slice(0, maxSlots)]
    while (items.length < maxSlots) items.push(null)
    return items
  }, [classrooms])

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/images/background.jpg')" }}
    >
      <TopBar />

      {/* Fill the viewport height under the top bar */}
      <main className="p-6 md:p-8 lg:p-10 min-h-[calc(100vh-64px)]">
        {/* This wrapper is full-height; both columns will stretch */}
        <div className="mx-auto flex max-w-7xl gap-6 md:gap-8 lg:gap-10 h-full">
          {/* LEFT: Rooms panel fills available width & full height */}
          <GlassCard className="flex-1 p-6 md:p-8 flex flex-col h-full">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-[22px] font-semibold text-black">Your Room</h2>
              <button
                onClick={() => setShowAll(true)}
                className="rounded-full bg-black/80 px-4 py-1.5 text-sm font-medium text-white hover:bg-black"
              >
                View All
              </button>
            </div>

            {/* Grid expands inside the card; each box is clickable */}
            <div className="grid flex-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {loading
                ? Array.from({ length: 6 }).map((_, i) => (
                    <div
                      key={i}
                      className="h-40 md:h-44 lg:h-48 rounded-2xl bg-neutral-200/70 animate-pulse shadow-[inset_0_1px_0_rgba(255,255,255,.6)]"
                    />
                  ))
                : gridItems.map((room, idx) =>
                    room ? (
                      <Link
                        key={room.id}
                        href={`/classroom/${room.id}`}
                        className="relative h-40 md:h-44 lg:h-48 rounded-2xl bg-neutral-200/70 shadow-[inset_0_1px_0_rgba(255,255,255,.6)] ring-0 transition hover:shadow-lg hover:ring-2 hover:ring-black/10 focus:outline-none focus:ring-2 focus:ring-black/20"
                      >
                        <div className="absolute left-4 top-3 text-sm font-medium text-black/80">
                          {room.name}
                        </div>
                      </Link>
                    ) : (
                      <div
                        key={`empty-${idx}`}
                        className="h-40 md:h-44 lg:h-48 rounded-2xl bg-neutral-200/70 shadow-[inset_0_1px_0_rgba(255,255,255,.6)]"
                      />
                    )
                  )}
            </div>
          </GlassCard>

          {/* RIGHT: Sidebar column that also fills full height */}
          <div className="flex w-full md:w-[340px] lg:w-[360px] flex-col gap-6 h-full">
            {/* Each card flexes to share the column height evenly */}
            <GlassCard className="flex-1 p-6 md:p-7 flex flex-col justify-center">
              <h3 className="mb-4 text-lg font-semibold text-black">Create Classroom</h3>
              <form onSubmit={handleCreate} className="space-y-4">
                <input
                  type="text"
                  placeholder="Class room’s name"
                  value={newRoomName}
                  onChange={(e) => setNewRoomName(e.target.value)}
                  className="w-full rounded-full border border-[#CFCFCF] bg-white/70 px-5 py-3 text-[15px] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-black/10"
                />
                <button
                  type="submit"
                  className="w-[130px] rounded-full bg-[#2EA7FF] px-5 py-2.5 font-medium text-white hover:bg-[#1798fb] active:scale-[0.99]"
                >
                  Create
                </button>
              </form>
            </GlassCard>

            <GlassCard className="flex-1 p-6 md:p-7 flex flex-col justify-center">
              <h3 className="mb-4 text-lg font-semibold text-black">Join Classroom</h3>
              {error && <p className="mb-2 text-sm text-red-600">{error}</p>}
              <form onSubmit={handleJoin} className="space-y-4">
                <input
                  type="text"
                  placeholder="Classroom code"
                  value={joinCode}
                  onChange={(e) => setJoinCode(e.target.value)}
                  className="w-full rounded-full border border-[#CFCFCF] bg-white/70 px-5 py-3 text-[15px] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-black/10"
                />
                <button
                  type="submit"
                  className="w-[110px] rounded-full bg-[#2EA7FF] px-5 py-2.5 font-medium text-white hover:bg-[#1798fb] active:scale-[0.99]"
                >
                  Join
                </button>
              </form>
            </GlassCard>
          </div>
        </div>
      </main>

      {/* View All Modal (scrollable, clickable rooms) */}
      {showAll && (
        <AllRoomsModal
          classrooms={classrooms}
          onClose={() => setShowAll(false)}
        />
      )}
    </div>
  )
}

/** ---------- Modal component ---------- */
function AllRoomsModal({ classrooms, onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />

      <div className="relative z-10 w-[95vw] max-w-5xl rounded-3xl bg-white/70 p-6 backdrop-blur-xl shadow-2xl flex flex-col">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-xl font-semibold text-black">All Classrooms</h3>
          <button
            onClick={onClose}
            className="rounded-full bg-black/80 px-4 py-1.5 text-sm font-medium text-white hover:bg-black"
          >
            Close
          </button>
        </div>

        <div
          className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 overflow-y-auto pr-2"
          style={{ maxHeight: '70vh' }}
        >
          {classrooms.length === 0 ? (
            <p className="text-gray-700">No classrooms yet.</p>
          ) : (
            classrooms.map((room) => (
              <Link
                href={`/classroom/${room.id}`}
                key={room.id}
                className="relative h-40 md:h-44 lg:h-48 rounded-2xl bg-neutral-200/70 shadow-[inset_0_1px_0_rgba(255,255,255,.6)] ring-0 transition hover:shadow-lg hover:ring-2 hover:ring-black/10"
              >
                <div className="absolute left-4 top-3 text-sm font-medium text-black/80">
                  {room.name}
                </div>
              </Link>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
