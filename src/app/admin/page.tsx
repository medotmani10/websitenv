'use client';

import { useEffect } from 'react';

export default function AdminRedirect() {
  useEffect(() => {
    // إعادة توجيه إلى المسار الجديد
    window.location.href = '/dashboard-admin-2024';
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="text-center max-w-md mx-auto">
        <div className="text-6xl mb-4">🔄</div>
        <h1 className="text-2xl font-bold text-gray-900 mb-4">جاري إعادة التوجيه...</h1>
        <p className="text-gray-600 mb-6">يتم نقلك إلى لوحة التحكم الجديدة</p>
        
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
          <div className="flex items-center">
            <div className="text-2xl mr-3">🔒</div>
            <div className="text-left">
              <p className="text-yellow-800 text-sm font-medium">تم نقل لوحة التحكم لحماية أفضل</p>
              <p className="text-yellow-700 text-xs">المسار الجديد محمي ومخفي عن الزوار</p>
            </div>
          </div>
        </div>
        
        <a 
          href="/dashboard-admin-2024" 
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors inline-block"
        >
          انقر هنا إذا لم يتم التوجيه تلقائياً
        </a>
        
        <div className="mt-6 text-sm text-gray-500">
          <p>المسار الجديد: <code className="bg-gray-200 px-2 py-1 rounded">/dashboard-admin-2024</code></p>
        </div>
      </div>
    </div>
  );
}
