import Link from 'next/link'
import Image from 'next/image'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-cover bg-center bg-no-repeat flex items-center justify-center relative" style={{ backgroundImage: "url('/images/background.jpg')" }}>
      <div className="absolute inset-0 bg-black/40 z-0" />

      <div className="z-10 text-white px-6 py-10 max-w-5xl w-full mx-auto flex flex-col md:flex-row items-center justify-between gap-8 backdrop-blur-md bg-white/10 rounded-3xl shadow-xl">
        
        {/* Left Section */}
        <div className="flex-1">
          <div className="flex items-center mb-6">
            <Image src="/images/logo_alone.png" alt="Logo" width={50} height={50} />
            <h1 className="text-4xl font-bold ml-4 drop-shadow">ClassMate</h1>
          </div>

          <p className="text-lg md:text-xl mb-6 drop-shadow">
            A student-only platform to create and join classrooms,
            share work, and collaborate without teachers.
          </p>

          <div className="flex gap-4">
            <Link href="/register">
              <button className="bg-white text-black px-6 py-2 rounded-full font-semibold hover:bg-gray-200 transition">
                Get Started
              </button>
            </Link>

            <Link href="/login">
              <button className="bg-transparent border border-white px-6 py-2 rounded-full font-semibold hover:bg-white hover:text-black transition">
                Log In
              </button>
            </Link>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex-1 hidden md:block">
          <Image
            src="/images/dashboard-preview.png"
            alt="Dashboard preview"
            width={500}
            height={400}
            className="rounded-xl shadow-lg"
          />
        </div>
      </div>
    </div>
  )
}
