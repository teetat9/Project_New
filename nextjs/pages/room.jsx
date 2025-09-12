"use client";
import { useRouter } from "next/router";
import Link from "next/link";
import { useMemo, useState } from "react";

export default function ClassroomRoomPage() {
    const router = useRouter();
    const { id } = router.query;

    // 🔧 mock data: ปกติให้ fetch จาก API ด้วย id
    const room = useMemo(
        () => ({
        id: id || "RoomID",
        name: "[Name room]",
        code: "Code room",
        }),
        [id]
    );

    const tabs = [
        { key: "calendar", label: "Calendar", icon: "logo/calendar_2.png" },
        { key: "files", label: "Files", icon: "/logo/folder.png" },
        { key: "chat", label: "Chat", icon: "/logo/message.png" },
        { key: "members", label: "Members", icon: "/logo/staff.png" },
];

    const [active, setActive] = useState("calendar");

    return (
        <div
            className="min-h-screen bg-cover bg-center"
            style={{ backgroundImage: "url('/images/background2.jpg')" }}
        >
        {/* Header */}
        <header className="sticky top-0 z-10 border-b border-neutral-200 bg-white/80 backdrop-blur">
            <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
            <div className="flex items-center gap-4">
                <Link href="/main" className="text-sm text-neutral-600 hover:text-black">
                ← Back
                </Link>
                <div className="flex items-center gap-2">
                <img
                    src="/images/logo_alone.PNG"
                    alt="Logo"
                    className="h-8 w-auto"
                />
                <h1 className="text-lg font-semibold">{room.name}</h1>
            </div>
            </div>

            <div className="flex items-center gap-5">
                <div className="text-sm text-neutral-600">
                <span className="mr-1 text-neutral-400">Code:</span>
                <span className="font-medium">{room.code}</span>
                </div>
                <button
                    className="rounded-full p-2 hover:bg-neutral-100"
                    title="Notifications"
                    >
                <img
                    src="/logo/bell.png"  // ไฟล์ของคุณ
                    alt="Notifications"
                    className="h-5 w-5"
                />
                </button>
            </div>
            </div>
        </header>

        {/* Tabs */}
        <div className="mx-auto max-w-6xl px-4 pt-4">
            <div className="grid grid-cols-4 gap-3">
                {tabs.map((t) => {
                    const isActive = active === t.key;
                    return (
                    <button
                        key={t.key}
                        onClick={() => setActive(t.key)}
                        className={[
                        "flex items-center justify-center gap-2 rounded-xl px-4 py-2 text-sm",
                        "border transition",
                        isActive
                            ? "border-black bg-white font-medium shadow-sm"
                            : "border-neutral-200 bg-neutral-100 text-neutral-700 hover:bg-neutral-200",
                        ].join(" ")}
                    >
                        <img src={t.icon} alt={t.label} className="h-5 w-5" />
                        {t.label}
                    </button>
                    );
                })}
                </div>

            {/* Panel */}
            <section className="mt-5 rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
            {active === "calendar" && <CalendarPlaceholder />}

            {active === "files" && (
                <EmptySection
                title="Files"
                subtitle="Upload and manage classroom files"
                icon="/logo/file.png"
                />
            )}

            {active === "chat" && (
                <EmptySection
                title="Chat"
                subtitle="Classroom chat will appear here"
                icon="/logo/chat.png"
                />
            )}

            {active === "members" && (
                <EmptySection
                title="Members"
                subtitle="List of members and roles"
                icon="/logo/group.png"
                />
            )}
            </section>
        </div>
        </div>
    );
    }

    function CalendarPlaceholder() {
    return (
        <div className="flex flex-col items-center justify-center py-24 text-center">
        <div className="mb-4">
        <img
            src="logo/calendar.png"
            alt="Calendar"
            className="mx-auto h-12 w-12 opacity-60"
        />
        </div>
        <h2 className="text-lg font-semibold">Calendar & Tasks</h2>
        <p className="mt-1 text-sm text-neutral-600">Manage assignments and events</p>
        <p className="mt-6 text-neutral-500">
            Calendar integration coming soon
            <br />
            <span className="text-sm">FullCalendar will be integrated here</span>
        </p>
        </div>
    );
    }

    function EmptySection({ title, subtitle, icon }) {
    return (
        <div className="flex flex-col items-center justify-center py-24 text-center">
        <div className="mb-4">
            <img
            src={icon}        // ใช้ path ที่ส่งมา
            alt={title}
            className="h-12 w-12 opacity-60"
            />
        </div>
        <h2 className="text-lg font-semibold">{title}</h2>
        <p className="mt-1 text-sm text-neutral-600">{subtitle}</p>
        </div>
    );
    }
