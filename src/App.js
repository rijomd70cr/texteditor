import React from "react";
import GenerateRoutes from "./Core/Services/Routes";
import Headers from "./Layouts/Admin/Header";
import "./App.css";

function App() {

    return (
        <>
            <GenerateRoutes adminLayouts={Headers} />
        </>
    );
    
}

export default App;