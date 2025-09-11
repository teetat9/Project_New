import LoginForm from '../components/LoginForm';

export default function LoginPage() {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: "url('/images/background.jpg')" }}
    >
      {/* Logo outside the box */}
      <div className="mb-2">
        <img src="/images/logo.png" alt="Logo" className="h-44 w-auto" />
      </div>

      {/* Login box with liquid glass effect */}
      <div className="bg-white/5 backdrop-blur-md border border-white/20 p-10 rounded-2xl shadow-xl w-full max-w-[900px] min-h-[600px] flex flex-col justify-center">
        <h1 className="text-4xl font-bold text-center mb-16 -mt-4">
            Welcome to Login page
        </h1>
        <LoginForm />
      </div>
    </div>
  );
}
