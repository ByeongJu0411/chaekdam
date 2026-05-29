"use client";
import Link from "next/link";
import Image from "next/image";
import { ROUTES } from "@/lib/constants/routes";
import { useMe, useLogout } from "@/hooks/useAuth";

function PackageIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m7.5 4.27 9 5.15" />
      <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
      <path d="m3.3 7 8.7 5 8.7-5" />
      <path d="M12 22V12" />
    </svg>
  );
}

function HeartIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
    </svg>
  );
}

function UserIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="8" r="5" />
      <path d="M20 21a8 8 0 0 0-16 0" />
    </svg>
  );
}

function ChevronRight() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m9 18 6-6-6-6" />
    </svg>
  );
}

function LogOutIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <polyline points="16 17 21 12 16 7" />
      <line x1="21" x2="9" y1="12" y2="12" />
    </svg>
  );
}

const menuItems = [
  {
    href: ROUTES.MYPAGE_SALES,
    icon: <PackageIcon />,
    label: "내 판매 목록",
    desc: "등록한 도서를 관리하세요",
    iconClass: "bg-blue-50 text-blue-500",
  },
  {
    href: ROUTES.MYPAGE_WISHLIST,
    icon: <HeartIcon />,
    label: "찜한 책",
    desc: "관심 있는 도서 모아보기",
    iconClass: "bg-rose-50 text-rose-500",
  },
  {
    href: ROUTES.MYPAGE_PROFILE,
    icon: <UserIcon />,
    label: "프로필 수정",
    desc: "이름과 프로필 이미지 변경",
    iconClass: "bg-slate-100 text-slate-500",
  },
];

export function MypageDashboard() {
  const { data: user } = useMe();
  const { mutate: doLogout, isPending } = useLogout();

  const initials = user?.name?.slice(0, 1) ?? "?";

  return (
    <div className="space-y-3 max-w-2xl w-full">
      {/* 프로필 카드 */}
      <div className="rounded-2xl bg-white border border-slate-100 shadow-sm px-5 py-5">
        <div className="flex items-center gap-4">
          {user?.profileImage ? (
            <Image
              src={user.profileImage}
              alt={user.name}
              width={52}
              height={52}
              className="h-13 w-13 rounded-full object-cover"
            />
          ) : (
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-indigo-500 text-white text-lg font-bold select-none">
              {initials}
            </div>
          )}
          <div className="flex-1 min-w-0">
            <p className="text-base font-bold text-slate-900 truncate">{user?.name ?? "..."}</p>
            <p className="text-sm text-slate-400 truncate">{user?.email}</p>
          </div>
          <Link
            href={ROUTES.MYPAGE_PROFILE}
            className="shrink-0 rounded-lg bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-500 hover:bg-slate-100 transition-colors"
          >
            수정
          </Link>
        </div>
      </div>

      {/* 메뉴 */}
      <div className="rounded-2xl bg-white border border-slate-100 shadow-sm overflow-hidden divide-y divide-slate-50">
        {menuItems.map(({ href, icon, label, desc, iconClass }) => (
          <Link
            key={href}
            href={href}
            className="flex items-center gap-4 px-5 py-4 hover:bg-slate-50/80 transition-colors group"
          >
            <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${iconClass}`}>{icon}</div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-slate-800">{label}</p>
              <p className="text-xs text-slate-400">{desc}</p>
            </div>
            <span className="text-slate-300 group-hover:text-slate-400 transition-colors">
              <ChevronRight />
            </span>
          </Link>
        ))}
      </div>

      {/* 로그아웃 */}
      <div className="rounded-2xl bg-white border border-slate-100 shadow-sm overflow-hidden">
        <button
          onClick={() => doLogout()}
          disabled={isPending}
          className="flex w-full items-center gap-4 px-5 py-4 text-sm font-semibold text-slate-400 hover:bg-red-50 hover:text-red-500 transition-colors group disabled:opacity-50"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-100 group-hover:bg-red-100 group-hover:text-red-400 transition-colors">
            <LogOutIcon />
          </div>
          <span>{isPending ? "로그아웃 중..." : "로그아웃"}</span>
        </button>
      </div>
    </div>
  );
}
