'use client'
import { useRouter } from 'next/navigation'


export default function Home() {

const router = useRouter();

// 跳轉到 /accounting 頁面
function onStartBtnClick(): void {
    router.push("/accounting"); 
}



    return (
        <div>
            <h2>Welcome Home</h2>
            <button onClick={onStartBtnClick}>開始</button>
        </div>
    )
}
