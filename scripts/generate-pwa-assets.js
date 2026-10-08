import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

async function generateAssets() {
  const publicDir = path.resolve('public');
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  const svgPath = path.join(publicDir, 'icon.svg');
  const svgBuffer = fs.readFileSync(svgPath);

  console.log('Generating PWA Icons from icon.svg...');

  // 1. pwa-192x192.png
  await sharp(svgBuffer)
    .resize(192, 192)
    .png()
    .toFile(path.join(publicDir, 'pwa-192x192.png'));
  console.log('✓ Generated pwa-192x192.png');

  // 2. pwa-512x512.png
  await sharp(svgBuffer)
    .resize(512, 512)
    .png()
    .toFile(path.join(publicDir, 'pwa-512x512.png'));
  console.log('✓ Generated pwa-512x512.png');

  // 3. apple-touch-icon.png (180x180)
  await sharp(svgBuffer)
    .resize(180, 180)
    .png()
    .toFile(path.join(publicDir, 'apple-touch-icon.png'));
  console.log('✓ Generated apple-touch-icon.png');

  // 4. pwa-maskable-512x512.png (512x512 with 15% safe-zone margin)
  // Inner icon ~ 410x410 centered on 512x512 background
  const innerIcon = await sharp(svgBuffer)
    .resize(400, 400)
    .toBuffer();

  await sharp({
    create: {
      width: 512,
      height: 512,
      channels: 4,
      background: { r: 15, g: 23, b: 42, alpha: 1 } // #0f172a theme dark
    }
  })
    .composite([{ input: innerIcon, top: 56, left: 56 }])
    .png()
    .toFile(path.join(publicDir, 'pwa-maskable-512x512.png'));
  console.log('✓ Generated pwa-maskable-512x512.png');

  // 5. screenshot-narrow.png for Mobile (720 x 1280 portrait - standard HD mobile)
  const mobileSvg = `
  <svg width="720" height="1280" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="bg" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#0f172a"/>
        <stop offset="30%" stop-color="#0369a1"/>
        <stop offset="100%" stop-color="#0284c7"/>
      </linearGradient>
    </defs>
    <rect width="720" height="1280" fill="url(#bg)"/>
    <rect x="30" y="60" width="660" height="100" rx="16" fill="#ffffff" fill-opacity="0.12"/>
    <text x="60" y="115" font-family="sans-serif" font-size="34" font-weight="bold" fill="#ffffff">ShishuDose BD</text>
    <text x="60" y="145" font-family="sans-serif" font-size="20" fill="#bae6fd">Pediatric Clinical Dosing &amp; Emergency Protocols</text>
    
    <!-- Drug Card Mockup -->
    <rect x="30" y="190" width="660" height="300" rx="20" fill="#ffffff"/>
    <rect x="50" y="215" width="220" height="28" rx="6" fill="#0284c7" fill-opacity="0.15"/>
    <text x="60" y="235" font-family="sans-serif" font-size="18" font-weight="bold" fill="#0369a1">Paracetamol (Napa/Ace)</text>
    <text x="50" y="280" font-family="sans-serif" font-size="28" font-weight="bold" fill="#0f172a">15 mg/kg/dose</text>
    <text x="50" y="320" font-family="sans-serif" font-size="22" fill="#334155">Syrup: 120 mg / 5 ml</text>
    <rect x="50" y="360" width="620" height="90" rx="14" fill="#f0fdf4" stroke="#86efac" stroke-width="2"/>
    <text x="75" y="415" font-family="sans-serif" font-size="24" font-weight="bold" fill="#15803d">Calculated Dose: 3.1 ml (দিনে ৪ বার)</text>

    <!-- Emergency Mockup -->
    <rect x="30" y="520" width="660" height="240" rx="20" fill="#ffffff"/>
    <rect x="50" y="545" width="280" height="28" rx="6" fill="#fee2e2"/>
    <text x="60" y="565" font-family="sans-serif" font-size="18" font-weight="bold" fill="#dc2626">Emergency Crash Protocol</text>
    <text x="50" y="615" font-family="sans-serif" font-size="26" font-weight="bold" fill="#0f172a">Status Epilepticus &amp; Shock</text>
    <text x="50" y="660" font-family="sans-serif" font-size="20" fill="#475569">Inj. Diazepam, Inj. Midazolam, IV Fluid Resuscitation</text>

    <!-- Prescription Mockup -->
    <rect x="30" y="790" width="660" height="380" rx="20" fill="#ffffff"/>
    <text x="50" y="840" font-family="sans-serif" font-size="26" font-weight="bold" fill="#0f172a">Pediatric Prescription Pad</text>
    <text x="50" y="880" font-family="sans-serif" font-size="20" fill="#64748b">Lead Clinician: Dr. Ashraful Haque Oly</text>
    <rect x="50" y="910" width="620" height="70" rx="10" fill="#f8fafc" stroke="#e2e8f0"/>
    <text x="70" y="955" font-family="sans-serif" font-size="20" fill="#334155">1. Syp. Cefixime (100mg/5ml) - 4.5 ml দিনে ২ বার (৭ দিন)</text>
    <rect x="50" y="1000" width="620" height="70" rx="10" fill="#f8fafc" stroke="#e2e8f0"/>
    <text x="70" y="1045" font-family="sans-serif" font-size="20" fill="#334155">2. Syp. Salbutamol (2mg/5ml) - 2.5 ml দিনে ৩ বার (৫ দিন)</text>
    <rect x="50" y="1090" width="300" height="55" rx="12" fill="#0284c7"/>
    <text x="90" y="1125" font-family="sans-serif" font-size="20" font-weight="bold" fill="#ffffff">পিডিএফ ডাউনলোড</text>
  </svg>
  `;

  await sharp(Buffer.from(mobileSvg))
    .png()
    .toFile(path.join(publicDir, 'screenshot-narrow.png'));
  console.log('✓ Generated screenshot-narrow.png (720x1280 mobile portrait)');

  // 6. screenshot-wide.png for Desktop (1280 x 720 landscape - standard HD desktop)
  const desktopSvg = `
  <svg width="1280" height="720" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="bgDesk" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="#0f172a"/>
        <stop offset="40%" stop-color="#0369a1"/>
        <stop offset="100%" stop-color="#0284c7"/>
      </linearGradient>
    </defs>
    <rect width="1280" height="720" fill="url(#bgDesk)"/>
    
    <!-- Top Header -->
    <rect x="40" y="30" width="1200" height="80" rx="16" fill="#ffffff" fill-opacity="0.12"/>
    <text x="70" y="78" font-family="sans-serif" font-size="30" font-weight="bold" fill="#ffffff">ShishuDose BD - Bangladesh Pediatric Clinical Toolkit</text>
    <text x="70" y="100" font-family="sans-serif" font-size="16" fill="#bae6fd">By Dr. Ashraful Haque Oly (ডাঃ আশরাফুল হক অলি) | DGDA, ICDDR,B &amp; WHO IMCI Compliant</text>

    <!-- Column 1: Patient Profile & Quick Tabs -->
    <rect x="40" y="130" width="380" height="540" rx="16" fill="#ffffff"/>
    <text x="65" y="175" font-family="sans-serif" font-size="22" font-weight="bold" fill="#0f172a">Patient Profile</text>
    <rect x="65" y="195" width="330" height="50" rx="10" fill="#f0f9ff" stroke="#bae6fd"/>
    <text x="80" y="228" font-family="sans-serif" font-size="16" font-weight="bold" fill="#0369a1">Weight: 10.0 kg | Age: 2 Years</text>
    <text x="65" y="280" font-family="sans-serif" font-size="16" font-weight="bold" fill="#334155">Clinical Modules:</text>
    <rect x="65" y="300" width="330" height="45" rx="8" fill="#e0f2fe"/>
    <text x="80" y="330" font-family="sans-serif" font-size="15" font-weight="bold" fill="#0369a1">💊 Drug Dosage Directory</text>
    <rect x="65" y="355" width="330" height="45" rx="8" fill="#fee2e2"/>
    <text x="80" y="385" font-family="sans-serif" font-size="15" font-weight="bold" fill="#b91c1c">🚨 Emergency Crash Protocol</text>
    <rect x="65" y="410" width="330" height="45" rx="8" fill="#ecfdf5"/>
    <text x="80" y="440" font-family="sans-serif" font-size="15" font-weight="bold" fill="#047857">💧 Dehydration &amp; ORS Fluid Plan</text>
    <rect x="65" y="465" width="330" height="45" rx="8" fill="#fef3c7"/>
    <text x="80" y="495" font-family="sans-serif" font-size="15" font-weight="bold" fill="#b45309">🫁 WHO IMCI Pneumonia Counter</text>
    <rect x="65" y="520" width="330" height="45" rx="8" fill="#f1f5f9"/>
    <text x="80" y="550" font-family="sans-serif" font-size="15" font-weight="bold" fill="#475569">📝 Multi-Drug Prescription Pad</text>

    <!-- Column 2 & 3: Drug Calculator & Prescription Pad -->
    <rect x="445" y="130" width="795" height="540" rx="16" fill="#ffffff"/>
    <text x="475" y="175" font-family="sans-serif" font-size="22" font-weight="bold" fill="#0f172a">Pediatric Multi-Medication Prescription Pad</text>
    <text x="475" y="202" font-family="sans-serif" font-size="14" fill="#64748b">Complete clinical Rx summary with diagnosis, investigations &amp; exact syringe mL volume</text>

    <rect x="475" y="225" width="735" height="90" rx="12" fill="#f8fafc" stroke="#e2e8f0"/>
    <text x="495" y="260" font-family="sans-serif" font-size="17" font-weight="bold" fill="#0f172a">1. Syp. Azithromycin (200mg/5ml)</text>
    <text x="495" y="290" font-family="sans-serif" font-size="15" fill="#0284c7">Dose: 2.5 ml (100 mg) — দিনে ১ বার (৫ দিন) | খাবার ১ ঘণ্টা আগে বা ২ ঘণ্টা পরে</text>

    <rect x="475" y="325" width="735" height="90" rx="12" fill="#f8fafc" stroke="#e2e8f0"/>
    <text x="495" y="360" font-family="sans-serif" font-size="17" font-weight="bold" fill="#0f172a">2. Syp. Paracetamol (120mg/5ml)</text>
    <text x="495" y="390" font-family="sans-serif" font-size="15" fill="#0284c7">Dose: 6.2 ml (150 mg) — জ্বর আসলে ৬-৮ ঘণ্টা পরপর (সর্বোচ্চ ৪ বার)</text>

    <rect x="475" y="425" width="735" height="90" rx="12" fill="#f8fafc" stroke="#e2e8f0"/>
    <text x="495" y="460" font-family="sans-serif" font-size="17" font-weight="bold" fill="#0f172a">3. Syp. Zinc Sulphate (20mg/5ml)</text>
    <text x="495" y="490" font-family="sans-serif" font-size="15" fill="#0284c7">Dose: 5.0 ml (20 mg) — দিনে ১ বার (১৪ দিন) | ডায়রিয়া চিকিৎসায় ও প্রতিরোধে</text>

    <rect x="475" y="535" width="220" height="50" rx="10" fill="#0284c7"/>
    <text x="515" y="567" font-family="sans-serif" font-size="16" font-weight="bold" fill="#ffffff">📥 পিডিএফ ডাউনলোড</text>

    <rect x="710" y="535" width="200" height="50" rx="10" fill="#0f172a"/>
    <text x="755" y="567" font-family="sans-serif" font-size="16" font-weight="bold" fill="#ffffff">🖨️ প্রিন্ট করুন</text>
  </svg>
  `;

  await sharp(Buffer.from(desktopSvg))
    .png()
    .toFile(path.join(publicDir, 'screenshot-wide.png'));
  console.log('✓ Generated screenshot-wide.png (1280x720 desktop landscape)');
  console.log('All PWA assets successfully generated!');
}

generateAssets().catch(console.error);
