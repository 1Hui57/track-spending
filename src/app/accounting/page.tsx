'use client'
import SpendingForm from "@/component/SpendingForm";
import { useState } from "react";

export default function Accounting(){
    // 定義 Spending 介面
    interface Spending{
        id:number;
        type:string;
        cost:number;
        content:string;
    }
    const [spendings, setSpendings]=useState<Spending[]>([]);

    return(
        <>
            <p>記帳頁面</p>
            <SpendingForm spendings={spendings} setSpendings={setSpendings}/>
        </>
    )
}