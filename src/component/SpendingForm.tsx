import { useState } from "react";
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
// import { auth } from '@/lib/firebase';

interface Spending{
    id:number;
    type:string;
    cost:number;
    content:string;
}

interface SpendingFormProps {
    // spendings: Spending[];
    // setSpendings: Dispatch<SetStateAction<Spending[]>>;
    userId:string;
}

export default function SpendingForm({userId}: SpendingFormProps,) {
    
    const [type, setType] = useState("");
    const [cost, setCost] = useState<string>("");
    const [content, setContent] = useState("");

    async function handleClick() {
        if (!type || !cost || !content) {
            alert("請填寫完整資訊！");
            return;
        }
        if (isNaN(Number(cost))) {
            alert("請輸入有效的數字！");
            return;
        }
        const newSpending = {
            type,
            cost:Number(cost),
            content,
            createTime:serverTimestamp(),
        };

        try{
            await addDoc(collection(db, "users", userId, "accounting"), newSpending);
            // setSpendings([...spendings,{id:Math.random(),type,cost: Number(cost),content}]);
            setType("");
            setCost("");
            setContent("");
            console.log("寫入成功");
        }
        catch(error){
            console.error(" 寫入 Firestore 失敗：", error);
            alert("新增資料時發生錯誤，請稍後再試！");
        }
    }
    return <div id="spendingForm" className="spendingForm">
        <select name="type" id="type" value={type} onChange={(e) => setType(e.target.value)}>
            <option value="">請選擇收入或支出</option>
            <option value="in">收入</option>
            <option value="out">支出</option>
        </select>
        <input type="text" placeholder="金額" value={cost} onChange={(e) => {setCost(e.target.value); }} />
        <input type="text" placeholder="項目" value={content} onChange={(e) => { setContent(e.target.value) }} />
        <button className="spendingForm__btn"onClick={handleClick}>新增</button>
    </div>
}