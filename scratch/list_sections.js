const fs = require('fs');
const path = require('path');

const filePath = 'c:\\yora\\yora\\src\\app\\home\\page.tsx';
const content = fs.readFileSync(filePath, 'utf8');
const lines = content.split('\n');

lines.forEach((line, index) => {
  const match = line.match(/(?:\{\/\*|\/\/)\s*(\d+\..*?)(?:\*\/\}|$)/);
  if (match) {
    console.log(`Line ${index + 1}: ${match[1].trim()}`);
  }
});
