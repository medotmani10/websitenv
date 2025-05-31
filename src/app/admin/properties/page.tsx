'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

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
}

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

  const loadProperties = () => {
    // تحميل العقارات من localStorage أو استخدام البيانات الافتراضية
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
          featured: true
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
          status: "available",
          featured: false
        }
      ];
      setProperties(defaultProperties);
      localStorage.setItem('properties', JSON.stringify(defaultProperties));
    }
  };

  const saveProperties = (newProperties: Property[]) => {
    setProperties(newProperties);
    localStorage.setItem('properties', JSON.stringify(newProperties));
  };

  const handleDelete = (id: number) => {
    if (confirm('هل أنت متأكد من حذف هذا العقار؟')) {
      const newProperties = properties.filter(p => p.id !== id);
      saveProperties(newProperties);
    }
  };

  const handleStatusChange = (id: number, status: Property['status']) => {
    const newProperties = properties.map(p => 
      p.id === id ? { ...p, status } : p
    );
    saveProperties(newProperties);
  };

  const toggleFeatured = (id: number) => {
    const newProperties = properties.map(p => 
      p.id === id ? { ...p, featured: !p.featured } : p
    );
    saveProperties(newProperties);
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
            <button
              onClick={() => setShowAddForm(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              + إضافة عقار جديد
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
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
        </div>

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
          onSave={(property) => {
            if (editingProperty) {
              // تعديل عقار موجود
              const newProperties = properties.map(p => 
                p.id === property.id ? property : p
              );
              saveProperties(newProperties);
            } else {
              // إضافة عقار جديد
              const newProperty = {
                ...property,
                id: Math.max(...properties.map(p => p.id), 0) + 1
              };
              saveProperties([...properties, newProperty]);
            }
            setShowAddForm(false);
            setEditingProperty(null);
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
    featured: property?.featured || false
  });

  const [newFeature, setNewFeature] = useState('');

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
