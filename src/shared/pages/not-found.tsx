import { useNavigate } from "react-router-dom";
const PageNotFound = () => {
  const navigate = useNavigate();
  return (
     <div className="min-h-screen bg-linear-to-br from-purple-900 via-blue-900 to-black flex items-center justify-center overflow-hidden relative">
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob top-0 left-0"></div>
        <div className="absolute w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000 top-0 right-0"></div>
        <div className="absolute w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000 bottom-0 left-1/2"></div>
      </div>

      {/* Main content */}
      <div className="relative z-10 text-center px-4">
        {/* 3D Radiant 404 Text */}
        <div className="relative inline-block">
          <h1 className="text-9xl md:text-[200px] font-black text-transparent bg-clip-text bg-linear-to-r from-purple-400 via-pink-500 to-blue-500 animate-gradient-x drop-shadow-2xl">
            404
          </h1>
          <div className="absolute inset-0 text-9xl md:text-[200px] font-black text-transparent bg-clip-text bg-linear-to-r from-blue-400 via-purple-500 to-pink-500 blur-2xl opacity-50 animate-pulse">
            404
          </div>
        </div>

        {/* Subtitle */}
        <h2 className="text-2xl md:text-4xl font-bold text-white mt-8 mb-4 tracking-wide">
          Trang Không Tồn Tại
        </h2>
        <p className="text-gray-300 text-lg md:text-xl mb-8 mx-auto">
          Rất tiếc, trang bạn đang tìm kiếm không thể được tìm thấy.
        </p>

        {/* Button */}
        <button 
          type="button"
          onClick={()=>navigate('/')}
          className="group relative px-8 py-4 bg-linear-to-r from-purple-500 to-blue-500 text-white font-semibold rounded-full overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/50">
          <span className="relative z-10">Về   Trang Chủ</span>
          <div className="absolute inset-0 bg-linear-to-r from-blue-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </button>
      </div>

      {/* Custom animations in Tailwind config */}
      <style>{`
        @keyframes gradient-x {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
        @keyframes blob {
          0%, 100% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
        }
        .animate-gradient-x {
          animation: gradient-x 3s ease infinite;
          background-size: 200% 200%;
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  )
}

export default PageNotFound