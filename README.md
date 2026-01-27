# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is currently not compatible with SWC. See [this issue](https://github.com/vitejs/vite-plugin-react/issues/428) for tracking the progress.

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
]);
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x';
import reactDom from 'eslint-plugin-react-dom';

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
]);
```

# Color rule shadcn

## 1. Nhóm màu nền và chữ cơ bản

Đây là các biến quyết định diện mạo tổng thể của ứng dụng:
--background: Màu nền chính của toàn bộ trang web (thường gần mức 100% cho Light mode và 10-15% cho Dark mode).
--foreground: Màu chữ chính trên nền --background. Nó luôn có độ sáng đối lập với background để đảm bảo dễ đọc.
--card / --card-foreground: Màu nền của các thẻ (cards) và chữ trên đó. Thường giống hoặc sáng/tối hơn background một chút để tạo chiều sâu.
--popover / --popover-foreground: Màu dành cho các menu thả xuống (dropdown), tooltip hoặc dialog.

## 2. Nhóm màu thương hiệu và trạng thái

--primary / --primary-foreground: Màu chủ đạo của thương hiệu (ví dụ: nút "Submit"). Chữ trên nút này (foreground) thường là màu trắng hoặc đen để nổi bật.
--secondary / --secondary-foreground: Màu phụ, dùng cho các thành phần ít quan trọng hơn (như nút "Cancel" hoặc "Back").
--accent / --accent-foreground: Màu tạo điểm nhấn, thường dùng cho hiệu ứng hover (di chuột) lên các item trong menu.
--destructive / --destructive-foreground: Màu cảnh báo hoặc hành động nguy hiểm (thường là tông Đỏ).

## 3. Nhóm màu cấu trúc và biên

--border: Màu của các đường kẻ viền (border) trên input, card, separator. Đây là biến bạn sẽ đổi nhiều nhất khi làm Dark Mode.
--input: Màu viền riêng cho các thẻ input.
--ring: Màu của vòng outline xuất hiện khi bạn nhấn Tab vào một phần tử (Focus ring) – cực kỳ quan trọng cho tính tiếp cận (Accessibility).

## 4. Nhóm biểu đồ và thông số kỹ thuật

--chart-1 đến --chart-5: Các biến màu được thiết kế sẵn để vẽ biểu đồ, đảm bảo tính thẩm mỹ và dễ phân biệt.
--radius: Bo góc của các thành phần (nút, card). Thay đổi giá trị này sẽ thay đổi toàn bộ phong cách từ "vuông vức" sang "mềm mại".
