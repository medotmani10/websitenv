'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function AdminLogin() {
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // بيانات تسجيل الدخول الافتراضية (يمكن تغييرها لاحقاً)
    if (credentials.username === 'admin' && credentials.password === 'admin123') {
      setIsLoggedIn(true);
      setError('');
      // حفظ حالة تسجيل الدخول في localStorage
      localStorage.setItem('adminLoggedIn', 'true');
    } else {
      setError('اسم المستخدم أو كلمة المرور غير صحيحة');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('adminLoggedIn');
  };

  // التحقق من حالة تسجيل الدخول عند تحميل الصفحة
  useEffect(() => {
    const loggedIn = localStorage.getItem('adminLoggedIn');
    if (loggedIn === 'true') {
      setIsLoggedIn(true);
    }
  }, []);

  if (isLoggedIn) {
    return (
      <div className="min-h-screen bg-gray-100">
        {/* Header */}
        <header className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-4">
              <div className="flex items-center">
                <h1 className="text-2xl font-bold text-gray-900">🏠 لوحة التحكم الإدارية</h1>
              </div>
              <div className="flex items-center space-x-4">
                <Link href="/" className="text-blue-600 hover:text-blue-800">
                  عرض الموقع
                </Link>
                <button
                  onClick={handleLogout}
                  className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
                >
                  تسجيل الخروج
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="text-3xl text-blue-600">🏠</div>
                <div className="mr-4">
                  <p className="text-sm font-medium text-gray-600">إجمالي العقارات</p>
                  <p className="text-2xl font-bold text-gray-900">6</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="text-3xl text-green-600">📞</div>
                <div className="mr-4">
                  <p className="text-sm font-medium text-gray-600">المكالمات اليوم</p>
                  <p className="text-2xl font-bold text-gray-900">12</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="text-3xl text-purple-600">👥</div>
                <div className="mr-4">
                  <p className="text-sm font-medium text-gray-600">الزوار اليوم</p>
                  <p className="text-2xl font-bold text-gray-900">45</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="text-3xl text-yellow-600">⭐</div>
                <div className="mr-4">
                  <p className="text-sm font-medium text-gray-600">العقارات المميزة</p>
                  <p className="text-2xl font-bold text-gray-900">3</p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Link href="/admin/properties" className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow">
              <div className="text-center">
                <div className="text-4xl mb-4">🏠</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">إدارة العقارات</h3>
                <p className="text-gray-600">إضافة وتعديل وحذف العقارات</p>
              </div>
            </Link>

            <Link href="/admin/categories" className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow">
              <div className="text-center">
                <div className="text-4xl mb-4">📂</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">إدارة الأصناف</h3>
                <p className="text-gray-600">إضافة وتعديل أنواع العقارات</p>
              </div>
            </Link>

            <Link href="/admin/settings" className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow">
              <div className="text-center">
                <div className="text-4xl mb-4">⚙️</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">الإعدادات</h3>
                <p className="text-gray-600">إعدادات الموقع ومعلومات الاتصال</p>
              </div>
            </Link>

            <Link href="/admin/analytics" className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow">
              <div className="text-center">
                <div className="text-4xl mb-4">📊</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">الإحصائيات</h3>
                <p className="text-gray-600">تقارير الزوار والمكالمات</p>
              </div>
            </Link>

            <Link href="/admin/messages" className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow">
              <div className="text-center">
                <div className="text-4xl mb-4">💬</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">الرسائل</h3>
                <p className="text-gray-600">رسائل العملاء والاستفسارات</p>
              </div>
            </Link>

            <Link href="/admin/backup" className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow">
              <div className="text-center">
                <div className="text-4xl mb-4">💾</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">النسخ الاحتياطي</h3>
                <p className="text-gray-600">حفظ واستعادة البيانات</p>
              </div>
            </Link>
          </div>

          {/* Recent Activity */}
          <div className="mt-8 bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">النشاط الأخير</h3>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="text-2xl">🏠</div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">تم إضافة عقار جديد: فيلا في الرباط</p>
                    <p className="text-xs text-gray-500">منذ ساعتين</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-2xl">📞</div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">مكالمة جديدة للاستفسار عن شقة في الدار البيضاء</p>
                    <p className="text-xs text-gray-500">منذ 3 ساعات</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-2xl">✏️</div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">تم تحديث معلومات عقار في طنجة</p>
                    <p className="text-xs text-gray-500">منذ 5 ساعات</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            🏠 لوحة التحكم الإدارية
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            تسجيل الدخول للوصول إلى لوحة التحكم
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleLogin}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <input
                type="text"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="اسم المستخدم"
                value={credentials.username}
                onChange={(e) => setCredentials({...credentials, username: e.target.value})}
              />
            </div>
            <div>
              <input
                type="password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="كلمة المرور"
                value={credentials.password}
                onChange={(e) => setCredentials({...credentials, password: e.target.value})}
              />
            </div>
          </div>

          {error && (
            <div className="text-red-600 text-sm text-center">{error}</div>
          )}

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              تسجيل الدخول
            </button>
          </div>

          <div className="text-center text-sm text-gray-600">
            <p>بيانات تسجيل الدخول الافتراضية:</p>
            <p>اسم المستخدم: <strong>admin</strong></p>
            <p>كلمة المرور: <strong>admin123</strong></p>
          </div>
        </form>
      </div>
    </div>
  );
}
