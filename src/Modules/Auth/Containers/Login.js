import React, { useState } from "react";
import AuthLayout from "../Components/AuthLayouts";
import TextBox from "../../../Components/TextBox";
import Button from './../../../Components/Button/index';
import useRedirect from "../../../Core/Hooks/Redirect";
// import { request } from "../../../Core/Services/Request";
import { serverValidationError, sampleValidationError } from './../../../Core/Utilities/index';
import { sampleAuth } from "../../../Core/Services/Auth";
import Title from '../../../Components/Title/index';
import { CustomizedLink } from '../../../Components/Link';

export default function Login(props) {

    const { redirectTo } = useRedirect();

    const [isSubmitted] = useState(false);
    const [errors, setErrors] = useState({
        email: "",
        password: ""
    });
    const [input, setInput] = useState({ email: "", password: "" });

    const onClick = () => {
        redirectTo('/signin')
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        let a = sampleAuth(input);
        (a === "Succes") ? redirectTo('/dashboard') : setErrors({ ...errors, password: a });

        // setIsSubmitted(true)
        // request(url('/auth/login'), input, 'POST')
        // .then(res => {
        //     setIsSubmitted(false);
        //     attemptAuth(res.result);
        //     redirectTo('/dashboard');
        // })
        // .catch(error => {
        //     setIsSubmitted(false)
        //     setErrors(error.errors);
        // })        
    }

    return (
        <div>
            <AuthLayout>
                <Title title={"SIGN IN"} subTitle={"Let Continue "} />
                <form onSubmit={handleSubmit}>
                    <div><TextBox value={input.email} onChange={event => setInput({ ...input, email: event.target.value })} error={serverValidationError(errors?.email)} label="Email" placeholder="Registered email" type="email" /></div>
                    <div><TextBox value={input.password} onChange={event => setInput({ ...input, password: event.target.value })} error={sampleValidationError(errors?.password)} top={10} label="Password" placeholder="Password" type="password" /></div>
                    <Button type="submit" top={20} label="Sign In" loading={isSubmitted} />
                </form>
                <CustomizedLink titile={"Sign Up?"} onClick={onClick} />
            </AuthLayout>
        </div>
    )
}