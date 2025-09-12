import React, { useState } from 'react'
import TopBar from '../components/TopBar'
import GlassCard from '../components/GlassCard'

export default function AddAssignment() {
  const [title, setTitle] = useState('')
  const [instructions, setInstructions] = useState('')
  const [assignDate, setAssignDate] = useState('')
  const [dueDate, setDueDate] = useState('')
  const [file, setFile] = useState(null)

  const handleFileChange = (e) => {
    setFile(e.target.files[0] || null)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!title.trim()) {
      alert('Title is required')
      return
    }

    // Later connect with backend / database
    console.log({
      title,
      instructions,
      assignDate,
      dueDate,
      file,
    })
    alert('Assignment created successfully!')
  }

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/images/background.jpg')" }}
    >
      <TopBar />

      <main className="p-6 md:p-8 lg:p-10 flex justify-center">
        <GlassCard className="w-full max-w-5xl p-8 md:p-10">
          <h2 className="text-2xl font-semibold text-black mb-6">New Assignment</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-black mb-2">
                Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="w-full rounded-md border border-gray-300 bg-white/80 px-4 py-2 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Enter assignment title"
              />
            </div>

            {/* Instructions */}
            <div>
              <label className="block text-sm font-medium text-black mb-2">
                Instructions (optional)
              </label>
              <textarea
                value={instructions}
                onChange={(e) => setInstructions(e.target.value)}
                rows={5}
                className="w-full rounded-md border border-gray-300 bg-white/80 px-4 py-2 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
                placeholder="Add assignment details..."
              />
            </div>

            {/* Attach + Dates */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Attach File */}
              <div className="flex flex-col items-center justify-center rounded-lg border border-gray-300 bg-white/70 p-6">
                <label className="mb-2 text-sm font-medium text-black">
                  Attach file
                </label>
                <input
                  id="file-upload"
                  type="file"
                  onChange={handleFileChange}
                  className="hidden"
                />
                <label
                  htmlFor="file-upload"
                  className="cursor-pointer rounded-full bg-gray-200 px-4 py-2 text-sm font-medium text-black hover:bg-gray-300"
                >
                  {file ? 'Change File' : 'Upload'}
                </label>
                {file && (
                  <p className="mt-2 text-xs text-gray-700 truncate max-w-[180px]">
                    {file.name}
                  </p>
                )}
              </div>

              {/* Assign Date */}
              <div>
                <label className="block text-sm font-medium text-black mb-2">
                  Assigned Date
                </label>
                <input
                  type="date"
                  value={assignDate}
                  onChange={(e) => setAssignDate(e.target.value)}
                  className="w-full rounded-md border border-gray-300 bg-white/80 px-4 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>

              {/* Due Date */}
              <div>
                <label className="block text-sm font-medium text-black mb-2">
                  Due Date
                </label>
                <input
                  type="date"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  className="w-full rounded-md border border-gray-300 bg-white/80 px-4 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
            </div>

            {/* Buttons */}
            <div className="flex gap-4 pt-4">
              <button
                type="submit"
                className="rounded-full bg-[#2EA7FF] px-6 py-2.5 font-medium text-white hover:bg-[#1798fb] active:scale-[0.98]"
              >
                Create
              </button>
              <button
                type="button"
                onClick={() => window.history.back()}
                className="rounded-full bg-gray-400 px-6 py-2.5 font-medium text-white hover:bg-gray-500 active:scale-[0.98]"
              >
                Cancel
              </button>
            </div>
          </form>
        </GlassCard>
      </main>
    </div>
  )
}
