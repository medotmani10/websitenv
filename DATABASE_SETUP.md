# إعداد قاعدة البيانات - Supabase

## 🚀 خطوات الإعداد

### 1. إنشاء حساب Supabase
1. اذهب إلى [supabase.com](https://supabase.com)
2. انقر على "Start your project"
3. سجل دخول باستخدام GitHub أو البريد الإلكتروني
4. انقر على "New Project"

### 2. إعداد المشروع
1. اختر Organization (أو أنشئ واحدة جديدة)
2. أدخل اسم المشروع: `beity-rental`
3. أدخل كلمة مرور قاعدة البيانات (احفظها!)
4. اختر المنطقة الأقرب لك
5. انقر على "Create new project"

### 3. الحصول على مفاتيح API
بعد إنشاء المشروع:
1. اذهب إلى Settings > API
2. انسخ:
   - `Project URL`
   - `anon public` key
   - `service_role` key (سري!)

### 4. إعداد متغيرات البيئة
1. افتح ملف `.env.local` في مجلد المشروع
2. استبدل القيم بالمفاتيح الخاصة بك:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

### 5. إنشاء الجداول
1. اذهب إلى SQL Editor في لوحة تحكم Supabase
2. انسخ محتوى ملف `database/schema.sql`
3. الصق الكود واضغط "Run"

### 6. إعداد Storage للصور
1. اذهب إلى Storage في لوحة تحكم Supabase
2. انقر على "Create a new bucket"
3. اسم البكت: `property-images`
4. اجعله Public: ✅
5. انقر على "Create bucket"

### 7. إعداد RLS Policies
الـ SQL المرفق يتضمن بالفعل Row Level Security policies، لكن تأكد من:
1. Properties: يمكن للجميع القراءة، المصادقون فقط يمكنهم الكتابة
2. User Profiles: المستخدمون يمكنهم رؤية ملفاتهم فقط
3. Bookings: المستخدمون يمكنهم رؤية حجوزاتهم فقط

## 🔧 اختبار الاتصال

### تشغيل المشروع
```bash
npm run dev
```

### التحقق من الاتصال
1. اذهب إلى `/admin/properties`
2. سجل دخول كمدير
3. جرب إضافة عقار جديد
4. تحقق من ظهور البيانات في Supabase Dashboard

## 📊 هيكل قاعدة البيانات

### جدول Properties
- `id`: معرف فريد
- `title`: عنوان العقار
- `location`: الموقع
- `price`: السعر
- `bedrooms`: عدد غرف النوم
- `bathrooms`: عدد الحمامات
- `area`: المساحة
- `phone`: رقم الهاتف
- `features`: المميزات (array)
- `category`: نوع العقار
- `status`: الحالة (available/rented/maintenance)
- `featured`: مميز (boolean)
- `images`: الصور (array)
- `main_image`: الصورة الرئيسية
- `created_at`: تاريخ الإنشاء
- `updated_at`: تاريخ التحديث

### جدول User Profiles
- `id`: معرف المستخدم (مرتبط بـ auth.users)
- `full_name`: الاسم الكامل
- `phone`: رقم الهاتف
- `role`: الدور (admin/user)

### جدول Bookings
- `id`: معرف الحجز
- `property_id`: معرف العقار
- `user_id`: معرف المستخدم
- `start_date`: تاريخ البداية
- `end_date`: تاريخ النهاية
- `total_price`: السعر الإجمالي
- `status`: حالة الحجز
- `notes`: ملاحظات

### جدول Contacts
- `id`: معرف الرسالة
- `name`: الاسم
- `email`: البريد الإلكتروني
- `phone`: الهاتف
- `subject`: الموضوع
- `message`: الرسالة
- `status`: الحالة

## 🛠️ استكشاف الأخطاء

### خطأ في الاتصال
- تأكد من صحة URL ومفاتيح API
- تحقق من إعدادات الشبكة
- تأكد من تشغيل Supabase project

### خطأ في الصلاحيات
- تحقق من RLS policies
- تأكد من تسجيل دخول المستخدم
- راجع إعدادات Authentication

### خطأ في رفع الصور
- تأكد من إنشاء bucket `property-images`
- تحقق من أن البكت public
- راجع إعدادات Storage policies

## 📞 الدعم
إذا واجهت أي مشاكل:
1. راجع [Supabase Documentation](https://supabase.com/docs)
2. تحقق من Console logs في المتصفح
3. راجع Supabase Dashboard للأخطاء
