import htmlPlugin from 'eslint-plugin-html';

export default [
  {
    files: ['**/*.html'],
    plugins: {
      html: htmlPlugin
    },
    rules: {
      // กฎต่างๆ สำหรับไฟล์ HTML
    },
  },
];
