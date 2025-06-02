'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLogin() {
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // التحقق من تسجيل الدخول المسبق
    const loggedIn = localStorage.getItem('adminLoggedIn');
    if (loggedIn === 'true') {
      router.push('/dashboard-admin-2024');
    }
  }, [router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    // محاكاة تأخير الشبكة
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // بيانات تسجيل الدخول (يمكن تغييرها)
    const validCredentials = [
      { username: 'admin', password: 'admin2024' },
      { username: 'manager', password: 'manager123' },
      { username: 'beity', password: 'beity2024' }
    ];
    
    const isValid = validCredentials.some(
      cred => cred.username === credentials.username && cred.password === credentials.password
    );
    
    if (isValid) {
      localStorage.setItem('adminLoggedIn', 'true');
      localStorage.setItem('adminUser', credentials.username);
      router.push('/dashboard-admin-2024');
    } else {
      setError('اسم المستخدم أو كلمة المرور غير صحيحة');
    }
    
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 to-purple-900 flex items-center justify-center">
      <div className="max-w-md w-full mx-4">
        {/* Logo/Header */}
        <div className="text-center mb-8">
          <div className="text-6xl mb-4">🔒</div>
          <h1 className="text-3xl font-bold text-white mb-2">لوحة التحكم الإدارية</h1>
          <p className="text-blue-200">موقع بيتي للعقارات</p>
        </div>

        {/* Login Form */}
        <div className="bg-white rounded-lg shadow-xl p-8">
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
                اسم المستخدم
              </label>
              <input
                type="text"
                id="username"
                value={credentials.username}
                onChange={(e) => setCredentials({...credentials, username: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="أدخل اسم المستخدم"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                كلمة المرور
              </label>
              <input
                type="password"
                id="password"
                value={credentials.password}
                onChange={(e) => setCredentials({...credentials, password: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="أدخل كلمة المرور"
                required
              />
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'جاري تسجيل الدخول...' : 'تسجيل الدخول'}
            </button>
          </form>

          {/* Demo Credentials */}
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <h3 className="text-sm font-medium text-gray-700 mb-2">بيانات تجريبية:</h3>
            <div className="text-xs text-gray-600 space-y-1">
              <div>المدير: <code>admin</code> / <code>admin2024</code></div>
              <div>المدير: <code>manager</code> / <code>manager123</code></div>
              <div>بيتي: <code>beity</code> / <code>beity2024</code></div>
            </div>
          </div>
        </div>

        {/* Security Notice */}
        <div className="mt-6 text-center text-blue-200 text-sm">
          <p>🔐 هذه منطقة محمية - للمخولين فقط</p>
          <p className="mt-2">المسار السري: /dashboard-admin-2024</p>
        </div>
      </div>
    </div>
  );
}
