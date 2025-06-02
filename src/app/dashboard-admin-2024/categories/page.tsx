'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Category {
  id: number;
  name: string;
  description: string;
  icon: string;
  color: string;
  active: boolean;
  propertyCount: number;
}

export default function AdminCategories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // التحقق من تسجيل الدخول
  useEffect(() => {
    const loggedIn = localStorage.getItem('adminLoggedIn');
    if (loggedIn !== 'true') {
      window.location.href = '/admin';
      return;
    }
    setIsLoggedIn(true);
    loadCategories();
  }, []);

  const loadCategories = () => {
    // تحميل الأصناف من localStorage أو استخدام البيانات الافتراضية
    const savedCategories = localStorage.getItem('categories');
    if (savedCategories) {
      setCategories(JSON.parse(savedCategories));
    } else {
      // البيانات الافتراضية
      const defaultCategories: Category[] = [
        {
          id: 1,
          name: "شقة",
          description: "شقق سكنية للإيجار في مختلف المناطق",
          icon: "🏠",
          color: "blue",
          active: true,
          propertyCount: 15
        },
        {
          id: 2,
          name: "فيلا",
          description: "فيلات فاخرة مع حدائق ومسابح",
          icon: "🏡",
          color: "green",
          active: true,
          propertyCount: 8
        },
        {
          id: 3,
          name: "استوديو",
          description: "استوديوهات مفروشة للعزاب والطلاب",
          icon: "🏢",
          color: "purple",
          active: true,
          propertyCount: 12
        },
        {
          id: 4,
          name: "منزل تقليدي",
          description: "منازل تقليدية مغربية أصيلة",
          icon: "🕌",
          color: "yellow",
          active: true,
          propertyCount: 5
        },
        {
          id: 5,
          name: "مكتب",
          description: "مكاتب تجارية للشركات والأعمال",
          icon: "🏢",
          color: "gray",
          active: false,
          propertyCount: 3
        }
      ];
      setCategories(defaultCategories);
      localStorage.setItem('categories', JSON.stringify(defaultCategories));
    }
  };

  const saveCategories = (newCategories: Category[]) => {
    setCategories(newCategories);
    localStorage.setItem('categories', JSON.stringify(newCategories));
  };

  const handleDelete = (id: number) => {
    const category = categories.find(c => c.id === id);
    if (category && category.propertyCount > 0) {
      alert(`لا يمكن حذف هذا الصنف لأنه يحتوي على ${category.propertyCount} عقار`);
      return;
    }
    
    if (confirm('هل أنت متأكد من حذف هذا الصنف؟')) {
      const newCategories = categories.filter(c => c.id !== id);
      saveCategories(newCategories);
    }
  };

  const toggleActive = (id: number) => {
    const newCategories = categories.map(c => 
      c.id === id ? { ...c, active: !c.active } : c
    );
    saveCategories(newCategories);
  };

  const getColorClasses = (color: string) => {
    const colorMap: { [key: string]: string } = {
      blue: 'bg-blue-100 text-blue-800 border-blue-200',
      green: 'bg-green-100 text-green-800 border-green-200',
      purple: 'bg-purple-100 text-purple-800 border-purple-200',
      yellow: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      red: 'bg-red-100 text-red-800 border-red-200',
      gray: 'bg-gray-100 text-gray-800 border-gray-200'
    };
    return colorMap[color] || colorMap.blue;
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
              <h1 className="text-2xl font-bold text-gray-900">إدارة الأصناف</h1>
            </div>
            <button
              onClick={() => setShowAddForm(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              + إضافة صنف جديد
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{categories.length}</div>
              <div className="text-sm text-gray-600">إجمالي الأصناف</div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {categories.filter(c => c.active).length}
              </div>
              <div className="text-sm text-gray-600">أصناف نشطة</div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600">
                {categories.filter(c => !c.active).length}
              </div>
              <div className="text-sm text-gray-600">أصناف معطلة</div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">
                {categories.reduce((sum, c) => sum + c.propertyCount, 0)}
              </div>
              <div className="text-sm text-gray-600">إجمالي العقارات</div>
            </div>
          </div>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <div key={category.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className={`p-6 border-l-4 ${getColorClasses(category.color)}`}>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <span className="text-3xl">{category.icon}</span>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{category.name}</h3>
                      <p className="text-sm text-gray-600">{category.propertyCount} عقار</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => toggleActive(category.id)}
                      className={`text-sm px-2 py-1 rounded ${
                        category.active 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {category.active ? 'نشط' : 'معطل'}
                    </button>
                  </div>
                </div>
                
                <p className="text-gray-700 text-sm mb-4">{category.description}</p>
                
                <div className="flex justify-between items-center">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => setEditingCategory(category)}
                      className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                    >
                      تعديل
                    </button>
                    <button
                      onClick={() => handleDelete(category.id)}
                      className="text-red-600 hover:text-red-800 text-sm font-medium"
                      disabled={category.propertyCount > 0}
                    >
                      حذف
                    </button>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full ${getColorClasses(category.color)}`}>
                    {category.color}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {categories.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📂</div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">لا توجد أصناف</h3>
            <p className="text-gray-600 mb-4">ابدأ بإضافة أول صنف للعقارات</p>
            <button
              onClick={() => setShowAddForm(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              إضافة صنف جديد
            </button>
          </div>
        )}
      </div>

      {/* Add/Edit Form Modal */}
      {(showAddForm || editingCategory) && (
        <CategoryFormModal
          category={editingCategory}
          onSave={(category) => {
            if (editingCategory) {
              // تعديل صنف موجود
              const newCategories = categories.map(c => 
                c.id === category.id ? category : c
              );
              saveCategories(newCategories);
            } else {
              // إضافة صنف جديد
              const newCategory = {
                ...category,
                id: Math.max(...categories.map(c => c.id), 0) + 1,
                propertyCount: 0
              };
              saveCategories([...categories, newCategory]);
            }
            setShowAddForm(false);
            setEditingCategory(null);
          }}
          onCancel={() => {
            setShowAddForm(false);
            setEditingCategory(null);
          }}
        />
      )}
    </div>
  );
}

// مكون نموذج إضافة/تعديل الصنف
function CategoryFormModal({ 
  category, 
  onSave, 
  onCancel 
}: { 
  category: Category | null;
  onSave: (category: Category) => void;
  onCancel: () => void;
}) {
  const [formData, setFormData] = useState<Omit<Category, 'id' | 'propertyCount'>>({
    name: category?.name || '',
    description: category?.description || '',
    icon: category?.icon || '🏠',
    color: category?.color || 'blue',
    active: category?.active ?? true
  });

  const availableIcons = ['🏠', '🏡', '🏢', '🏬', '🏭', '🏘️', '🏰', '🕌', '🏛️', '🏗️'];
  const availableColors = [
    { name: 'blue', label: 'أزرق' },
    { name: 'green', label: 'أخضر' },
    { name: 'purple', label: 'بنفسجي' },
    { name: 'yellow', label: 'أصفر' },
    { name: 'red', label: 'أحمر' },
    { name: 'gray', label: 'رمادي' }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...formData,
      id: category?.id || 0,
      propertyCount: category?.propertyCount || 0
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-md w-full">
        <div className="p-6">
          <h2 className="text-xl font-bold mb-4">
            {category ? 'تعديل الصنف' : 'إضافة صنف جديد'}
          </h2>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                اسم الصنف
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full border border-gray-300 rounded-md px-3 py-2"
                placeholder="مثال: شقة"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                الوصف
              </label>
              <textarea
                required
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                className="w-full border border-gray-300 rounded-md px-3 py-2"
                rows={3}
                placeholder="وصف مختصر للصنف"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                الأيقونة
              </label>
              <div className="grid grid-cols-5 gap-2">
                {availableIcons.map((icon) => (
                  <button
                    key={icon}
                    type="button"
                    onClick={() => setFormData({...formData, icon})}
                    className={`p-2 text-2xl border rounded-md hover:bg-gray-50 ${
                      formData.icon === icon ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
                    }`}
                  >
                    {icon}
                  </button>
                ))}
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                اللون
              </label>
              <div className="grid grid-cols-3 gap-2">
                {availableColors.map((color) => (
                  <button
                    key={color.name}
                    type="button"
                    onClick={() => setFormData({...formData, color: color.name})}
                    className={`p-2 text-sm border rounded-md hover:bg-gray-50 ${
                      formData.color === color.name ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
                    }`}
                  >
                    {color.label}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="flex items-center">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.active}
                  onChange={(e) => setFormData({...formData, active: e.target.checked})}
                  className="mr-2"
                />
                صنف نشط
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
                {category ? 'تحديث' : 'إضافة'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
