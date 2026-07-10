const fs = require('fs');
const path = require('path');

const filesToFix = [
  'node_modules/@mediapipe/tasks-vision/vision_bundle_mjs.js',
];

filesToFix.forEach(relPath => {
  const fullPath = path.join(__dirname, '..', relPath);
  try {
    if (fs.existsSync(fullPath)) {
      let content = fs.readFileSync(fullPath, 'utf8');
      const fixed = content.replace(/\n?\/\/\# sourceMappingURL=.*?$/gm, '');
      if (fixed !== content) {
        fs.writeFileSync(fullPath, fixed, 'utf8');
        console.log(`Fixed sourceMappingURL in ${relPath}`);
      }
    }
  } catch (err) {
    // Don't fail the install — just log
    console.warn('fix-maps error for', relPath, err.message);
  }
});
