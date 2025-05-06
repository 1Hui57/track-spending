'use client'
import "../style/header.css";
import { useRouter, usePathname } from 'next/navigation';
import { useEffect, useState } from "react";
import { signOut } from 'firebase/auth';
import { auth } from '@/lib/firebase';

export default function Header() {

    const pathname = usePathname();
    const router = useRouter();

    const [showLogout, setShowLogout] = useState(false);
    useEffect(() => {
        // 只有在 /accounting 顯示登出按鈕
        setShowLogout(pathname.startsWith('/accounting'));
    }, [pathname]);

    function handleLogout() {
        signOut(auth)
            .then(() => {
                console.log("使用者已登出");
                router.push('/');
            })
            .catch((error) => {
                console.error("登出失敗：", error);
            });
    }

    return (
        <header>
            <nav>
                <div id="header" className="header">
                    <div className="text-lg-700">TRACK-SPENDING</div>
                    {showLogout && (
                    <button onClick={handleLogout} className="logout-btn">
                        登出
                    </button>
                )}
                </div>
            </nav>
        </header>
    );
}