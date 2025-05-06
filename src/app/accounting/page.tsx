'use client'
import SpendingForm from "@/component/SpendingForm";
import SpendingList from "@/component/SpendingList";
import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '@/lib/firebase';

export default function Accounting() {
    // 定義 Spending 介面
    interface Spending {
        id: number;
        type: string;
        cost: number;
        content: string;
    }
    // const [spendings, setSpendings] = useState<Spending[]>([]);
    const router = useRouter();
    const [isLoading, setIsloading] = useState(true);
    const [userId, setUserId] = useState<string | null>(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (!user) {
                router.push('/');
            } else {
                setUserId(user.uid);
            }
            setIsloading(false);
        });
        return () => unsubscribe();
    }, [router])

    if (isLoading) return <p>載入中...</p>;
    if (!userId) return null;

    // function deleteList(id: number) {
    //     setSpendings(spendings.filter(item => item.id !== id))
    // }
    return (
        <>
            <SpendingForm  userId={userId}/>
            <SpendingList  userId={userId}/>
        </>
    )
}