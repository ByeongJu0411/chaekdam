export default function ChatRoomLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="-mx-5 -my-8 overflow-hidden flex justify-center" style={{ height: "calc(100vh - 150px)" }}>
      <div className="w-full max-w-2xl h-full">
        {children}
      </div>
    </div>
  );
}
