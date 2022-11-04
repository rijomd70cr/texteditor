const Routes = [
    {
        name: "Login",
        path: ["/", "/login", "/admin", "/admin/login"],
        elementPath: "Login",
        redirectAuth: true,
        prefix: "/"
    },
    {
        name: "Signin",
        path: ["/signin"],
        elementPath: "Signin",
        prefix: "/admin"
    },
    {
        name: "Forgot Password",
        path: ["/forgot-password"],
        elementPath: "ForgotPassword",
        prefix: "/admin"
    }
]

export default Routes;