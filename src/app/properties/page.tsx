'use client';

import Link from "next/link";
import { useState, useEffect } from 'react';
import ImageGallery from '../components/ImageGallery';
import { propertyService, Property } from '../../lib/supabase';

// Property interface is now imported from supabase.ts

// بيانات المنازل التجريبية الافتراضية
const defaultProperties = [
  {
    id: 1,
    title: "فيلا فاخرة في الرباط",
    location: "الرباط، المغرب",
    price: "15,000 درهم/شهر",
    bedrooms: 4,
    bathrooms: 3,
    area: "250 متر مربع",
    phone: "+212 6 00 00 00 01",
    features: ["مسبح", "حديقة", "موقف سيارات", "مكيف هواء"],
    category: "فيلا",
    status: "available" as const,
    featured: true,
    images: [],
    mainImage: ""
  },
  {
    id: 2,
    title: "شقة حديثة في الدار البيضاء",
    location: "الدار البيضاء، المغرب",
    price: "8,000 درهم/شهر",
    bedrooms: 2,
    bathrooms: 2,
    area: "120 متر مربع",
    phone: "+212 6 00 00 00 02",
    features: ["مصعد", "أمن 24/7", "موقف سيارات", "شرفة"],
    category: "شقة",
    status: "available" as const,
    featured: false,
    images: [],
    mainImage: ""
  },
  {
    id: 3,
    title: "منزل تقليدي في فاس",
    location: "فاس، المغرب",
    price: "6,500 درهم/شهر",
    bedrooms: 3,
    bathrooms: 2,
    area: "180 متر مربع",
    phone: "+212 6 00 00 00 03",
    features: ["فناء داخلي", "تصميم تقليدي", "موقع مركزي", "هادئ"],
    category: "منزل تقليدي",
    status: "available" as const,
    featured: false,
    images: [],
    mainImage: ""
  },
  {
    id: 4,
    title: "شقة بإطلالة بحرية في طنجة",
    location: "طنجة، المغرب",
    price: "12,000 درهم/شهر",
    bedrooms: 3,
    bathrooms: 2,
    area: "150 متر مربع",
    phone: "+212 6 00 00 00 04",
    features: ["إطلالة بحرية", "شرفة كبيرة", "قريب من الشاطئ", "مفروش"],
    category: "شقة",
    status: "available" as const,
    featured: true,
    images: [],
    mainImage: ""
  },
  {
    id: 5,
    title: "استوديو في مراكش",
    location: "مراكش، المغرب",
    price: "4,000 درهم/شهر",
    bedrooms: 1,
    bathrooms: 1,
    area: "60 متر مربع",
    phone: "+212 6 00 00 00 05",
    features: ["مفروش بالكامل", "مطبخ مجهز", "قريب من المدينة القديمة", "واي فاي"],
    category: "استوديو",
    status: "available" as const,
    featured: false,
    images: [],
    mainImage: ""
  },
  {
    id: 6,
    title: "فيلا مع حديقة في أكادير",
    location: "أكادير، المغرب",
    price: "18,000 درهم/شهر",
    bedrooms: 5,
    bathrooms: 4,
    area: "300 متر مربع",
    phone: "+212 6 00 00 00 06",
    features: ["حديقة كبيرة", "مسبح خاص", "قريب من الشاطئ", "موقف 3 سيارات"],
    category: "فيلا",
    status: "available" as const,
    featured: true,
    images: [],
    mainImage: ""
  }
];

