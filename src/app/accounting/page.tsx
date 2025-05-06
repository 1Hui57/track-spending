'use client'
import SpendingForm from "@/component/SpendingForm";
import SpendingList from "@/component/SpendingList";
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

    function deleteList(id:number){
        setSpendings(spendings.filter(item=>item.id!==id))
    }
    return(
        <>
            <SpendingForm spendings={spendings} setSpendings={setSpendings}/>
            <SpendingList spendings={spendings} deleteList={deleteList}/>
        </>
    )
}