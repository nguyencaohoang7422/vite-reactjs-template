import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';
import readline from 'node:readline/promises'; // Module có sẵn từ Node.js 16+
import { stdin as input, stdout as output } from 'node:process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const featureName = process.argv[2];

async function removeFeature() {
  if (!featureName) {
    console.error('❌ Vui lòng cung cấp tên feature cần xóa! Ví dụ: yarn remove-feature my-feature');
    process.exit(1);
  }

  const targetDir = path.resolve(__dirname, '../src/features', featureName);

  // 1. Kiểm tra xem thư mục có tồn tại không
  if (!(await fs.pathExists(targetDir))) {
    console.error(`❌ Lỗi: Thư mục "src/${featureName}" không tồn tại.`);
    return;
  }

  // 2. Tạo giao diện hỏi đáp trên Terminal
  const rl = readline.createInterface({ input, output });

  try {
    const answer = await rl.question(`⚠️ Bạn có chắc chắn muốn xóa "${featureName}"? (y/n): `);

    if (answer.toLowerCase() === 'y' || answer.toLowerCase() === 'yes') {
      await fs.remove(targetDir);
      console.log(`✅ Đã xóa thành công: src/${featureName}`);
    } else {
      console.log('🚫 Đã hủy thao tác xóa.');
    }
  } catch (err) {
    console.error('❌ Đã xảy ra lỗi:', err);
  } finally {
    rl.close();
  }
}

await removeFeature();
