
interface Spending {
    id: number;
    type: string;
    cost: number;
    content: string;
}

interface SpendingFormProps {
    spendings: Spending[];
    deleteList: (id: number) => void;
}
export default function SpendingList({ spendings, deleteList }: SpendingFormProps) {

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
                                <button className="spendingList__delBtn text-sm-400"onClick={() => deleteList(item.id)}>刪除</button>
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