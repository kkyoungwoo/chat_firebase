import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import firebase from '../../firebase';

function LoginPage() {

    const { register, errors, handleSubmit } = useForm();
    const [errorFormSubmit,setErrorFormSubmit] = useState("")
    const [ loading, setLoading ] = useState(false)


    const onSubmit = async (data) => {
        console.log(data)
        try {
            //파이어베이스 아이디 인증해주기
            setLoading(true)
            
            await firebase.auth().signInWithEmailAndPassword(data.email,data.password)

            setLoading(false)
        } catch(error) {
            setErrorFormSubmit(error.message)
            setLoading(false)
            setTimeout(() => {
                setErrorFormSubmit("")
            }, 5000);
        }
    }

    return(
        <div className="auth-wrapper">
            <div style={{textAlign: "center"}}>
                <h3>Login</h3>
            </div>
            {errorFormSubmit}
            <form onSubmit={handleSubmit(onSubmit)} method="GET">
            <label>E-mail</label>
            <input
                name="email"
                type="email"
                ref={register({ required: true, pattern: /^\S+@\S+$/i })}
            />
            {errors.email && <p>이메일이 정확하지 않습니다</p>}
            <label>password</label>
            <input
                name="password"
                type="password"
                ref = {register({required: true, minLength: 6})}
            />
            {errors.password && errors.password.type === "required" && <p>비밀번호를 작성해주세요.</p>}
            {errors.password && errors.password.type === "minLength" && <p>비밀번호는 6글자 이상입니다.</p>}
            <input type="submit" disabled={loading}/>
                <Link style={{
                    color: "gray",
                    textDecoration: "none",
                }}
                to="/registerpage">
                    아직 아이디가 없다면...
                </Link>
            </form>
        </div>
    )
}

export default LoginPage