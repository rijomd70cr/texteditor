import React from "react";
import Page from "../Page";

export default function Form() {

    return (
        <Page 
            title="New Client" 
            goBack
            card
            actions={[
                {
                    label: "Save",
                    goTo: () => {
                        alert()
                    }
                }
            ]}
        >
            sdasd
        </Page>
    )
}