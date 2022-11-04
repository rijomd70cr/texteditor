import React from "react";
import Page from "../../../Components/Page";

export default function Dashboard() {

    return (
        <Page 
            title="Clients" 
            card
            actions={[
                {
                    label: "Create client",
                    goTo: "create"
                }
            ]}
        >
            sdasd
        </Page>
    )
}