'use client'
import { useRouter } from 'next/navigation'
import { useState } from 'react';


export default function Home() {

    const router = useRouter();

    // 切換註冊or登入
    const [isSignIn, setIsSignin] = useState(true);

    function changeSignIn() {
        setIsSignin(true);
    }

    function changeSignUp() {
        setIsSignin(false);
    }

    // 跳轉到 /accounting 頁面
    function onStartBtnClick(): void {
        router.push("/accounting");
    }
    return (
        <div className='accountWrapper'>
            <h3>Track-Spending</h3>
            <div className='accountWrapper__singInOrUp'>
                <button onClick={changeSignIn} className={isSignIn?"actionSingBtn":""}>SIGN IN</button>
                <button onClick={changeSignUp} className={isSignIn?"":"actionSingBtn"}>SIGN UP</button>
            </div>
            {isSignIn ? (
                <form action="" className='signForm'>
                    <input type="text" placeholder='E-mail' />
                    <input type="text" placeholder='Password' />
                    <label className='text-xs-400'>
                        <input type="checkbox" id='stayIn' />
                        Stay signed in.
                    </label >
                    <button onClick={onStartBtnClick}>SIGN IN</button>
                </form>
            )
            : (<form action="" className='signForm'>
                <input type="text" placeholder='Name' />
                <input type="text" placeholder='E-mail' />
                <input type="text" placeholder='Password' />
                <label className='text-xs-400'>
                    <input type="checkbox" id='stayIn' />
                    Sign in after registration.
                </label>
                <button onClick={onStartBtnClick}>SIGN Up</button>
            </form>)}



        </div>
    )
}
