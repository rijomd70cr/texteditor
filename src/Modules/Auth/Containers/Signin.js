import React, { useState } from "react";
import AuthLayout from "../Components/AuthLayouts";
import TextBox from "../../../Components/TextBox";
import Button from '../../../Components/Button/index';
import { serverValidationError, sampleValidationError } from '../../../Core/Utilities/index';
import Title from '../../../Components/Title/index';
import { sampleRegister } from "../../../Core/Services/Auth";
import { CustomizedLink } from '../../../Components/Link';
import useRedirect from "../../../Core/Hooks/Redirect";

export default function Signin() {

    const [isSubmitted] = useState(false);
    const { redirectTo } = useRedirect();

    const [errors, setErrors] = useState({
        email: "",
        password: ""
    });
    const [input, setInput] = useState({ email: "", password: "" });
    const onClick = () => {
        redirectTo('/login')
    }
    const handleSubmit = () => {
        let output = sampleRegister(input);
        output ? setErrors({ ...errors, password: "Succesfully Registered" }) : setErrors({ ...errors, password: "Auth Failed" });

    }

    return (
        <div>
            <AuthLayout>
                <Title title={"SIGN UP"} subTitle={"Let Continue "} />
                <form onSubmit={handleSubmit}>
                    <div><TextBox value={input.email} onChange={event => setInput({ ...input, email: event.target.value })} error={serverValidationError(errors?.email)} label="Email" placeholder="Registered email" type="email" /></div>
                    <div><TextBox value={input.password} onChange={event => setInput({ ...input, password: event.target.value })} error={sampleValidationError(errors?.password)} top={10} label="Password" placeholder="Password" type="password" /></div>
                    <Button type="submit" top={20} label="Sign Up" loading={isSubmitted} />
                </form>
                <CustomizedLink titile={"Sign In?"} onClick={onClick} />
            </AuthLayout>
        </div>
    )
}
