import React,{ useRef } from 'react';
import './registerpage.css';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';

function RegisterPage(){

    const { register, watch, errors } = useForm({mode:"onChange"});
    const password = useRef();
    console.log(watch("email"))
    password.current=watch("password")

    return(
        <div className="auth-wrapper">
            <div style={{textAlign: "center"}}>
                <h3>Register</h3>
            </div>
            <form>
            <label>E-mail</label>
            <input
                name="email"
                type="email"
                ref = {register({required: true, pattern:  /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i })}
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
            <input type="submit" />
                <Link style={{
                    color: "gray",
                    textDecoration: "none",
                }}
                to="/loginpage">
                    이미 아이디가 있다면
                </Link>
            </form>
        </div>
    )
}

export default RegisterPage