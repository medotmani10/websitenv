'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function AdminDashboard() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [adminUser, setAdminUser] = useState('');
  const router = useRouter();

  useEffect(() => {
    // التحقق من تسجيل الدخول
    const loggedIn = localStorage.getItem('adminLoggedIn');
    const user = localStorage.getItem('adminUser');

    if (loggedIn !== 'true') {
      router.push('/dashboard-admin-2024/login');
      return;
    }

    setIsLoggedIn(true);
    setAdminUser(user || 'المدير');
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('adminLoggedIn');
    localStorage.removeItem('adminUser');
    router.push('/');
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-4">🔒</div>
          <p>جاري التحقق من الصلاحيات...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <Link href="/" className="text-blue-600 hover:text-blue-800">
                ← العودة للموقع
              </Link>
              <h1 className="text-2xl font-bold text-gray-900">🔒 لوحة التحكم الإدارية</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">مرحباً، {adminUser}</span>
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Message */}
        <div className="bg-blue-50 border-l-4 border-blue-500 p-6 mb-8">
          <div className="flex">
            <div className="flex-shrink-0">
              <div className="text-2xl">👋</div>
            </div>
            <div className="ml-3">
              <h3 className="text-lg font-medium text-blue-900">مرحباً بك في لوحة التحكم الآمنة</h3>
              <p className="text-blue-700">يمكنك إدارة جميع جوانب الموقع من هنا بأمان تام</p>
            </div>
          </div>
        </div>

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
              <div className="text-3xl text-green-600">✅</div>
              <div className="mr-4">
                <p className="text-sm font-medium text-gray-600">متاح للإيجار</p>
                <p className="text-2xl font-bold text-gray-900">6</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="text-3xl text-yellow-600">⭐</div>
              <div className="mr-4">
                <p className="text-sm font-medium text-gray-600">عقارات مميزة</p>
                <p className="text-2xl font-bold text-gray-900">3</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="text-3xl text-purple-600">👁️</div>
              <div className="mr-4">
                <p className="text-sm font-medium text-gray-600">المشاهدات اليوم</p>
                <p className="text-2xl font-bold text-gray-900">127</p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Link href="/dashboard-admin-2024/properties" className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow">
            <div className="text-center">
              <div className="text-4xl mb-4">🏠</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">إدارة العقارات</h3>
              <p className="text-gray-600">إضافة وتعديل وحذف العقارات</p>
            </div>
          </Link>

          <div className="bg-gray-100 rounded-lg shadow p-6 opacity-50">
            <div className="text-center">
              <div className="text-4xl mb-4">📂</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">إدارة الأصناف</h3>
              <p className="text-gray-600">قريباً...</p>
            </div>
          </div>

          <div className="bg-gray-100 rounded-lg shadow p-6 opacity-50">
            <div className="text-center">
              <div className="text-4xl mb-4">⚙️</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">الإعدادات</h3>
              <p className="text-gray-600">قريباً...</p>
            </div>
          </div>
        </div>

        {/* Security Notice */}
        <div className="mt-8 bg-yellow-50 border-l-4 border-yellow-400 p-6">
          <div className="flex">
            <div className="flex-shrink-0">
              <div className="text-2xl">🔒</div>
            </div>
            <div className="ml-3">
              <h3 className="text-lg font-medium text-yellow-900">تنبيه أمني</h3>
              <p className="text-yellow-700">
                هذه لوحة تحكم سرية ومحمية. لا تشارك رابط هذه الصفحة مع أي شخص غير مخول.
                <br />
                المسار الآمن: <code className="bg-yellow-200 px-2 py-1 rounded">/dashboard-admin-2024</code>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}