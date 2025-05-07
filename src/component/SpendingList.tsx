'use client';
import { useEffect, useState, Dispatch, SetStateAction } from "react";
import { db } from "@/lib/firebase";
import { collection, query, onSnapshot, orderBy, deleteDoc, doc } from "firebase/firestore";

interface Spending {
    id: string;
    type: string;
    cost: number;
    content: string;
    createdTime: any;
}

interface SpendingListProps {
    // spendings: Spending[];
    // deleteList: (id: number) => void;
    userId: string;
    // setSpendings: Dispatch<SetStateAction<Spending[]>>;
}
export default function SpendingList({ userId }: SpendingListProps) {
    // 建立spendings放資料庫的資料
    const [spendings, setSpendings] = useState<Spending[]>([]);

    useEffect(() => {
        // 定義q為查詢條件，query(內為查詢路徑)
        const q = query(
            collection(db, "users", userId, "accounting"),
            orderBy("createTime", "desc") // 依建立時間排序
        );
        // unsubscribe是停止監聽的函式
        // onSnapshot監聽q這個查詢的即時變化，當資料有變更就會自動觸發
        // onSnapshot(參數一,參數二):參數一是路徑，參數二會是一個callback function
        const unsubscribe = onSnapshot(q, (snapshot) => {
            //監聽後，當資料有變動就會執行此段程式
            const data:Spending[] = snapshot.docs.map(doc => {
                // doc.data()可以取的該筆document的所有欄位，並回傳一個JS的物件
                const spendingData = doc.data() as Omit<Spending,"id">;
                return {                
                    id: doc.id,
                    ...spendingData}
            });
            setSpendings(data);
            // console.log(spendings);
        });

        return () => unsubscribe();
    }, [userId]);
    // console.log(spendings);
    async function deleteList(id: string) {
        try {
          await deleteDoc(doc(db, "users", userId, "accounting", id));
          // Firebase 刪除後會自動觸發 onSnapshot 更新，不需要手動 setSpendings
        } catch (error) {
          console.error("刪除失敗：", error);
        }
      }
    //   console.log(spendings);

    function calculateTotal(spendings: Spending[]): number {
        let total: number = 0;
        spendings.forEach(item => {
            total += item.type === "in" ? item.cost : -item.cost;
        })
        return total;
    }

    return (
        <div className="spendingWrapper">
            {
                spendings.map((item) => {
                    return item.type === "in" ?
                        (
                            <div className="spendingList" key={item.id}>
                                <p>{item.content}</p>
                                <p className="spendingList__cost--in">{item.cost}</p>
                                <button className="spendingList__delBtn text-sm-400" onClick={() => deleteList(item.id)}>刪除</button>
                            </div>
                        )
                        : (
                            <div className="spendingList" key={item.id}>
                                <p>{item.content}</p>
                                <p className="spendingList__cost--out">-{item.cost}</p>
                                <button className="spendingList__delBtn text-sm-400" onClick={() => deleteList(item.id)}>刪除</button>
                            </div>
                        )
                })
            }
            <hr />
            <div className="totalList">
                <p>小計</p>
                <p>{calculateTotal(spendings)}元</p>
            </div>
        </div>

    )
}