import { Dispatch, SetStateAction, useState } from "react";

interface Spending{
    id:number;
    type:string;
    cost:number;
    content:string;
}

interface SpendingFormProps {
    spendings: Spending[];
    setSpendings: Dispatch<SetStateAction<Spending[]>>;
}

export default function SpendingForm({ spendings, setSpendings }: SpendingFormProps,) {


    const [type, setType] = useState("");
    const [cost, setCost] = useState<number|"">("");
    const [content, setContent] = useState("");

    function handleClick() {
        if (!type || !cost || !content) {
            alert("請填寫完整資訊！");
            return;
        }
        setSpendings([...spendings,{id:Math.random(),type,cost: Number(cost),content}]);
        setType("");
        setCost("");
        setContent("");

    }
    return <div id="spendingForm" className="spendingForm">

        <select name="type" id="type" value={type} onChange={(e) => setType(e.target.value)}>
            <option value="">請選擇收入或支出</option>
            <option value="in">收入</option>
            <option value="out">支出</option>
        </select>
        <input type="text" placeholder="金額" value={cost} onChange={(e) => { setCost(Number(e.target.value)) }} />
        <input type="text" placeholder="項目" value={content} onChange={(e) => { setContent(e.target.value) }} />
        <button className="spendingForm__btn"onClick={handleClick}>新增</button>
    </div>
}