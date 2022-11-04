import { Card } from '@mui/material';
import * as React from 'react';
import Page from '../../../Components/Page';

export default function AuthLayout({ children }) {
    return (
        <Page container containerMaxWidth='xs'>
            <div style={{marginTop: '40%'}}>
                <Card style={{padding: 20}}>
                    <div style={{marginTop: 10}}>
                        {children}
                    </div>
                </Card>
            </div>
        </Page>
    );
}