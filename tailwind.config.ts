import type { Config } from 'tailwindcss'

export default {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  plugins: [
    require('tailwind-scrollbar-hide'), // 이 줄을 추가합니다.
  ],
} as Config
