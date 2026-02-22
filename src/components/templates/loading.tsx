export default function Loading() {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-50">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-gray-600 text-lg font-medium">در حال بارگذاری...</p>
      </div>
    </div>
  );
}
