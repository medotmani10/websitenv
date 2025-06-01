// إعداد Storage في Supabase
const { createClient } = require('@supabase/supabase-js');

// قراءة متغيرات البيئة
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

console.log('📁 إعداد Storage في Supabase...');

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ متغيرات البيئة مفقودة!');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function createImagesBucket() {
  try {
    console.log('\n📦 إنشاء bucket للصور...');
    
    // إنشاء bucket
    const { data, error } = await supabase.storage.createBucket('property-images', {
      public: true,
      allowedMimeTypes: ['image/jpeg', 'image/png', 'image/webp', 'image/gif'],
      fileSizeLimit: 5242880 // 5MB
    });
    
    if (error) {
      if (error.message.includes('already exists')) {
        console.log('✅ bucket "property-images" موجود بالفعل!');
        return true;
      } else {
        console.error('❌ خطأ في إنشاء bucket:', error.message);
        return false;
      }
    }
    
    console.log('✅ تم إنشاء bucket "property-images" بنجاح!');
    return true;
    
  } catch (err) {
    console.error('❌ خطأ غير متوقع:', err.message);
    return false;
  }
}

async function setupStoragePolicies() {
  try {
    console.log('\n🔒 إعداد Storage policies...');
    
    // هذا يتطلب SQL policies، سنتركه للمستخدم
    console.log('💡 تحتاج إلى إعداد Storage policies يدوياً:');
    console.log('1. اذهب إلى Storage > property-images في Supabase Dashboard');
    console.log('2. اذهب إلى Policies');
    console.log('3. أضف policy للقراءة العامة:');
    console.log('   - Policy name: Public read access');
    console.log('   - Allowed operation: SELECT');
    console.log('   - Target roles: public');
    console.log('4. أضف policy للكتابة للمستخدمين المصادق عليهم:');
    console.log('   - Policy name: Authenticated upload');
    console.log('   - Allowed operation: INSERT');
    console.log('   - Target roles: authenticated');
    
    return true;
    
  } catch (err) {
    console.error('❌ خطأ في إعداد policies:', err.message);
    return false;
  }
}

// تشغيل الإعداد
createImagesBucket().then(bucketSuccess => {
  setupStoragePolicies().then(policiesSuccess => {
    console.log('\n📋 ملخص الإعداد:');
    console.log('📦 Bucket:', bucketSuccess ? '✅ جاهز' : '❌ فشل');
    console.log('🔒 Policies:', '⚠️ يحتاج إعداد يدوي');
    
    if (bucketSuccess) {
      console.log('\n🎉 Storage جاهز للاستخدام!');
      console.log('📁 يمكنك الآن رفع الصور في لوحة الإدارة.');
    }
  });
});