export default function Properties() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [showGallery, setShowGallery] = useState(false);
  const [filters, setFilters] = useState({
    type: '',
    location: '',
    priceRange: '',
    bedrooms: ''
  });

  useEffect(() => {
    loadProperties();

    // فحص معاملات URL للفلترة
    const urlParams = new URLSearchParams(window.location.search);
    const typeParam = urlParams.get('type');
    if (typeParam) {
      setFilters(prev => ({ ...prev, type: typeParam }));
    }
  }, []);

  const loadProperties = async () => {
    try {
      setLoading(true);
      const data = await propertyService.getAvailable();
      // تحويل البيانات لتتماشى مع الواجهة الحالية
      const formattedData = data.map(property => ({
        ...property,
        mainImage: property.main_image,
        images: property.images || []
      }));
      setProperties(formattedData);
    } catch (error) {
      console.error('خطأ في تحميل العقارات:', error);
      // في حالة فشل تحميل البيانات من قاعدة البيانات، استخدم البيانات المحلية
      const savedProperties = localStorage.getItem('properties');
      if (savedProperties) {
        const parsedProperties = JSON.parse(savedProperties);
        setProperties(parsedProperties.filter((p: Property) => p.status === 'available'));
      } else {
        setProperties(defaultProperties.filter(p => p.status === 'available'));
      }
    } finally {
      setLoading(false);
    }
  };

  const openGallery = (property: Property) => {
    if (property.images.length > 0) {
      setSelectedProperty(property);
      setShowGallery(true);
    }
  };

  const closeGallery = () => {
    setShowGallery(false);
    setSelectedProperty(null);
  };

  // فلترة العقارات
  const filteredProperties = properties.filter(property => {
    if (filters.type && !property.category.toLowerCase().includes(filters.type.toLowerCase())) {
      return false;
    }
    if (filters.location && !property.location.toLowerCase().includes(filters.location.toLowerCase())) {
      return false;
    }
    if (filters.bedrooms && property.bedrooms.toString() !== filters.bedrooms) {
      return false;
    }
    return true;
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-4">🏠</div>
          <p className="text-lg text-gray-600">جاري تحميل العقارات...</p>
        </div>
      </div>
    );
  }

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
                <Link href="/properties" className="text-red-500 hover:text-red-600 font-medium">جميع العقارات</Link>
                <Link href="/contact" className="text-gray-700 hover:text-red-500">اتصل بنا</Link>
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
            <h1 className="text-4xl font-bold mb-4">جميع العقارات المتاحة</h1>
            <p className="text-xl text-red-100">اختر من بين مجموعة واسعة من العقارات في أفضل المواقع</p>
            <p className="text-lg text-red-200 mt-2">
              {filteredProperties.length} عقار متاح
            </p>
          </div>
        </div>
      </section>

      {/* Filters Section */}
      <section className="bg-white py-8 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">نوع العقار</label>
              <select
                value={filters.type}
                onChange={(e) => setFilters({...filters, type: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              >
                <option value="">جميع الأنواع</option>
                <option value="استوديو">استوديو</option>
                <option value="شقة">شقة</option>
                <option value="فيلا">فيلا</option>
                <option value="شاليه">شاليه</option>
                <option value="منزل">منزل</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">المدينة</label>
              <input
                type="text"
                value={filters.location}
                onChange={(e) => setFilters({...filters, location: e.target.value})}
                placeholder="ابحث بالمدينة..."
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">عدد غرف النوم</label>
              <select
                value={filters.bedrooms}
                onChange={(e) => setFilters({...filters, bedrooms: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              >
                <option value="">أي عدد</option>
                <option value="1">1 غرفة</option>
                <option value="2">2 غرفة</option>
                <option value="3">3 غرف</option>
                <option value="4">4 غرف</option>
                <option value="5">5+ غرف</option>
              </select>
            </div>
            <div className="flex items-end">
              <button
                onClick={() => setFilters({type: '', location: '', priceRange: '', bedrooms: ''})}
                className="w-full bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600 transition-colors"
              >
                مسح الفلاتر
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Properties Grid */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredProperties.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">🏠</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">لا توجد عقارات متطابقة</h3>
              <p className="text-gray-600 mb-6">جرب تغيير معايير البحث أو مسح الفلاتر</p>
              <button
                onClick={() => setFilters({type: '', location: '', priceRange: '', bedrooms: ''})}
                className="bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-600 transition-colors"
              >
                مسح جميع الفلاتر
              </button>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProperties.map((property) => (
              <div key={property.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group">
                <div
                  className="relative h-64 bg-gray-200 cursor-pointer overflow-hidden"
                  onClick={() => openGallery(property)}
                >
                  {property.mainImage ? (
                    <img
                      src={property.mainImage}
                      alt={property.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                        const parent = target.parentElement;
                        if (parent) {
                          parent.innerHTML = '<div class="absolute inset-0 flex items-center justify-center text-gray-500 text-4xl">🏠</div>';
                        }
                      }}
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-gray-500 text-4xl">
                      🏠
                    </div>
                  )}

                  {/* مؤشر العقار المميز */}
                  {property.featured && (
                    <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                      ⭐ مميز
                    </div>
                  )}

                  {/* مؤشر عدد الصور */}
                  {property.images.length > 1 && (
                    <div className="absolute bottom-4 left-4 bg-black bg-opacity-70 text-white px-3 py-1 rounded-full text-sm">
                      📷 {property.images.length}
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{property.title}</h3>
                  <p className="text-gray-600 mb-3 flex items-center">
                    <svg className="w-4 h-4 ml-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                    {property.location}
                  </p>
                  <p className="text-2xl font-bold text-red-500 mb-4">{property.price}</p>

                  <div className="grid grid-cols-3 gap-4 mb-4 text-sm">
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <div className="text-lg font-bold text-gray-900">🛏️ {property.bedrooms}</div>
                      <div className="text-gray-600">غرف نوم</div>
                    </div>
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <div className="text-lg font-bold text-gray-900">🚿 {property.bathrooms}</div>
                      <div className="text-gray-600">حمامات</div>
                    </div>
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <div className="text-lg font-bold text-gray-900">📐</div>
                      <div className="text-gray-600">{property.area}</div>
                    </div>
                  </div>

                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-900 mb-3">المميزات:</h4>
                    <div className="flex flex-wrap gap-2">
                      {property.features.map((feature, index) => (
                        <span key={index} className="bg-red-50 text-red-700 px-3 py-1 rounded-full text-sm font-medium">
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-3">
                    {/* زر عرض الصور */}
                    {property.images.length > 0 && (
                      <button
                        onClick={() => openGallery(property)}
                        className="w-full bg-gray-600 text-white text-center py-3 px-4 rounded-lg hover:bg-gray-700 transition-colors font-semibold flex items-center justify-center"
                      >
                        📷 عرض الصور ({property.images.length})
                      </button>
                    )}

                    <div className="grid grid-cols-2 gap-3">
                      <a
                        href={`tel:${property.phone}`}
                        className="bg-red-500 text-white text-center py-3 px-4 rounded-lg hover:bg-red-600 transition-colors font-semibold flex items-center justify-center"
                      >
                        📞 اتصل الآن
                      </a>
                      <a
                        href={`https://wa.me/${property.phone.replace(/\s/g, '').replace('+', '')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-green-500 text-white text-center py-3 px-4 rounded-lg hover:bg-green-600 transition-colors font-semibold flex items-center justify-center"
                      >
                        💬 واتساب
                      </a>
                    </div>
                    <p className="text-center text-sm text-gray-500">{property.phone}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-red-500 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-3xl font-bold mb-4">لم تجد ما تبحث عنه؟</h3>
          <p className="text-xl mb-8 text-red-100">اتصل بنا وسنساعدك في العثور على العقار المثالي حسب احتياجاتك</p>
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

      {/* معرض الصور */}
      {showGallery && selectedProperty && (
        <ImageGallery
          images={selectedProperty.images}
          title={selectedProperty.title}
          onClose={closeGallery}
        />
      )}
    </div>
  );
}
