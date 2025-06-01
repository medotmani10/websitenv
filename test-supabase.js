// اختبار الاتصال بـ Supabase
const { createClient } = require('@supabase/supabase-js');

// قراءة متغيرات البيئة
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

console.log('🔗 اختبار الاتصال بـ Supabase...');
console.log('URL:', supabaseUrl);
console.log('Key:', supabaseKey ? 'موجود ✅' : 'مفقود ❌');

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ متغيرات البيئة مفقودة!');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function testConnection() {
  try {
    console.log('\n📊 اختبار قاعدة البيانات...');
    
    // اختبار الاتصال
    const { data, error } = await supabase
      .from('properties')
      .select('*')
      .limit(1);
    
    if (error) {
      console.error('❌ خطأ في الاتصال:', error.message);
      
      if (error.message.includes('relation "properties" does not exist')) {
        console.log('\n💡 يبدو أن جدول properties غير موجود.');
        console.log('📋 تحتاج إلى تشغيل سكريبت SQL في Supabase Dashboard:');
        console.log('1. اذهب إلى https://supabase.com/dashboard');
        console.log('2. افتح مشروعك');
        console.log('3. اذهب إلى SQL Editor');
        console.log('4. انسخ والصق محتوى database/schema.sql');
        console.log('5. اضغط Run');
      }
      
      return false;
    }
    
    console.log('✅ الاتصال ناجح!');
    console.log('📊 البيانات:', data);
    return true;
    
  } catch (err) {
    console.error('❌ خطأ غير متوقع:', err.message);
    return false;
  }
}

async function testStorage() {
  try {
    console.log('\n📁 اختبار Storage...');
    
    const { data, error } = await supabase.storage.listBuckets();
    
    if (error) {
      console.error('❌ خطأ في Storage:', error.message);
      return false;
    }
    
    console.log('✅ Storage يعمل!');
    console.log('📦 Buckets:', data.map(b => b.name));
    
    // التحقق من وجود bucket للصور
    const imagesBucket = data.find(b => b.name === 'property-images');
    if (!imagesBucket) {
      console.log('\n💡 bucket "property-images" غير موجود.');
      console.log('📋 تحتاج إلى إنشاؤه:');
      console.log('1. اذهب إلى Storage في Supabase Dashboard');
      console.log('2. انقر Create a new bucket');
      console.log('3. اسم البكت: property-images');
      console.log('4. اجعله Public');
    } else {
      console.log('✅ bucket "property-images" موجود!');
    }
    
    return true;
    
  } catch (err) {
    console.error('❌ خطأ في Storage:', err.message);
    return false;
  }
}

// تشغيل الاختبارات
testConnection().then(dbSuccess => {
  testStorage().then(storageSuccess => {
    console.log('\n📋 ملخص النتائج:');
    console.log('🔗 الاتصال:', dbSuccess ? '✅ يعمل' : '❌ لا يعمل');
    console.log('📁 Storage:', storageSuccess ? '✅ يعمل' : '❌ لا يعمل');
    
    if (dbSuccess && storageSuccess) {
      console.log('\n🎉 Supabase مُعد بالكامل وجاهز للاستخدام!');
    } else {
      console.log('\n⚠️  تحتاج إلى إكمال الإعداد كما هو موضح أعلاه.');
    }
  });
});
