import { Container, Card as MCard } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../Button";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export default function Page(props) {

    const { actions = [], children, container = false, card = false, containerMaxWidth = "md", title = "", goBack = "" } = props;

    const navigate = useNavigate();
    
    const titleBlock = () => {

        return title ? <div style={{marginBottom: goBack ? 5 : 13, fontSize: 18, fontWeight: 'bold'}}>
            {goBack ? <div style={{display: 'flex'}}>
                <span>
                    <ArrowBackIcon style={{cursor: 'pointer'}} 
                    onClick={event => {
                        if (typeof goBack === 'function') {
                            return goBack();
                        }
                        return navigate(-1);
                    }} />
                </span>
                <span style={{marginTop: 2.5, marginLeft: 3}}>{title}</span></div> :  <span>{title}</span>}
        </div> : null
    }

    const actionBlock = () => {

        return (
            <div style={{display: 'flex', justifyContent: 'end'}}>
                { actions.map((value, index) => {
                    return <div key={index}><Button onClick={event => {
                        if(typeof value.goTo === 'function') value.goTo(event)
                        return navigate(value.goTo);
                        
                    }} style={{marginTop: -8, marginLeft: 5}} {...value} /></div>
                })}
            </div>
        );
    }

    const containerBlock =  () => {
        return (
            <div>
                {titleBlock()}
                <div>{children}</div>
            </div>
        )
    }

    if(card) {
        return <div>
            <div style={{display: 'flex'}}>
                <div style={{width: '50%'}}>{titleBlock()}</div>
                <div style={{width: '100%'}}>{actionBlock()}</div>
            </div>
            <MCard>
                <div style={{padding: 10}}>{children}</div>
            </MCard>
        </div>
    }

    if(container) return <Container maxWidth={containerMaxWidth}>
        <div>{containerBlock()}</div>
    </Container>

    return containerBlock();

}