import path from 'node:path';
import fs from 'fs-extra';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const featureName = process.argv[2]; //lấy tham số feature name từ dòng lệnh
if (!featureName) {
  console.error('Please provide a feature name.');
  process.exit(1);
}
const sourceDir = path.join(__dirname, '../src/features/_sample');
const targetDir = path.join(__dirname, `../src/features/${featureName}`);
async function generateFeature() {
  try {
    if (await fs.pathExists(targetDir)) {
      console.error(`Lỗi: Thư mục "${featureName}" đã tồn tại.`);
      return;
    }
    await fs.copy(sourceDir, targetDir);
    console.log(`Thành công! Đã tạo thư mục: ${targetDir}`);
  } catch (err) {
    console.error('Đã xảy ra lỗi:', err);
  }
}
await generateFeature();
