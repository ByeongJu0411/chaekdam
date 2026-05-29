import Link from "next/link";
import { ROUTES } from "@/lib/constants/routes";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center text-center">
      <h1 className="text-6xl font-bold text-gray-200">404</h1>
      <p className="mt-4 text-lg text-gray-600">페이지를 찾을 수 없습니다.</p>
      <Link href={ROUTES.HOME} className="mt-6 text-blue-600 hover:underline">
        홈으로 돌아가기
      </Link>
    </div>
  );
}
