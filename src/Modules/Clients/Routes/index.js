const Routes = [
    {
        name: "Clients",
        path: ["/clients"],
        elementPath: "List",
        prefix: "/admin",
        auth: true
    },
    {
        name: "New Client",
        path: ["/clients/create"],
        elementPath: "Form",
        prefix: "/admin",
        auth: true
    }
]

export default Routes;