'use client';

import Link from "next/link";
import { useState, useEffect } from 'react';
import ImageGallery from '../components/ImageGallery';

interface Property {
  id: number;
  title: string;
  location: string;
  price: string;
  bedrooms: number;
  bathrooms: number;
  area: string;
  phone: string;
  features: string[];
  category: string;
  status: 'available' | 'rented' | 'maintenance';
  featured: boolean;
  images: string[];
  mainImage: string;
}

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

  useEffect(() => {
    // تحميل العقارات من localStorage
    const savedProperties = localStorage.getItem('properties');
    if (savedProperties) {
      const parsedProperties = JSON.parse(savedProperties);
      // عرض العقارات المتاحة فقط
      setProperties(parsedProperties.filter((p: Property) => p.status === 'available'));
    } else {
      // استخدام البيانات الافتراضية
      setProperties(defaultProperties.filter(p => p.status === 'available'));
    }
    setLoading(false);
  }, []);

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
              <Link href="/properties" className="text-gray-900 hover:text-blue-600">المنازل</Link>
              <Link href="/about" className="text-gray-700 hover:text-blue-600">من نحن</Link>
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
            <h1 className="text-4xl font-bold mb-4">المنازل المتاحة للكراء</h1>
            <p className="text-xl text-blue-100">اختر من بين مجموعة واسعة من المنازل في أفضل المواقع</p>
          </div>
        </div>
      </section>

      {/* Properties Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {properties.map((property) => (
              <div key={property.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <div
                  className="relative h-48 bg-gray-200 cursor-pointer"
                  onClick={() => openGallery(property)}
                >
                  {property.mainImage ? (
                    <img
                      src={property.mainImage}
                      alt={property.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                        const parent = target.parentElement;
                        if (parent) {
                          parent.innerHTML = '<div class="absolute inset-0 flex items-center justify-center text-gray-500">🏠 صورة المنزل</div>';
                        }
                      }}
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-gray-500">
                      🏠 صورة المنزل
                    </div>
                  )}

                  {/* مؤشر العقار المميز */}
                  {property.featured && (
                    <div className="absolute top-2 right-2 bg-yellow-500 text-white px-2 py-1 rounded text-xs font-medium">
                      ⭐ مميز
                    </div>
                  )}

                  {/* مؤشر عدد الصور */}
                  {property.images.length > 1 && (
                    <div className="absolute bottom-2 left-2 bg-black bg-opacity-70 text-white px-2 py-1 rounded text-xs">
                      📷 {property.images.length} صور
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{property.title}</h3>
                  <p className="text-gray-600 mb-2">📍 {property.location}</p>
                  <p className="text-2xl font-bold text-blue-600 mb-4">{property.price}</p>
                  
                  <div className="grid grid-cols-3 gap-4 mb-4 text-sm text-gray-600">
                    <div className="text-center">
                      <div className="font-semibold">🛏️ {property.bedrooms}</div>
                      <div>غرف نوم</div>
                    </div>
                    <div className="text-center">
                      <div className="font-semibold">🚿 {property.bathrooms}</div>
                      <div>حمامات</div>
                    </div>
                    <div className="text-center">
                      <div className="font-semibold">📐 {property.area}</div>
                      <div>المساحة</div>
                    </div>
                  </div>

                  <div className="mb-4">
                    <h4 className="font-semibold text-gray-900 mb-2">المميزات:</h4>
                    <div className="flex flex-wrap gap-2">
                      {property.features.map((feature, index) => (
                        <span key={index} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-sm">
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="border-t pt-4">
                    {/* زر عرض الصور */}
                    {property.images.length > 0 && (
                      <button
                        onClick={() => openGallery(property)}
                        className="w-full bg-purple-600 text-white text-center py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors font-semibold mb-2"
                      >
                        📷 عرض الصور ({property.images.length})
                      </button>
                    )}

                    <div className="flex flex-col sm:flex-row gap-2">
                      <a
                        href={`tel:${property.phone}`}
                        className="flex-1 bg-blue-600 text-white text-center py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
                      >
                        📞 اتصل للحجز
                      </a>
                      <a
                        href={`https://wa.me/${property.phone.replace(/\s/g, '').replace('+', '')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 bg-green-600 text-white text-center py-2 px-4 rounded-lg hover:bg-green-700 transition-colors font-semibold"
                      >
                        💬 واتساب
                      </a>
                    </div>
                    <p className="text-center text-sm text-gray-600 mt-2">{property.phone}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-3xl font-bold mb-4">لم تجد ما تبحث عنه؟</h3>
          <p className="text-xl mb-8 text-gray-300">اتصل بنا وسنساعدك في العثور على المنزل المثالي حسب احتياجاتك</p>
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
