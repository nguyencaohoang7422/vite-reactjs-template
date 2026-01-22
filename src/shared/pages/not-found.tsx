import { useNavigate } from 'react-router-dom';
const PageNotFound = () => {
  const navigate = useNavigate();
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-linear-to-br from-purple-900 via-blue-900 to-black">
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="animate-blob absolute top-0 left-0 h-96 w-96 rounded-full bg-purple-500 opacity-20 mix-blend-multiply blur-3xl filter"></div>
        <div className="animate-blob animation-delay-2000 absolute top-0 right-0 h-96 w-96 rounded-full bg-blue-500 opacity-20 mix-blend-multiply blur-3xl filter"></div>
        <div className="animate-blob animation-delay-4000 absolute bottom-0 left-1/2 h-96 w-96 rounded-full bg-pink-500 opacity-20 mix-blend-multiply blur-3xl filter"></div>
      </div>

      {/* Main content */}
      <div className="relative z-10 px-4 text-center">
        {/* 3D Radiant 404 Text */}
        <div className="relative inline-block">
          <h1 className="animate-gradient-x bg-linear-to-r from-purple-400 via-pink-500 to-blue-500 bg-clip-text text-9xl font-black text-transparent drop-shadow-2xl md:text-[200px]">
            404
          </h1>
          <div className="absolute inset-0 animate-pulse bg-linear-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-9xl font-black text-transparent opacity-50 blur-2xl md:text-[200px]">
            404
          </div>
        </div>

        {/* Subtitle */}
        <h2 className="mt-8 mb-4 text-2xl font-bold tracking-wide text-white md:text-4xl">Trang Không Tồn Tại</h2>
        <p className="mx-auto mb-8 text-lg text-gray-300 md:text-xl">
          Rất tiếc, trang bạn đang tìm kiếm không thể được tìm thấy.
        </p>

        {/* Button */}
        <button
          type="button"
          onClick={() => navigate('/')}
          className="group relative overflow-hidden rounded-full bg-linear-to-r from-purple-500 to-blue-500 px-8 py-4 font-semibold text-white transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/50"
        >
          <span className="relative z-10">Về Trang Chủ</span>
          <div className="absolute inset-0 bg-linear-to-r from-blue-500 to-purple-500 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
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
  );
};

export default PageNotFound;
