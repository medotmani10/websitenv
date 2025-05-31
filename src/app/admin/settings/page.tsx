'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Settings {
  siteName: string;
  siteDescription: string;
  primaryPhone: string;
  secondaryPhone: string;
  email: string;
  address: string;
  workingHours: {
    weekdays: string;
    friday: string;
    emergency: string;
  };
  socialMedia: {
    whatsapp: string;
    facebook: string;
    instagram: string;
  };
  seo: {
    keywords: string;
    metaDescription: string;
  };
  features: {
    enableAnalytics: boolean;
    enableNotifications: boolean;
    enableBackup: boolean;
    maintenanceMode: boolean;
  };
}

export default function AdminSettings() {
  const [settings, setSettings] = useState<Settings>({
    siteName: '',
    siteDescription: '',
    primaryPhone: '',
    secondaryPhone: '',
    email: '',
    address: '',
    workingHours: {
      weekdays: '',
      friday: '',
      emergency: ''
    },
    socialMedia: {
      whatsapp: '',
      facebook: '',
      instagram: ''
    },
    seo: {
      keywords: '',
      metaDescription: ''
    },
    features: {
      enableAnalytics: false,
      enableNotifications: false,
      enableBackup: false,
      maintenanceMode: false
    }
  });

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState('general');
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');

  // التحقق من تسجيل الدخول
  useEffect(() => {
    const loggedIn = localStorage.getItem('adminLoggedIn');
    if (loggedIn !== 'true') {
      window.location.href = '/admin';
      return;
    }
    setIsLoggedIn(true);
    loadSettings();
  }, []);

  const loadSettings = () => {
    const savedSettings = localStorage.getItem('siteSettings');
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings));
    } else {
      // الإعدادات الافتراضية
      const defaultSettings: Settings = {
        siteName: 'كراء المنازل',
        siteDescription: 'موقع كراء المنازل في المغرب - نظام حجز بالهاتف فقط',
        primaryPhone: '+212 6 00 00 00 00',
        secondaryPhone: '+212 7 00 00 00 00',
        email: 'info@rental-homes.ma',
        address: 'شارع محمد الخامس، الرباط، المغرب',
        workingHours: {
          weekdays: '9:00 ص - 6:00 م',
          friday: '2:00 م - 6:00 م',
          emergency: '24/7'
        },
        socialMedia: {
          whatsapp: '+212600000000',
          facebook: '',
          instagram: ''
        },
        seo: {
          keywords: 'كراء المنازل, إيجار, المغرب, منازل للكراء, شقق للإيجار',
          metaDescription: 'موقع كراء المنازل في المغرب - نظام حجز بالهاتف فقط. اعثر على منزل أحلامك بمكالمة واحدة.'
        },
        features: {
          enableAnalytics: true,
          enableNotifications: true,
          enableBackup: true,
          maintenanceMode: false
        }
      };
      setSettings(defaultSettings);
      localStorage.setItem('siteSettings', JSON.stringify(defaultSettings));
    }
  };

  const saveSettings = async () => {
    setSaveStatus('saving');
    try {
      localStorage.setItem('siteSettings', JSON.stringify(settings));
      setSaveStatus('saved');
      setTimeout(() => setSaveStatus('idle'), 2000);
    } catch (error) {
      setSaveStatus('error');
      setTimeout(() => setSaveStatus('idle'), 2000);
    }
  };

  const handleInputChange = (section: keyof Settings, field: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [section]: typeof prev[section] === 'object' 
        ? { ...prev[section], [field]: value }
        : value
    }));
  };

  if (!isLoggedIn) {
    return <div>جاري التحميل...</div>;
  }

  const tabs = [
    { id: 'general', name: 'عام', icon: '⚙️' },
    { id: 'contact', name: 'الاتصال', icon: '📞' },
    { id: 'social', name: 'وسائل التواصل', icon: '📱' },
    { id: 'seo', name: 'SEO', icon: '🔍' },
    { id: 'features', name: 'المميزات', icon: '🎛️' }
  ];

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
              <h1 className="text-2xl font-bold text-gray-900">إعدادات الموقع</h1>
            </div>
            <button
              onClick={saveSettings}
              disabled={saveStatus === 'saving'}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                saveStatus === 'saving' 
                  ? 'bg-gray-400 text-white cursor-not-allowed'
                  : saveStatus === 'saved'
                  ? 'bg-green-600 text-white'
                  : saveStatus === 'error'
                  ? 'bg-red-600 text-white'
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              {saveStatus === 'saving' && '⏳ جاري الحفظ...'}
              {saveStatus === 'saved' && '✅ تم الحفظ'}
              {saveStatus === 'error' && '❌ خطأ في الحفظ'}
              {saveStatus === 'idle' && '💾 حفظ الإعدادات'}
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-1/4">
            <div className="bg-white rounded-lg shadow">
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">أقسام الإعدادات</h3>
                <nav className="space-y-2">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full text-right px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                        activeTab === tab.id
                          ? 'bg-blue-100 text-blue-700'
                          : 'text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      <span className="mr-2">{tab.icon}</span>
                      {tab.name}
                    </button>
                  ))}
                </nav>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="lg:w-3/4">
            <div className="bg-white rounded-lg shadow">
              <div className="p-6">
                {/* General Settings */}
                {activeTab === 'general' && (
                  <div className="space-y-6">
                    <h3 className="text-lg font-semibold text-gray-900">الإعدادات العامة</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          اسم الموقع
                        </label>
                        <input
                          type="text"
                          value={settings.siteName}
                          onChange={(e) => handleInputChange('siteName', '', e.target.value)}
                          className="w-full border border-gray-300 rounded-md px-3 py-2"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          البريد الإلكتروني
                        </label>
                        <input
                          type="email"
                          value={settings.email}
                          onChange={(e) => handleInputChange('email', '', e.target.value)}
                          className="w-full border border-gray-300 rounded-md px-3 py-2"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        وصف الموقع
                      </label>
                      <textarea
                        value={settings.siteDescription}
                        onChange={(e) => handleInputChange('siteDescription', '', e.target.value)}
                        className="w-full border border-gray-300 rounded-md px-3 py-2"
                        rows={3}
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        العنوان
                      </label>
                      <input
                        type="text"
                        value={settings.address}
                        onChange={(e) => handleInputChange('address', '', e.target.value)}
                        className="w-full border border-gray-300 rounded-md px-3 py-2"
                      />
                    </div>
                  </div>
                )}

                {/* Contact Settings */}
                {activeTab === 'contact' && (
                  <div className="space-y-6">
                    <h3 className="text-lg font-semibold text-gray-900">معلومات الاتصال</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          الهاتف الرئيسي
                        </label>
                        <input
                          type="text"
                          value={settings.primaryPhone}
                          onChange={(e) => handleInputChange('primaryPhone', '', e.target.value)}
                          className="w-full border border-gray-300 rounded-md px-3 py-2"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          الهاتف الثانوي
                        </label>
                        <input
                          type="text"
                          value={settings.secondaryPhone}
                          onChange={(e) => handleInputChange('secondaryPhone', '', e.target.value)}
                          className="w-full border border-gray-300 rounded-md px-3 py-2"
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <h4 className="text-md font-medium text-gray-900">ساعات العمل</h4>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            السبت - الخميس
                          </label>
                          <input
                            type="text"
                            value={settings.workingHours.weekdays}
                            onChange={(e) => handleInputChange('workingHours', 'weekdays', e.target.value)}
                            className="w-full border border-gray-300 rounded-md px-3 py-2"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            الجمعة
                          </label>
                          <input
                            type="text"
                            value={settings.workingHours.friday}
                            onChange={(e) => handleInputChange('workingHours', 'friday', e.target.value)}
                            className="w-full border border-gray-300 rounded-md px-3 py-2"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            الطوارئ
                          </label>
                          <input
                            type="text"
                            value={settings.workingHours.emergency}
                            onChange={(e) => handleInputChange('workingHours', 'emergency', e.target.value)}
                            className="w-full border border-gray-300 rounded-md px-3 py-2"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Social Media Settings */}
                {activeTab === 'social' && (
                  <div className="space-y-6">
                    <h3 className="text-lg font-semibold text-gray-900">وسائل التواصل الاجتماعي</h3>
                    
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          واتساب
                        </label>
                        <input
                          type="text"
                          value={settings.socialMedia.whatsapp}
                          onChange={(e) => handleInputChange('socialMedia', 'whatsapp', e.target.value)}
                          className="w-full border border-gray-300 rounded-md px-3 py-2"
                          placeholder="+212600000000"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          فيسبوك
                        </label>
                        <input
                          type="text"
                          value={settings.socialMedia.facebook}
                          onChange={(e) => handleInputChange('socialMedia', 'facebook', e.target.value)}
                          className="w-full border border-gray-300 rounded-md px-3 py-2"
                          placeholder="https://facebook.com/yourpage"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          إنستغرام
                        </label>
                        <input
                          type="text"
                          value={settings.socialMedia.instagram}
                          onChange={(e) => handleInputChange('socialMedia', 'instagram', e.target.value)}
                          className="w-full border border-gray-300 rounded-md px-3 py-2"
                          placeholder="https://instagram.com/yourpage"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* SEO Settings */}
                {activeTab === 'seo' && (
                  <div className="space-y-6">
                    <h3 className="text-lg font-semibold text-gray-900">إعدادات SEO</h3>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        الكلمات المفتاحية
                      </label>
                      <input
                        type="text"
                        value={settings.seo.keywords}
                        onChange={(e) => handleInputChange('seo', 'keywords', e.target.value)}
                        className="w-full border border-gray-300 rounded-md px-3 py-2"
                        placeholder="كلمة1, كلمة2, كلمة3"
                      />
                      <p className="text-sm text-gray-500 mt-1">افصل الكلمات بفاصلة</p>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        وصف Meta
                      </label>
                      <textarea
                        value={settings.seo.metaDescription}
                        onChange={(e) => handleInputChange('seo', 'metaDescription', e.target.value)}
                        className="w-full border border-gray-300 rounded-md px-3 py-2"
                        rows={3}
                        maxLength={160}
                      />
                      <p className="text-sm text-gray-500 mt-1">
                        {settings.seo.metaDescription.length}/160 حرف
                      </p>
                    </div>
                  </div>
                )}

                {/* Features Settings */}
                {activeTab === 'features' && (
                  <div className="space-y-6">
                    <h3 className="text-lg font-semibold text-gray-900">مميزات الموقع</h3>
                    
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                        <div>
                          <h4 className="text-sm font-medium text-gray-900">تفعيل الإحصائيات</h4>
                          <p className="text-sm text-gray-500">تتبع زوار الموقع والتفاعل</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={settings.features.enableAnalytics}
                            onChange={(e) => handleInputChange('features', 'enableAnalytics', e.target.checked)}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                      </div>
                      
                      <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                        <div>
                          <h4 className="text-sm font-medium text-gray-900">تفعيل الإشعارات</h4>
                          <p className="text-sm text-gray-500">إشعارات المكالمات والرسائل الجديدة</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={settings.features.enableNotifications}
                            onChange={(e) => handleInputChange('features', 'enableNotifications', e.target.checked)}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                      </div>
                      
                      <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                        <div>
                          <h4 className="text-sm font-medium text-gray-900">النسخ الاحتياطي التلقائي</h4>
                          <p className="text-sm text-gray-500">حفظ تلقائي للبيانات يومياً</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={settings.features.enableBackup}
                            onChange={(e) => handleInputChange('features', 'enableBackup', e.target.checked)}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                      </div>
                      
                      <div className="flex items-center justify-between p-4 border border-red-200 rounded-lg bg-red-50">
                        <div>
                          <h4 className="text-sm font-medium text-red-900">وضع الصيانة</h4>
                          <p className="text-sm text-red-600">إخفاء الموقع عن الزوار مؤقتاً</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={settings.features.maintenanceMode}
                            onChange={(e) => handleInputChange('features', 'maintenanceMode', e.target.checked)}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-red-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600"></div>
                        </label>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
