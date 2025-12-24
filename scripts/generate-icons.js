const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// Create a simple fish icon SVG
const fishSvg = `
<svg width="512" height="512" xmlns="http://www.w3.org/2000/svg">
  <rect width="512" height="512" fill="#2563EB" rx="64"/>
  <text x="256" y="370" font-size="320" text-anchor="middle" fill="white">🎣</text>
</svg>
`;

async function generateIcons() {
  const publicDir = path.join(__dirname, '../public');

  // Ensure public directory exists
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  // Generate 192x192 icon
  await sharp(Buffer.from(fishSvg))
    .resize(192, 192)
    .png()
    .toFile(path.join(publicDir, 'icon-192.png'));

  // Generate 512x512 icon
  await sharp(Buffer.from(fishSvg))
    .resize(512, 512)
    .png()
    .toFile(path.join(publicDir, 'icon-512.png'));

  // Generate favicon
  await sharp(Buffer.from(fishSvg))
    .resize(32, 32)
    .png()
    .toFile(path.join(publicDir, 'favicon.ico'));

  console.log('✅ Icons generated successfully!');
  console.log('   - icon-192.png');
  console.log('   - icon-512.png');
  console.log('   - favicon.ico');
}

generateIcons().catch(console.error);
