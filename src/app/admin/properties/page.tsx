'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { propertyService, Property, storageService, isSupabaseConfigured } from '../../../lib/supabase';

// Property interface is now imported from supabase.ts

export default function AdminProperties() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingProperty, setEditingProperty] = useState<Property | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // التحقق من تسجيل الدخول
  useEffect(() => {
    const loggedIn = localStorage.getItem('adminLoggedIn');
    if (loggedIn !== 'true') {
      window.location.href = '/admin';
      return;
    }
    setIsLoggedIn(true);
    loadProperties();
  }, []);

  const loadProperties = async () => {
    try {
      // التحقق من إعداد Supabase
      if (isSupabaseConfigured()) {
        // تحميل العقارات من قاعدة البيانات
        const data = await propertyService.getAll();
        // تحويل البيانات لتتماشى مع الواجهة الحالية
        const formattedData = data.map(property => ({
          ...property,
          mainImage: property.main_image,
          images: property.images || []
        }));
        setProperties(formattedData);
        return;
      }
    } catch (error) {
      console.error('خطأ في تحميل العقارات من قاعدة البيانات:', error);

      // في حالة فشل تحميل البيانات من قاعدة البيانات، استخدم البيانات المحلية
      const savedProperties = localStorage.getItem('properties');
      if (savedProperties) {
        setProperties(JSON.parse(savedProperties));
      } else {
        // البيانات الافتراضية
        const defaultProperties: Property[] = [
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
            status: "available",
            featured: true,
            images: [],
            main_image: "",
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          }
        ];
        setProperties(defaultProperties);
        // حفظ البيانات الافتراضية في قاعدة البيانات
        try {
          for (const property of defaultProperties) {
            await propertyService.create(property);
          }
        } catch (dbError) {
          console.error('خطأ في حفظ البيانات الافتراضية:', dbError);
          localStorage.setItem('properties', JSON.stringify(defaultProperties));
        }
      }
    }
  };

  const saveProperties = async (newProperties: Property[]) => {
    setProperties(newProperties);

    // حفظ احتياطي في localStorage
    try {
      const cleanedProperties = newProperties.map(property => ({
        ...property,
        images: property.images.slice(0, 10),
        title: property.title.slice(0, 100),
        location: property.location.slice(0, 100),
        features: property.features.slice(0, 10)
      }));
      localStorage.setItem('properties', JSON.stringify(cleanedProperties));
    } catch (localError) {
      console.warn('خطأ في الحفظ المحلي:', localError);
    }
  };

  const handleDelete = async (id: number) => {
    if (confirm('هل أنت متأكد من حذف هذا العقار؟')) {
      try {
        await propertyService.delete(id);
        // إعادة تحميل البيانات من قاعدة البيانات
        await loadProperties();
        alert('تم حذف العقار بنجاح!');
      } catch (error) {
        console.error('خطأ في حذف العقار:', error);
        alert('فشل في حذف العقار. يرجى المحاولة مرة أخرى.');
      }
    }
  };

  const handleStatusChange = async (id: number, status: Property['status']) => {
    try {
      await propertyService.update(id, { status });
      // إعادة تحميل البيانات من قاعدة البيانات
      await loadProperties();
    } catch (error) {
      console.error('خطأ في تحديث حالة العقار:', error);
      alert('فشل في تحديث حالة العقار. يرجى المحاولة مرة أخرى.');
    }
  };

  const toggleFeatured = async (id: number) => {
    try {
      const property = properties.find(p => p.id === id);
      if (property) {
        await propertyService.update(id, { featured: !property.featured });
        // إعادة تحميل البيانات من قاعدة البيانات
        await loadProperties();
      }
    } catch (error) {
      console.error('خطأ في تحديث العقار المميز:', error);
      alert('فشل في تحديث العقار المميز. يرجى المحاولة مرة أخرى.');
    }
  };

  // دالة لتنظيف التخزين المحلي
  const cleanupStorage = () => {
    if (confirm('هل تريد تنظيف التخزين المحلي؟ سيتم الاحتفاظ بآخر 30 عقار فقط وإزالة جميع الصور.')) {
      try {
        const limitedProperties = properties.slice(-30).map(property => ({
          id: property.id,
          title: property.title.slice(0, 50),
          location: property.location.slice(0, 50),
          price: property.price,
          bedrooms: property.bedrooms,
          bathrooms: property.bathrooms,
          area: property.area,
          phone: property.phone,
          features: property.features.slice(0, 5),
          category: property.category,
          status: property.status,
          featured: property.featured,
          images: [],
          mainImage: ""
        }));

        localStorage.removeItem('properties');
        localStorage.setItem('properties', JSON.stringify(limitedProperties));
        setProperties(limitedProperties);
        alert('تم تنظيف التخزين بنجاح. تم الاحتفاظ بآخر 30 عقار.');
      } catch (error) {
        alert('خطأ في تنظيف التخزين: ' + error.message);
      }
    }
  };

  // دالة لحساب حجم التخزين المستخدم
  const getStorageSize = () => {
    try {
      const data = localStorage.getItem('properties');
      if (data) {
        const sizeInBytes = new Blob([data]).size;
        const sizeInKB = (sizeInBytes / 1024).toFixed(2);
        const sizeInMB = (sizeInBytes / (1024 * 1024)).toFixed(2);
        return { bytes: sizeInBytes, kb: sizeInKB, mb: sizeInMB };
      }
    } catch (error) {
      console.error('خطأ في حساب حجم التخزين:', error);
    }
    return { bytes: 0, kb: '0', mb: '0' };
  };

  if (!isLoggedIn) {
    return <div>جاري التحميل...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <Link href="/admin" className="text-blue-600 hover:text-blue-800">
                ← العودة للوحة التحكم
              </Link>
              <h1 className="text-2xl font-bold text-gray-900">إدارة العقارات</h1>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={loadProperties}
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
              >
                🔄 تحديث البيانات
              </button>
              <button
                onClick={() => setShowAddForm(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                + إضافة عقار جديد
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{properties.length}</div>
              <div className="text-sm text-gray-600">إجمالي العقارات</div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {properties.filter(p => p.status === 'available').length}
              </div>
              <div className="text-sm text-gray-600">متاح للإيجار</div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600">
                {properties.filter(p => p.status === 'rented').length}
              </div>
              <div className="text-sm text-gray-600">مؤجر</div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-600">
                {properties.filter(p => p.featured).length}
              </div>
              <div className="text-sm text-gray-600">مميز</div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-center">
              <div className="text-lg font-bold text-purple-600">{getStorageSize().mb} MB</div>
              <div className="text-sm text-gray-600">حجم التخزين</div>
              <button
                onClick={cleanupStorage}
                className="mt-2 text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded hover:bg-purple-200"
              >
                تنظيف التخزين
              </button>
            </div>
          </div>
        </div>

        {/* Storage Warning */}
        {parseFloat(getStorageSize().mb) > 4 && (
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-yellow-700">
                  <strong>تحذير:</strong> حجم التخزين كبير ({getStorageSize().mb} MB). يُنصح بتنظيف التخزين لتجنب مشاكل الحفظ.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Properties Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">قائمة العقارات</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    العقار
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    الصور
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    الموقع
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    السعر
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    الحالة
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    مميز
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    الإجراءات
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {properties.map((property) => (
                  <tr key={property.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{property.title}</div>
                        <div className="text-sm text-gray-500">{property.category}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-2">
                        {property.mainImage ? (
                          <img
                            src={property.mainImage}
                            alt={property.title}
                            className="w-12 h-12 object-cover rounded"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.style.display = 'none';
                            }}
                          />
                        ) : (
                          <div className="w-12 h-12 bg-gray-200 rounded flex items-center justify-center text-gray-400 text-xs">
                            📷
                          </div>
                        )}
                        <div className="text-sm text-gray-600">
                          {property.images.length > 0 ? `${property.images.length} صور` : 'لا توجد صور'}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {property.location}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {property.price}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <select
                        value={property.status}
                        onChange={(e) => handleStatusChange(property.id, e.target.value as Property['status'])}
                        className="text-sm border border-gray-300 rounded px-2 py-1"
                      >
                        <option value="available">متاح</option>
                        <option value="rented">مؤجر</option>
                        <option value="maintenance">صيانة</option>
                      </select>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        onClick={() => toggleFeatured(property.id)}
                        className={`text-sm px-2 py-1 rounded ${
                          property.featured 
                            ? 'bg-yellow-100 text-yellow-800' 
                            : 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        {property.featured ? '⭐ مميز' : '☆ عادي'}
                      </button>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                      <button
                        onClick={() => setEditingProperty(property)}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        تعديل
                      </button>
                      <button
                        onClick={() => handleDelete(property.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        حذف
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Add/Edit Form Modal */}
      {(showAddForm || editingProperty) && (
        <PropertyFormModal
          property={editingProperty}
          onSave={async (property) => {
            try {
              if (editingProperty) {
                // تعديل عقار موجود
                await propertyService.update(editingProperty.id, {
                  title: property.title,
                  location: property.location,
                  price: property.price,
                  bedrooms: property.bedrooms,
                  bathrooms: property.bathrooms,
                  area: property.area,
                  phone: property.phone,
                  features: property.features,
                  category: property.category,
                  status: property.status,
                  featured: property.featured,
                  images: property.images,
                  main_image: property.mainImage || ''
                });
                alert('تم تحديث العقار بنجاح!');
              } else {
                // إضافة عقار جديد
                await propertyService.create({
                  title: property.title,
                  location: property.location,
                  price: property.price,
                  bedrooms: property.bedrooms,
                  bathrooms: property.bathrooms,
                  area: property.area,
                  phone: property.phone,
                  features: property.features,
                  category: property.category,
                  status: property.status,
                  featured: property.featured,
                  images: property.images,
                  main_image: property.mainImage || ''
                });
                alert('تم إضافة العقار بنجاح!');
              }

              // إعادة تحميل البيانات من قاعدة البيانات
              await loadProperties();
              setShowAddForm(false);
              setEditingProperty(null);
            } catch (error) {
              console.error('خطأ في حفظ العقار:', error);
              alert('فشل في حفظ العقار. يرجى المحاولة مرة أخرى.');
            }
          }}
          onCancel={() => {
            setShowAddForm(false);
            setEditingProperty(null);
          }}
        />
      )}
    </div>
  );
}

// مكون نموذج إضافة/تعديل العقار
function PropertyFormModal({ 
  property, 
  onSave, 
  onCancel 
}: { 
  property: Property | null;
  onSave: (property: Property) => void;
  onCancel: () => void;
}) {
  const [formData, setFormData] = useState<Omit<Property, 'id'>>({
    title: property?.title || '',
    location: property?.location || '',
    price: property?.price || '',
    bedrooms: property?.bedrooms || 1,
    bathrooms: property?.bathrooms || 1,
    area: property?.area || '',
    phone: property?.phone || '',
    features: property?.features || [],
    category: property?.category || 'شقة',
    status: property?.status || 'available',
    featured: property?.featured || false,
    images: property?.images || [],
    mainImage: property?.mainImage || ''
  });

  const [newFeature, setNewFeature] = useState('');
  const [imagePreview, setImagePreview] = useState<string>('');
  const [isUploading, setIsUploading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...formData,
      id: property?.id || 0
    });
  };

  const addFeature = () => {
    if (newFeature.trim()) {
      setFormData({
        ...formData,
        features: [...formData.features, newFeature.trim()]
      });
      setNewFeature('');
    }
  };

  const removeFeature = (index: number) => {
    setFormData({
      ...formData,
      features: formData.features.filter((_, i) => i !== index)
    });
  };

  // دالة ضغط الصور
  const compressImage = (file: File, maxWidth: number = 800, quality: number = 0.7): Promise<string> => {
    return new Promise((resolve, reject) => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();

      img.onload = () => {
        // حساب الأبعاد الجديدة
        let { width, height } = img;
        if (width > maxWidth) {
          height = (height * maxWidth) / width;
          width = maxWidth;
        }

        canvas.width = width;
        canvas.height = height;

        // رسم الصورة المضغوطة
        ctx?.drawImage(img, 0, 0, width, height);

        // تحويل إلى base64 مع ضغط
        const compressedDataUrl = canvas.toDataURL('image/jpeg', quality);
        resolve(compressedDataUrl);
      };

      img.onerror = () => reject(new Error('فشل في تحميل الصورة'));
      img.src = URL.createObjectURL(file);
    });
  };

  // معالجة رفع الصور
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setIsUploading(true);

      // التحقق من نوع الملف
      if (!file.type.startsWith('image/')) {
        alert('يرجى اختيار ملف صورة صالح');
        setIsUploading(false);
        return;
      }

      // التحقق من حجم الملف (10MB max قبل الضغط)
      if (file.size > 10 * 1024 * 1024) {
        alert('حجم الصورة كبير جداً. يرجى اختيار صورة أصغر من 10MB');
        setIsUploading(false);
        return;
      }

      try {
        // ضغط الصورة
        const compressedImageUrl = await compressImage(file, 800, 0.7);
        setImagePreview(compressedImageUrl);

        // التحقق من عدد الصور (حد أقصى 10 صور)
        if (formData.images.length >= 10) {
          alert('لا يمكن إضافة أكثر من 10 صور لكل عقار');
          setIsUploading(false);
          return;
        }

        // إضافة الصورة المضغوطة إلى قائمة الصور
        const newImages = [...formData.images, compressedImageUrl];
        setFormData({
          ...formData,
          images: newImages,
          mainImage: formData.mainImage || compressedImageUrl // تعيين كصورة رئيسية إذا لم تكن موجودة
        });

        setIsUploading(false);
      } catch (error) {
        console.error('خطأ في ضغط الصورة:', error);
        alert('فشل في معالجة الصورة. يرجى المحاولة مرة أخرى.');
        setIsUploading(false);
      }
    }
  };

  // حذف صورة
  const removeImage = (index: number) => {
    const imageToRemove = formData.images[index];
    const newImages = formData.images.filter((_, i) => i !== index);

    setFormData({
      ...formData,
      images: newImages,
      mainImage: formData.mainImage === imageToRemove
        ? (newImages.length > 0 ? newImages[0] : '')
        : formData.mainImage
    });
  };

  // تعيين صورة رئيسية
  const setMainImage = (imageUrl: string) => {
    setFormData({
      ...formData,
      mainImage: imageUrl
    });
  };

  // إضافة صورة من رابط
  const addImageFromUrl = () => {
    const url = prompt('أدخل رابط الصورة:');
    if (url && url.trim()) {
      const newImages = [...formData.images, url.trim()];
      setFormData({
        ...formData,
        images: newImages,
        mainImage: formData.mainImage || url.trim()
      });
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <h2 className="text-xl font-bold mb-4">
            {property ? 'تعديل العقار' : 'إضافة عقار جديد'}
          </h2>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  عنوان العقار
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  الموقع
                </label>
                <input
                  type="text"
                  required
                  value={formData.location}
                  onChange={(e) => setFormData({...formData, location: e.target.value})}
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  السعر
                </label>
                <input
                  type="text"
                  required
                  value={formData.price}
                  onChange={(e) => setFormData({...formData, price: e.target.value})}
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                  placeholder="مثال: 10,000 درهم/شهر"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  النوع
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({...formData, category: e.target.value})}
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                >
                  <option value="شقة">شقة</option>
                  <option value="فيلا">فيلا</option>
                  <option value="استوديو">استوديو</option>
                  <option value="منزل">منزل</option>
                  <option value="مكتب">مكتب</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  غرف النوم
                </label>
                <input
                  type="number"
                  min="1"
                  required
                  value={formData.bedrooms}
                  onChange={(e) => setFormData({...formData, bedrooms: parseInt(e.target.value)})}
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  الحمامات
                </label>
                <input
                  type="number"
                  min="1"
                  required
                  value={formData.bathrooms}
                  onChange={(e) => setFormData({...formData, bathrooms: parseInt(e.target.value)})}
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  المساحة
                </label>
                <input
                  type="text"
                  required
                  value={formData.area}
                  onChange={(e) => setFormData({...formData, area: e.target.value})}
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                  placeholder="مثال: 120 متر مربع"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  رقم الهاتف
                </label>
                <input
                  type="text"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                  placeholder="مثال: +212 6 00 00 00 00"
                />
              </div>
            </div>
            
            {/* المميزات */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                المميزات
              </label>
              <div className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={newFeature}
                  onChange={(e) => setNewFeature(e.target.value)}
                  className="flex-1 border border-gray-300 rounded-md px-3 py-2"
                  placeholder="أضف ميزة جديدة"
                />
                <button
                  type="button"
                  onClick={addFeature}
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                >
                  إضافة
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {formData.features.map((feature, index) => (
                  <span
                    key={index}
                    className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-sm flex items-center gap-1"
                  >
                    {feature}
                    <button
                      type="button"
                      onClick={() => removeFeature(index)}
                      className="text-red-600 hover:text-red-800"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>

            {/* إدارة الصور */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                صور العقار
              </label>

              {/* أزرار إضافة الصور */}
              <div className="flex gap-2 mb-4">
                <label className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 cursor-pointer transition-colors">
                  {isUploading ? '⏳ جاري الرفع...' : '📁 رفع صورة'}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    disabled={isUploading}
                  />
                </label>
                <button
                  type="button"
                  onClick={addImageFromUrl}
                  className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors"
                >
                  🔗 إضافة من رابط
                </button>
              </div>

              {/* معرض الصور */}
              {formData.images.length > 0 && (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {formData.images.map((image, index) => (
                      <div key={index} className="relative group">
                        <div className="aspect-square bg-gray-200 rounded-lg overflow-hidden">
                          <img
                            src={image}
                            alt={`صورة ${index + 1}`}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPuOCteODvOOCuOOBjOiqreOBv+i+vOOBvuOBvuOBm+OCk+OBp+OBl+OBnw==</text></svg>';
                            }}
                          />
                        </div>

                        {/* أزرار التحكم */}
                        <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                          <button
                            type="button"
                            onClick={() => setMainImage(image)}
                            className={`px-2 py-1 rounded text-xs font-medium transition-colors ${
                              formData.mainImage === image
                                ? 'bg-yellow-500 text-white'
                                : 'bg-white text-gray-800 hover:bg-yellow-100'
                            }`}
                          >
                            {formData.mainImage === image ? '⭐ رئيسية' : '☆ رئيسية'}
                          </button>
                          <button
                            type="button"
                            onClick={() => removeImage(index)}
                            className="bg-red-500 text-white px-2 py-1 rounded text-xs hover:bg-red-600 transition-colors"
                          >
                            🗑️ حذف
                          </button>
                        </div>

                        {/* مؤشر الصورة الرئيسية */}
                        {formData.mainImage === image && (
                          <div className="absolute top-2 right-2 bg-yellow-500 text-white px-2 py-1 rounded text-xs font-medium">
                            ⭐ رئيسية
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  <div className="text-sm text-gray-600">
                    <p>💡 نصائح:</p>
                    <ul className="list-disc list-inside space-y-1 text-xs">
                      <li>انقر على "رئيسية" لتعيين الصورة الرئيسية للعقار</li>
                      <li>الحد الأقصى لحجم الصورة: 5MB</li>
                      <li>الصيغ المدعومة: JPG, PNG, GIF, WebP</li>
                    </ul>
                  </div>
                </div>
              )}

              {formData.images.length === 0 && (
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                  <div className="text-4xl mb-2">📷</div>
                  <p className="text-gray-600 mb-2">لا توجد صور للعقار</p>
                  <p className="text-sm text-gray-500">استخدم الأزرار أعلاه لإضافة صور</p>
                </div>
              )}
            </div>

            {/* خيارات إضافية */}
            <div className="flex items-center space-x-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.featured}
                  onChange={(e) => setFormData({...formData, featured: e.target.checked})}
                  className="mr-2"
                />
                عقار مميز
              </label>
            </div>
            
            <div className="flex justify-end space-x-4 pt-4">
              <button
                type="button"
                onClick={onCancel}
                className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50"
              >
                إلغاء
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                {property ? 'تحديث' : 'إضافة'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
