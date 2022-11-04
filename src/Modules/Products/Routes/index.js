const Routes = [
    {
        name: "products",
        path: ["/products"],
        elementPath: "productList",
        auth: true,
        prefix: "/admin",
    },
    {
        name: "addProducts",
        path: ["/addproducts"],
        elementPath: "addproduct",
        auth: true,
        prefix: "/admin",
    }
]

export default Routes;