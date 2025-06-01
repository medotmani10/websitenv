import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="text-9xl font-bold text-red-500 mb-4">404</div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">الصفحة غير موجودة</h1>
        <p className="text-xl text-gray-600 mb-8">عذراً، الصفحة التي تبحث عنها غير موجودة.</p>
        <Link 
          href="/" 
          className="bg-red-500 text-white px-8 py-3 rounded-full hover:bg-red-600 transition-colors font-semibold"
        >
          العودة إلى الرئيسية
        </Link>
      </div>
    </div>
  )
}
