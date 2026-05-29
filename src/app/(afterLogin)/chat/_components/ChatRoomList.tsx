"use client";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { getChatRooms } from "@/lib/api/chat";
import { useMe } from "@/hooks/useAuth";
import { ROUTES } from "@/lib/constants/routes";
import type { ChatRoom } from "@/types/chat";

function formatRelativeTime(dateStr: string) {
  const date = new Date(dateStr);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays === 0) {
    return date.toLocaleTimeString("ko-KR", { hour: "2-digit", minute: "2-digit" });
  } else if (diffDays === 1) {
    return "어제";
  } else if (diffDays < 7) {
    return date.toLocaleDateString("ko-KR", { weekday: "short" });
  } else {
    return date.toLocaleDateString("ko-KR", { month: "numeric", day: "numeric" });
  }
}

function SkeletonRow() {
  return (
    <div className="flex items-center gap-3 px-4 py-4 animate-pulse">
      <div className="w-12 h-12 rounded-full bg-slate-200 shrink-0" />
      <div className="flex-1 space-y-2">
        <div className="flex justify-between">
          <div className="h-4 bg-slate-200 rounded w-1/4" />
          <div className="h-3 bg-slate-200 rounded w-10" />
        </div>
        <div className="h-3 bg-slate-200 rounded w-2/3" />
        <div className="h-3 bg-slate-200 rounded w-1/2" />
      </div>
    </div>
  );
}

export function ChatRoomList() {
  const { data: me } = useMe();
  const { data: rooms = [], isLoading } = useQuery({
    queryKey: ["chatRooms"],
    queryFn: getChatRooms,
    staleTime: 30 * 1000,
  });

  if (isLoading) {
    return (
      <div className="rounded-xl border border-slate-100 bg-white overflow-hidden divide-y divide-slate-100">
        {[1, 2, 3].map((i) => (
          <SkeletonRow key={i} />
        ))}
      </div>
    );
  }

  if (rooms.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <div className="w-20 h-20 rounded-full bg-yellow-50 flex items-center justify-center text-3xl mb-4">💬</div>
        <p className="font-semibold text-slate-700 text-lg">아직 채팅이 없어요</p>
        <p className="text-sm text-slate-400 mt-2">도서 상세 페이지에서 판매자에게 문의해보세요</p>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-slate-100 bg-white overflow-hidden divide-y divide-slate-100">
      {rooms.map((room: ChatRoom) => {
        const isBuyer = room.buyerId === me?._id;
        const otherName = isBuyer ? room.sellerName : room.buyerName;

        return (
          <Link
            key={room._id}
            href={ROUTES.CHAT_ROOM(room._id)}
            className="flex items-center gap-3 px-4 py-4 hover:bg-slate-50 transition-colors"
          >
            {/* 내용 */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2">
                <p className="font-semibold text-slate-900 text-[15px] truncate">{otherName}</p>
                <p className="text-xs text-slate-400 shrink-0">{formatRelativeTime(room.lastMessageAt)}</p>
              </div>
              <p className="text-xs text-blue-500 truncate mt-0.5 font-medium">{room.bookTitle}</p>
              <p className="text-sm text-slate-400 truncate mt-0.5">{room.lastMessage || "대화를 시작해보세요."}</p>
            </div>

            {/* 화살표 */}
            <svg
              className="w-4 h-4 text-slate-300 shrink-0"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 18l6-6-6-6" />
            </svg>
          </Link>
        );
      })}
    </div>
  );
}
