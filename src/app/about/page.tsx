import Link from "next/link";

export default function About() {
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
              <Link href="/about" className="text-gray-900 hover:text-blue-600">من نحن</Link>
              <Link href="/contact" className="text-gray-700 hover:text-blue-600">اتصل بنا</Link>
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
            <h1 className="text-4xl font-bold mb-4">من نحن</h1>
            <p className="text-xl text-blue-100">تعرف على قصتنا ورؤيتنا في مجال كراء المنازل</p>
          </div>
        </div>
      </section>

      {/* About Content */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none">
            <div className="bg-white rounded-lg shadow-md p-8 mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">قصتنا</h2>
              <p className="text-lg text-gray-700 mb-6">
                نحن شركة رائدة في مجال كراء المنازل في المغرب، تأسست بهدف تسهيل عملية البحث عن المنزل المثالي للعائلات والأفراد. 
                منذ تأسيسنا، نؤمن بأن العثور على منزل مناسب يجب أن يكون عملية بسيطة وسهلة.
              </p>
              <p className="text-lg text-gray-700 mb-6">
                لهذا السبب، اخترنا نظام الحجز بالهاتف فقط - لأننا نؤمن بأن المحادثة المباشرة مع خبرائنا تضمن لك الحصول على 
                أفضل النصائح والخدمات المخصصة لاحتياجاتك الفريدة.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-8 mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">رؤيتنا</h2>
              <p className="text-lg text-gray-700 mb-6">
                نسعى لأن نكون الخيار الأول للباحثين عن منازل للكراء في المغرب، من خلال تقديم خدمة شخصية ومتميزة 
                تركز على فهم احتياجات كل عميل وتلبيتها بأفضل الطرق الممكنة.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-8 mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">قيمنا</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="flex items-start space-x-4">
                  <div className="text-3xl">🤝</div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">الثقة والشفافية</h3>
                    <p className="text-gray-700">نبني علاقات طويلة الأمد مع عملائنا من خلال الصدق والشفافية في جميع تعاملاتنا.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="text-3xl">⭐</div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">الجودة والتميز</h3>
                    <p className="text-gray-700">نختار بعناية المنازل التي نعرضها لضمان أعلى معايير الجودة والراحة.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="text-3xl">📞</div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">الخدمة الشخصية</h3>
                    <p className="text-gray-700">نؤمن بأهمية التواصل المباشر والخدمة المخصصة لكل عميل.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="text-3xl">🏠</div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">التنوع والخيارات</h3>
                    <p className="text-gray-700">نوفر مجموعة متنوعة من المنازل لتناسب جميع الأذواق والميزانيات.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">لماذا الحجز بالهاتف؟</h2>
              <div className="space-y-4">
                <div className="flex items-start space-x-4">
                  <div className="text-2xl">💬</div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">تواصل مباشر وفوري</h3>
                    <p className="text-gray-700">احصل على إجابات فورية لجميع أسئلتك واستفساراتك.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="text-2xl">🎯</div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">خدمة مخصصة</h3>
                    <p className="text-gray-700">نفهم احتياجاتك بدقة ونقترح عليك أفضل الخيارات المناسبة.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="text-2xl">⚡</div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">سرعة في الحجز</h3>
                    <p className="text-gray-700">احجز منزلك في دقائق معدودة دون الحاجة لملء نماذج معقدة.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="text-2xl">🔒</div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">أمان وخصوصية</h3>
                    <p className="text-gray-700">معلوماتك الشخصية محمية ولا نحتاج لجمع بيانات غير ضرورية.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-3xl font-bold mb-4">جاهز للبدء؟</h3>
          <p className="text-xl mb-8 text-gray-300">اتصل بنا الآن ودعنا نساعدك في العثور على منزل أحلامك</p>
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
