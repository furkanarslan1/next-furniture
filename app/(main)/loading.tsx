"use client";
export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gray-100">
      {/* Top Progress Bar */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gray-200 overflow-hidden">
        <div className="h-full bg-amber-400 animate-progress-bar" />
      </div>

      {/* Brand Logo */}
      <div className="flex items-center gap-1 text-2xl animate-fade-in-up">
        <span className="font-extrabold bg-gray-700 text-white px-4 py-2 rounded-r-2xl">
          Next
        </span>
        <span className="text-gray-700 font-medium">Furniture</span>
      </div>

      {/* Loading Text */}
      <p className="mt-4 text-gray-500 text-sm tracking-widest uppercase animate-pulse">
        Loading
      </p>

      <style jsx>{`
        @keyframes progress-bar {
          0% {
            width: 0%;
            margin-left: 0%;
          }
          50% {
            width: 40%;
            margin-left: 30%;
          }
          100% {
            width: 0%;
            margin-left: 100%;
          }
        }
        @keyframes fade-in-up {
          0% {
            opacity: 0;
            transform: translateY(10px) scale(0.95);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        .animate-progress-bar {
          animation: progress-bar 1.5s ease-in-out infinite;
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out forwards;
        }
      `}</style>
    </div>
  );
}
