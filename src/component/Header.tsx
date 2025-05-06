'use client'
import { useRouter } from 'next/navigation';
import "../style/header.css";

export default function Header() {
    const router = useRouter();
    function toHome():void{
        router.back()
    }

    return (
        <header>
            <nav>
                <div id="header" className="header">
                    <div className="text-lg-700" onClick={toHome}>TRACK-SPENDING</div>
                </div>
            </nav>
        </header>
    );
}