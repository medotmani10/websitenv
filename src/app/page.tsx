import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">🏠 كراء المنازل</h1>
            </div>
            <nav className="hidden md:flex space-x-8">
              <Link href="/" className="text-gray-900 hover:text-blue-600">الرئيسية</Link>
              <Link href="/properties" className="text-gray-700 hover:text-blue-600">المنازل</Link>
              <Link href="/about" className="text-gray-700 hover:text-blue-600">من نحن</Link>
              <Link href="/contact" className="text-gray-700 hover:text-blue-600">اتصل بنا</Link>
            </nav>
            <div className="flex items-center space-x-4">
              <Link href="/admin" className="text-gray-600 hover:text-gray-800 text-sm">
                إدارة
              </Link>
              <a href="tel:+212600000000" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                📞 اتصل الآن
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              اعثر على منزل أحلامك
            </h2>
            <p className="text-xl md:text-2xl mb-8 text-blue-100">
              مجموعة واسعة من المنازل المتاحة للكراء في أفضل المواقع
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/properties" className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                تصفح المنازل
              </Link>
              <a href="tel:+212600000000" className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors">
                📞 اتصل للحجز
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">لماذا تختارنا؟</h3>
            <p className="text-lg text-gray-600">نقدم أفضل الخدمات في مجال كراء المنازل</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-white rounded-lg shadow-md">
              <div className="text-4xl mb-4">🏡</div>
              <h4 className="text-xl font-semibold mb-2">منازل متنوعة</h4>
              <p className="text-gray-600">مجموعة واسعة من المنازل في مختلف المناطق والأحجام</p>
            </div>
            <div className="text-center p-6 bg-white rounded-lg shadow-md">
              <div className="text-4xl mb-4">📞</div>
              <h4 className="text-xl font-semibold mb-2">حجز سهل بالهاتف</h4>
              <p className="text-gray-600">احجز منزلك بمكالمة هاتفية واحدة - لا حاجة لنماذج معقدة</p>
            </div>
            <div className="text-center p-6 bg-white rounded-lg shadow-md">
              <div className="text-4xl mb-4">⭐</div>
              <h4 className="text-xl font-semibold mb-2">خدمة ممتازة</h4>
              <p className="text-gray-600">فريق محترف يساعدك في العثور على المنزل المثالي</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-3xl font-bold mb-4">جاهز للعثور على منزلك الجديد؟</h3>
          <p className="text-xl mb-8 text-gray-300">اتصل بنا الآن وسنساعدك في العثور على المنزل المثالي</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="tel:+212600000000" className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors inline-flex items-center justify-center">
              📞 +212 6 00 00 00 00
            </a>
            <a href="tel:+212700000000" className="bg-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors inline-flex items-center justify-center">
              📱 +212 7 00 00 00 00
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-gray-600">
            <p>&copy; 2024 كراء المنازل. جميع الحقوق محفوظة.</p>
            <p className="mt-2">للحجز والاستفسار: 📞 +212 6 00 00 00 00</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
