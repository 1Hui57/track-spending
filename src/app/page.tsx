'use client'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react';
import { auth } from '@/lib/firebase';
import {
    createUserWithEmailAndPassword, signInWithEmailAndPassword,
    setPersistence, browserLocalPersistence, browserSessionPersistence, onAuthStateChanged
} from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";

export default function Home() {

    const router = useRouter();

    useEffect(() => {
        // 建立一個監聽器可以監聽firebase的登入狀態
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                console.log(user);
                router.push('/accounting');
            }

        });
        //  return 一個清除函數
        return () => unsubscribe();
    }, [router])
    // 註冊、登入使用useSate
    const [isSignIn, setIsSignin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [isStayIn, setIsStayIn] = useState(true);

    function changeSignIn() {
        setIsSignin(true);
        setError("");
    }

    function changeSignUp() {
        setIsSignin(false);
        setError("");
    }

    // 登入
    const handleSignIn = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        try {
            await setPersistence(auth, isStayIn ? browserLocalPersistence : browserSessionPersistence);
            await signInWithEmailAndPassword(auth, email, password);
            router.push('/accounting');
        } catch (err: any) {
            // console.log("錯誤訊息",err.message);
            setError("帳號或密碼輸入錯誤");
        }
    };

    // 註冊
    const handleSignUp = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        if (password !== confirmPassword) {
            setError('密碼與確認密碼不一致');
            return;
        }
        try {
            await setPersistence(auth, isStayIn ? browserLocalPersistence : browserSessionPersistence);
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            // 創建使用者的資料表到firestore，以Auth生成的user.uid當作資料表名稱
            const user = userCredential.user;
            await setDoc(doc(db, "users", user.uid), {
                email: user.email,
                createdAt: serverTimestamp(),
            });
            router.push('/accounting');
        } catch (err: any) {
            if (err.message === "Firebase: Password should be at least 6 characters (auth/weak-password).") {
                setError("密碼需大於6個字元");
            }
            else if (err.message === "Firebase: Error (auth/email-already-in-use).") {
                setError("此帳號已被註冊");
            }
            else if (err.message === "Firebase: Error (auth/invalid-email).") {
                setError("請輸入正確的E-mail格式");
            }
        }
    };


    return (
        <div className='accountWrapper'>
            <h3>Track-Spending</h3>
            <div className='accountWrapper__singInOrUp'>
                <button onClick={changeSignIn} className={isSignIn ? "actionSingBtn" : ""}>SIGN IN</button>
                <button onClick={changeSignUp} className={isSignIn ? "" : "actionSingBtn"}>SIGN UP</button>
            </div>
            {isSignIn ? (
                <form className='signForm' onSubmit={handleSignIn}>
                    <input type="text" placeholder='E-mail' value={email}
                        onChange={(e) => setEmail(e.target.value)} />
                    <input type="password" placeholder='Password' value={password}
                        onChange={(e) => setPassword(e.target.value)} />
                    <label className='text-xs-400'>
                        <input type="checkbox" id='stayIn' checked={isStayIn} onChange={(e) => { setIsStayIn(e.target.checked) }} />
                        Stay signed in.
                    </label >
                    <button type='submit'>SIGN IN</button>
                </form>
            )
                : (<form className='signForm' onSubmit={handleSignUp}>
                    <input type="text" placeholder='E-mail' value={email}
                        onChange={(e) => setEmail(e.target.value)} />
                    <input type="password" placeholder='Password' value={password}
                        onChange={(e) => setPassword(e.target.value)} />
                    <input type="password" placeholder='Confirm Password' value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)} />
                    <label className='text-xs-400'>
                        <input type="checkbox" id='stayIn' checked={isStayIn} onChange={(e) => { setIsStayIn(e.target.checked) }} />
                        Stay signed in after successful registration.
                    </label>
                    <button type='submit'>SIGN Up</button>
                </form>)}
            {error && <p className="accountWrapper__error text-sm-400">{error}</p>}
        </div>

    )
}
