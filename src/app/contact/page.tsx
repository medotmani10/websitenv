import Link from "next/link";

export default function Contact() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <Link href="/" className="text-2xl font-bold text-gray-900">🏠 كراء المنازل</Link>
            </div>
            <nav className="hidden md:flex space-x-8">
              <Link href="/" className="text-gray-700 hover:text-blue-600">الرئيسية</Link>
              <Link href="/properties" className="text-gray-700 hover:text-blue-600">المنازل</Link>
              <Link href="/about" className="text-gray-700 hover:text-blue-600">من نحن</Link>
              <Link href="/contact" className="text-gray-900 hover:text-blue-600">اتصل بنا</Link>
            </nav>
            <div className="flex items-center space-x-4">
              <a href="tel:+212600000000" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                📞 اتصل الآن
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Page Header */}
      <section className="bg-blue-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">اتصل بنا</h1>
            <p className="text-xl text-blue-100">نحن هنا لمساعدتك في العثور على منزل أحلامك</p>
          </div>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            
            {/* Contact Information */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-8">معلومات الاتصال</h2>
              
              <div className="space-y-6">
                <div className="bg-white rounded-lg shadow-md p-6">
                  <div className="flex items-center space-x-4">
                    <div className="text-3xl">📞</div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900">الهاتف الرئيسي</h3>
                      <a href="tel:+212600000000" className="text-blue-600 hover:text-blue-800 text-lg font-medium">
                        +212 6 00 00 00 00
                      </a>
                      <p className="text-gray-600 text-sm">متاح 24/7 للطوارئ</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow-md p-6">
                  <div className="flex items-center space-x-4">
                    <div className="text-3xl">📱</div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900">الهاتف الثانوي</h3>
                      <a href="tel:+212700000000" className="text-blue-600 hover:text-blue-800 text-lg font-medium">
                        +212 7 00 00 00 00
                      </a>
                      <p className="text-gray-600 text-sm">من السبت إلى الخميس: 9:00 - 18:00</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow-md p-6">
                  <div className="flex items-center space-x-4">
                    <div className="text-3xl">💬</div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900">واتساب</h3>
                      <a 
                        href="https://wa.me/212600000000" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-green-600 hover:text-green-800 text-lg font-medium"
                      >
                        +212 6 00 00 00 00
                      </a>
                      <p className="text-gray-600 text-sm">للرسائل السريعة والصور</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow-md p-6">
                  <div className="flex items-center space-x-4">
                    <div className="text-3xl">📧</div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900">البريد الإلكتروني</h3>
                      <a href="mailto:info@rental-homes.ma" className="text-blue-600 hover:text-blue-800 text-lg font-medium">
                        info@rental-homes.ma
                      </a>
                      <p className="text-gray-600 text-sm">للاستفسارات العامة</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow-md p-6">
                  <div className="flex items-center space-x-4">
                    <div className="text-3xl">📍</div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900">العنوان</h3>
                      <p className="text-gray-700 text-lg">شارع محمد الخامس، الرباط</p>
                      <p className="text-gray-600 text-sm">المغرب، 10000</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Contact Actions */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-8">اتصل بنا الآن</h2>
              
              <div className="bg-white rounded-lg shadow-md p-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-6">طرق التواصل السريع</h3>
                
                <div className="space-y-4">
                  <a 
                    href="tel:+212600000000"
                    className="w-full bg-blue-600 text-white py-4 px-6 rounded-lg hover:bg-blue-700 transition-colors font-semibold text-lg flex items-center justify-center space-x-3"
                  >
                    <span>📞</span>
                    <span>اتصال مباشر - الخط الرئيسي</span>
                  </a>
                  
                  <a 
                    href="tel:+212700000000"
                    className="w-full bg-green-600 text-white py-4 px-6 rounded-lg hover:bg-green-700 transition-colors font-semibold text-lg flex items-center justify-center space-x-3"
                  >
                    <span>📱</span>
                    <span>اتصال مباشر - الخط الثانوي</span>
                  </a>
                  
                  <a 
                    href="https://wa.me/212600000000"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-green-500 text-white py-4 px-6 rounded-lg hover:bg-green-600 transition-colors font-semibold text-lg flex items-center justify-center space-x-3"
                  >
                    <span>💬</span>
                    <span>محادثة واتساب</span>
                  </a>
                </div>

                <div className="mt-8 p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-2">💡 نصيحة:</h4>
                  <p className="text-gray-700 text-sm">
                    للحصول على أسرع خدمة، اتصل بنا مباشرة. فريقنا جاهز لمساعدتك في العثور على المنزل المثالي 
                    وترتيب موعد للمعاينة في نفس اليوم.
                  </p>
                </div>
              </div>

              <div className="mt-8 bg-white rounded-lg shadow-md p-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-6">ساعات العمل</h3>
                
                <div className="space-y-3">
                  <div className="flex justify-between items-center py-2 border-b border-gray-200">
                    <span className="font-medium text-gray-900">السبت - الخميس</span>
                    <span className="text-gray-700">9:00 ص - 6:00 م</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-200">
                    <span className="font-medium text-gray-900">الجمعة</span>
                    <span className="text-gray-700">2:00 م - 6:00 م</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="font-medium text-gray-900">الطوارئ</span>
                    <span className="text-green-600 font-medium">24/7</span>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-yellow-50 rounded-lg">
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
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">الأسئلة الشائعة</h2>
          
          <div className="space-y-6">
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">كيف يمكنني حجز منزل؟</h3>
              <p className="text-gray-700">ببساطة اتصل بنا على أحد أرقام الهاتف المذكورة أعلاه. سيقوم فريقنا بفهم احتياجاتك وترتيب موعد للمعاينة.</p>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">هل يمكنني الحجز عبر الإنترنت؟</h3>
              <p className="text-gray-700">نحن نؤمن بأهمية التواصل المباشر لضمان فهم احتياجاتك بدقة. لذلك نقدم خدمة الحجز بالهاتف فقط.</p>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">ما هي تكلفة الخدمة؟</h3>
              <p className="text-gray-700">خدمة البحث والاستشارة مجانية تماماً. نحن نحصل على عمولة من مالك العقار عند إتمام الحجز.</p>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">كم من الوقت يستغرق العثور على منزل مناسب؟</h3>
              <p className="text-gray-700">عادة ما نجد خيارات مناسبة في نفس اليوم. يمكننا ترتيب معاينات متعددة في يوم واحد لتوفير وقتك.</p>
            </div>
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
