import Link from "next/link";

export default function Contact() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-8">
              <Link href="/" className="text-2xl font-bold text-red-500">بيتي</Link>
              <nav className="hidden md:flex space-x-8">
                <Link href="/" className="text-gray-700 hover:text-red-500">الرئيسية</Link>
                <Link href="/properties" className="text-gray-700 hover:text-red-500">جميع العقارات</Link>
                <Link href="/contact" className="text-red-500 hover:text-red-600 font-medium">اتصل بنا</Link>
                <Link href="/about" className="text-gray-700 hover:text-red-500">عن المنصة</Link>
              </nav>
            </div>
            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-600 hover:text-red-500">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                </svg>
              </button>
              <Link href="/admin" className="text-gray-600 hover:text-red-500 text-sm">إدارة</Link>
              <button className="bg-red-500 text-white px-6 py-2 rounded-full hover:bg-red-600 transition-colors">
                تسجيل الدخول
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Page Header */}
      <section className="bg-red-500 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">تواصل معنا</h1>
            <p className="text-xl text-red-100">نحن هنا لمساعدتك في العثور على عقار أحلامك</p>
          </div>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">

            {/* Contact Information */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-8">معلومات الاتصال</h2>

              <div className="space-y-6">
                <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                  <div className="flex items-center space-x-4">
                    <div className="text-4xl">📞</div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900">الهاتف الرئيسي</h3>
                      <a href="tel:+212600000000" className="text-red-500 hover:text-red-600 text-lg font-medium">
                        +212 6 00 00 00 00
                      </a>
                      <p className="text-gray-600 text-sm">متاح 24/7 للطوارئ</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                  <div className="flex items-center space-x-4">
                    <div className="text-4xl">📱</div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900">الهاتف الثانوي</h3>
                      <a href="tel:+212700000000" className="text-red-500 hover:text-red-600 text-lg font-medium">
                        +212 7 00 00 00 00
                      </a>
                      <p className="text-gray-600 text-sm">من السبت إلى الخميس: 9:00 - 18:00</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                  <div className="flex items-center space-x-4">
                    <div className="text-4xl">💬</div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900">واتساب</h3>
                      <a
                        href="https://wa.me/212600000000"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-green-500 hover:text-green-600 text-lg font-medium"
                      >
                        +212 6 00 00 00 00
                      </a>
                      <p className="text-gray-600 text-sm">للرسائل السريعة والصور</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                  <div className="flex items-center space-x-4">
                    <div className="text-4xl">📧</div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900">البريد الإلكتروني</h3>
                      <a href="mailto:info@beity.ma" className="text-red-500 hover:text-red-600 text-lg font-medium">
                        info@beity.ma
                      </a>
                      <p className="text-gray-600 text-sm">للاستفسارات العامة</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                  <div className="flex items-center space-x-4">
                    <div className="text-4xl">📍</div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900">العنوان</h3>
                      <p className="text-gray-700 text-lg">الدار البيضاء، المغرب</p>
                      <p className="text-gray-600 text-sm">نخدم جميع أنحاء المملكة</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Contact Actions */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-8">اتصل بنا الآن</h2>

              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-6">طرق التواصل السريع</h3>

                <div className="space-y-4">
                  <a
                    href="tel:+212600000000"
                    className="w-full bg-red-500 text-white py-4 px-6 rounded-xl hover:bg-red-600 transition-colors font-semibold text-lg flex items-center justify-center space-x-3"
                  >
                    <span>📞</span>
                    <span>اتصال مباشر - الخط الرئيسي</span>
                  </a>

                  <a
                    href="tel:+212700000000"
                    className="w-full bg-red-400 text-white py-4 px-6 rounded-xl hover:bg-red-500 transition-colors font-semibold text-lg flex items-center justify-center space-x-3"
                  >
                    <span>📱</span>
                    <span>اتصال مباشر - الخط الثانوي</span>
                  </a>

                  <a
                    href="https://wa.me/212600000000"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-green-500 text-white py-4 px-6 rounded-xl hover:bg-green-600 transition-colors font-semibold text-lg flex items-center justify-center space-x-3"
                  >
                    <span>💬</span>
                    <span>محادثة واتساب</span>
                  </a>
                </div>

                <div className="mt-8 p-6 bg-red-50 rounded-xl border-l-4 border-red-500">
                  <h4 className="font-semibold text-gray-900 mb-2">💡 نصيحة:</h4>
                  <p className="text-gray-700 text-sm">
                    للحصول على أسرع خدمة، اتصل بنا مباشرة. فريقنا جاهز لمساعدتك في العثور على العقار المثالي
                    وترتيب موعد للمعاينة في نفس اليوم.
                  </p>
                </div>
              </div>

              <div className="mt-8 bg-white rounded-2xl shadow-lg p-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-6">ساعات العمل</h3>

                <div className="space-y-4">
                  <div className="flex justify-between items-center py-3 px-4 bg-gray-50 rounded-lg">
                    <span className="font-medium text-gray-900">السبت - الخميس</span>
                    <span className="text-gray-700 font-medium">9:00 ص - 6:00 م</span>
                  </div>
                  <div className="flex justify-between items-center py-3 px-4 bg-gray-50 rounded-lg">
                    <span className="font-medium text-gray-900">الجمعة</span>
                    <span className="text-gray-700 font-medium">2:00 م - 6:00 م</span>
                  </div>
                  <div className="flex justify-between items-center py-3 px-4 bg-green-50 rounded-lg">
                    <span className="font-medium text-gray-900">الطوارئ</span>
                    <span className="text-green-600 font-bold">24/7</span>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                  <p className="text-yellow-800 text-sm">
                    <strong>ملاحظة:</strong> خدمة الطوارئ متاحة على مدار الساعة للعملاء الحاليين فقط.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="text-6xl mb-4">❓</div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">الأسئلة الشائعة</h2>
            <p className="text-gray-600">إجابات على أكثر الأسئلة شيوعاً</p>
          </div>

          <div className="space-y-6">
            <div className="bg-red-50 rounded-2xl p-6 border-l-4 border-red-500">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">كيف يمكنني حجز عقار؟</h3>
              <p className="text-gray-700 leading-relaxed">ببساطة اتصل بنا على أحد أرقام الهاتف المذكورة أعلاه. سيقوم فريقنا بفهم احتياجاتك وترتيب موعد للمعاينة.</p>
            </div>

            <div className="bg-gray-50 rounded-2xl p-6 border-l-4 border-gray-400">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">هل يمكنني الحجز عبر الإنترنت؟</h3>
              <p className="text-gray-700 leading-relaxed">نحن نؤمن بأهمية التواصل المباشر لضمان فهم احتياجاتك بدقة. لذلك نقدم خدمة الحجز بالهاتف فقط.</p>
            </div>

            <div className="bg-green-50 rounded-2xl p-6 border-l-4 border-green-500">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">ما هي تكلفة الخدمة؟</h3>
              <p className="text-gray-700 leading-relaxed">خدمة البحث والاستشارة مجانية تماماً. نحن نحصل على عمولة من مالك العقار عند إتمام الحجز.</p>
            </div>

            <div className="bg-blue-50 rounded-2xl p-6 border-l-4 border-blue-500">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">كم من الوقت يستغرق العثور على عقار مناسب؟</h3>
              <p className="text-gray-700 leading-relaxed">عادة ما نجد خيارات مناسبة في نفس اليوم. يمكننا ترتيب معاينات متعددة في يوم واحد لتوفير وقتك.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Company Info */}
            <div>
              <h3 className="text-2xl font-bold text-red-500 mb-4">بيتي</h3>
              <p className="text-gray-300 mb-4">
                منصة رائدة في مجال تأجير العقارات، نساعدك في العثور على منزل أحلامك بسهولة وأمان.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-semibold mb-4">روابط سريعة</h4>
              <ul className="space-y-2">
                <li><Link href="/" className="text-gray-300 hover:text-white">الرئيسية</Link></li>
                <li><Link href="/properties" className="text-gray-300 hover:text-white">جميع العقارات</Link></li>
                <li><Link href="/about" className="text-gray-300 hover:text-white">عن المنصة</Link></li>
                <li><Link href="/contact" className="text-gray-300 hover:text-white">اتصل بنا</Link></li>
              </ul>
            </div>

            {/* Services */}
            <div>
              <h4 className="text-lg font-semibold mb-4">خدماتنا</h4>
              <ul className="space-y-2">
                <li><span className="text-gray-300">تأجير الشقق</span></li>
                <li><span className="text-gray-300">تأجير الفيلل</span></li>
                <li><span className="text-gray-300">تأجير الاستوديوهات</span></li>
                <li><span className="text-gray-300">استشارات عقارية</span></li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="text-lg font-semibold mb-4">تواصل معنا</h4>
              <div className="space-y-2">
                <p className="text-gray-300">📞 +212 6 00 00 00 00</p>
                <p className="text-gray-300">📱 +212 7 00 00 00 00</p>
                <p className="text-gray-300">✉️ info@beity.ma</p>
                <p className="text-gray-300">📍 الدار البيضاء، المغرب</p>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center">
            <p className="text-gray-400">&copy; 2024 بيتي. جميع الحقوق محفوظة.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
