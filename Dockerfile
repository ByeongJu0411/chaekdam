# 1단계: 의존성 설치 + 빌드 (builder)
FROM node:20-alpine AS builder

WORKDIR /app

# package 파일 먼저 복사 (캐싱 최적화)
COPY package*.json ./
RUN npm ci

# 소스 전체 복사
COPY . .

# Next.js 빌드
RUN npm run build

# server.ts + src/**/*.ts → dist/ 로 컴파일 (CommonJS)
RUN npx tsc -p tsconfig.server.json

# 2단계: 실행 환경 (runner)
FROM node:20-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production

# 프로덕션 의존성만 설치 (tsx 불필요)
COPY --from=builder /app/package*.json ./
RUN npm ci --omit=dev

COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/dist ./dist

# Render는 환경변수 PORT를 자동 주입
EXPOSE 3000

# 컴파일된 JS를 node로 직접 실행
CMD ["node", "dist/server.js"]