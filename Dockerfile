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

# 2단계: 실행 환경 (runner)
FROM node:20-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production

# builder에서 필요한 파일만 복사
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/server.ts ./server.ts
COPY --from=builder /app/tsconfig.json ./tsconfig.json
COPY --from=builder /app/src ./src

# Render는 환경변수 PORT를 자동 주입
EXPOSE 3000

# 커스텀 서버 실행 (tsx로 TypeScript 직접 실행)
CMD ["npx", "tsx", "server.ts"]