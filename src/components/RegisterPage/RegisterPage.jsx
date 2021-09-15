import React, { useRef, useState } from 'react'
import './registerpage.css';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import firebase from '../../firebase';
import md5 from 'md5';

function RegisterPage() {

    const { register, watch, errors, handleSubmit } = useForm();
    const [errorFormSubmit,setErrorFormSubmit] = useState("")
    const [ loading, setLoading ] = useState(false)

    const password = useRef();
    password.current = watch("password");


    const onSubmit = async (data) => {
        console.log(data)
        try {
            //파이어베이스 아이디 인증해주기
            setLoading(true)
            let createdUser = await firebase
            .auth()
            .createUserWithEmailAndPassword(data.email, data.password)
            console.log('createdUser', createdUser)
            
            await createdUser.user.updateProfile({
                displayName: data.name,
                photoURL: `http://gravatar.com/avatar/${md5(createdUser.user.email)}?d=identicon`
            })

            //파이어베이스 데이터베이스 저장해주기
            await firebase.database().ref("users").child(createdUser.user.uid).set({
                name: createdUser.user.displayName,
                image: createdUser.user.photoURL
            })

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
                <h3>Register</h3>
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

            <label>name</label>
            <input
                name="name"
                ref = {register({required: true, maxLength: 10})}
            />
            {errors.name && errors.name.type === "required" && <p>이름을 작성해주세요</p>}
            {errors.name && errors.name.type === "maxLength" && <p>이름이 너무 깁니다.</p>}
            <label>password</label>
            <input
                name="password"
                type="password"
                ref = {register({required: true, minLength: 6})}
            />
            {errors.password && errors.password.type === "required" && <p>비밀번호를 작성해주세요.</p>}
            {errors.password && errors.password.type === "minLength" && <p>비밀번호는 6글자 이상입니다.</p>}
            <label>password Confirm</label>
            <input
                name="password_confirm"
                type="password"
                ref={
                    register({
                        required: true,
                        validate: (value) =>
                            value === password.current
                    })
                }
            />
            {errors.password_confirm && errors.password_confirm.type === "required" && <p>비밀번호를 다시한번 작성해주세요.</p>}
            {errors.password_confirm && errors.password_confirm.type === "validate" && <p>비밀번호가 동일하지 않습니다.</p>}

            {errorFormSubmit && <p>{errorFormSubmit}</p>}

            <input type="submit" disabled={loading}/>
                <Link style={{
                    color: "gray",
                    textDecoration: "none",
                }}
                to="/loginpage">
                    이미 아이디가 있다면...
                </Link>
            </form>
        </div>
    )
}

export default RegisterPage