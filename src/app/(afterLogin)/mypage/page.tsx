import { MypageNav } from "@/components/layout/MypageNav";
import { MypageDashboard } from "./_components/MypageDashboard";

export default function MypagePage() {
  return (
    <div className="flex gap-8">
      <aside className="hidden lg:block">
        <div className="sticky top-20">
          <p className="mb-3 px-3 text-xs font-bold uppercase tracking-wider text-slate-400">계정</p>
          <MypageNav />
        </div>
      </aside>
      <div className="min-w-0 flex-1">
        <div className="mb-6">
          <h1 className="text-2xl font-black tracking-tight text-slate-900">마이페이지</h1>
          <p className="mt-1 text-sm text-slate-400">내 거래 현황과 계정을 관리하세요</p>
        </div>
        <div className="flex justify-center">
          <MypageDashboard />
        </div>
      </div>
    </div>
  );
}
