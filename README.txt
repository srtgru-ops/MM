نظام إدارة مركز محترف - نسخة أولية

1) افتح google-apps-script.gs وضع معرّفات ملفات Google Sheets الأربعة داخل SOURCES.
2) الصق الكود في مشروع Apps Script واحد.
3) انشره كـ Web App واختر Execute as: Me وWho has access: Anyone.
4) ضع رابط النشر في API_URL داخل index.html.
5) افتح index.html؛ سيتم جلب بيانات جميع النماذج تلقائيًا وتحديثها كل 20 ثانية.

لا توجد كلمة مرور أو مفتاح ربط في الواجهة، والاتصال يتم تلقائيًا عند فتح الموقع.

إعداد Firebase Firestore:
1) من Firebase Console افتح Build > Firestore Database وأنشئ قاعدة البيانات.
2) من تبويب Rules الصق محتوى الملف firestore.rules ثم اضغط Publish.
3) سيحفظ الموقع حالة التواصل وطريقة الدفع والملاحظات داخل مجموعة registrationTracking.
