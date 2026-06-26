const fs = require('fs');

function getPngDimensions(filePath) {
  try {
    const buffer = fs.readFileSync(filePath);
    // PNG signature check
    if (buffer.readUInt32BE(0) !== 0x89504E47 || buffer.readUInt32BE(4) !== 0x0D0A1A0A) {
      return { error: 'Not a valid PNG file' };
    }
    // IHDR chunk starts at byte 12
    const width = buffer.readUInt32BE(16);
    const height = buffer.readUInt32BE(20);
    return { width, height, size: buffer.length };
  } catch (e) {
    return { error: e.message };
  }
}

console.log('loginsideimage.png:', getPngDimensions('c:\\yora\\loginsideimage.png'));
console.log('Screenshot_2026-06-23_195625-removebg-preview.png:', getPngDimensions('c:\\yora\\Screenshot_2026-06-23_195625-removebg-preview.png'));
