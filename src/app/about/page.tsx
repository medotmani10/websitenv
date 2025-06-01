import Link from "next/link";

export default function About() {
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
                <Link href="/contact" className="text-gray-700 hover:text-red-500">اتصل بنا</Link>
                <Link href="/about" className="text-red-500 hover:text-red-600 font-medium">عن المنصة</Link>
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
            <h1 className="text-4xl font-bold mb-4">عن منصة بيتي</h1>
            <p className="text-xl text-red-100">تعرف على قصتنا ورؤيتنا في مجال تأجير العقارات</p>
          </div>
        </div>
      </section>

      {/* About Content */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none">
            <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
              <div className="text-center mb-8">
                <div className="text-6xl mb-4">🏠</div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">قصة بيتي</h2>
              </div>
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                <strong className="text-red-500">بيتي</strong> هي منصة رائدة في مجال تأجير العقارات في المغرب، تأسست بهدف تسهيل عملية البحث عن المنزل المثالي للعائلات والأفراد.
                منذ تأسيسنا، نؤمن بأن العثور على منزل مناسب يجب أن يكون عملية بسيطة وسهلة.
              </p>
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                لهذا السبب، اخترنا نظام الحجز بالهاتف فقط - لأننا نؤمن بأن المحادثة المباشرة مع خبرائنا تضمن لك الحصول على
                أفضل النصائح والخدمات المخصصة لاحتياجاتك الفريدة.
              </p>
              <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-lg">
                <p className="text-red-700 font-medium">
                  "نحن لا نبيع منازل فقط، بل نساعد الناس في العثور على بيوتهم الجديدة"
                </p>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
              <div className="text-center mb-8">
                <div className="text-6xl mb-4">🎯</div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">رؤيتنا</h2>
              </div>
              <p className="text-lg text-gray-700 mb-6 leading-relaxed text-center">
                نسعى لأن نكون الخيار الأول للباحثين عن عقارات للإيجار في المغرب، من خلال تقديم خدمة شخصية ومتميزة
                تركز على فهم احتياجات كل عميل وتلبيتها بأفضل الطرق الممكنة.
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
              <div className="text-center mb-8">
                <div className="text-6xl mb-4">💎</div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">قيمنا</h2>
              </div>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="flex items-start space-x-4 p-6 bg-red-50 rounded-xl">
                  <div className="text-4xl">🤝</div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">الثقة والشفافية</h3>
                    <p className="text-gray-700 leading-relaxed">نبني علاقات طويلة الأمد مع عملائنا من خلال الصدق والشفافية في جميع تعاملاتنا.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4 p-6 bg-red-50 rounded-xl">
                  <div className="text-4xl">⭐</div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">الجودة والتميز</h3>
                    <p className="text-gray-700 leading-relaxed">نختار بعناية العقارات التي نعرضها لضمان أعلى معايير الجودة والراحة.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4 p-6 bg-red-50 rounded-xl">
                  <div className="text-4xl">📞</div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">الخدمة الشخصية</h3>
                    <p className="text-gray-700 leading-relaxed">نؤمن بأهمية التواصل المباشر والخدمة المخصصة لكل عميل.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4 p-6 bg-red-50 rounded-xl">
                  <div className="text-4xl">🏠</div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">التنوع والخيارات</h3>
                    <p className="text-gray-700 leading-relaxed">نوفر مجموعة متنوعة من العقارات لتناسب جميع الأذواق والميزانيات.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="text-center mb-8">
                <div className="text-6xl mb-4">📞</div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">لماذا الحجز بالهاتف؟</h2>
                <p className="text-gray-600">نؤمن بقوة التواصل المباشر</p>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="flex items-start space-x-4 p-6 bg-gray-50 rounded-xl hover:bg-red-50 transition-colors">
                  <div className="text-3xl">💬</div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">تواصل مباشر وفوري</h3>
                    <p className="text-gray-700">احصل على إجابات فورية لجميع أسئلتك واستفساراتك.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4 p-6 bg-gray-50 rounded-xl hover:bg-red-50 transition-colors">
                  <div className="text-3xl">🎯</div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">خدمة مخصصة</h3>
                    <p className="text-gray-700">نفهم احتياجاتك بدقة ونقترح عليك أفضل الخيارات المناسبة.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4 p-6 bg-gray-50 rounded-xl hover:bg-red-50 transition-colors">
                  <div className="text-3xl">⚡</div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">سرعة في الحجز</h3>
                    <p className="text-gray-700">احجز عقارك في دقائق معدودة دون الحاجة لملء نماذج معقدة.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4 p-6 bg-gray-50 rounded-xl hover:bg-red-50 transition-colors">
                  <div className="text-3xl">🔒</div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">أمان وخصوصية</h3>
                    <p className="text-gray-700">معلوماتك الشخصية محمية ولا نحتاج لجمع بيانات غير ضرورية.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-red-500 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-3xl font-bold mb-4">جاهز للبدء؟</h3>
          <p className="text-xl mb-8 text-red-100">اتصل بنا الآن ودعنا نساعدك في العثور على عقار أحلامك</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="tel:+212600000000" className="bg-white text-red-500 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors inline-flex items-center justify-center">
              📞 +212 6 00 00 00 00
            </a>
            <a href="tel:+212700000000" className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-red-500 transition-colors inline-flex items-center justify-center">
              📱 +212 7 00 00 00 00
            </a>
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
