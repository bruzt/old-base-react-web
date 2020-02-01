import React from 'react';
import { ThemeProvider } from 'styled-components';
import { useSelector } from 'react-redux';

import '../dependencies/jquery';
import 'bootstrap/dist/js/bootstrap.bundle';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';

import GlobalStyle from './GlobalStyle';

import Routes from './Routes';
import Toast from '../components/common/Toast';

export default function App() {

    const theme = useSelector( (state) => state.theme);

    
    return (
            <ThemeProvider theme={theme}>
                <>

                    <GlobalStyle />
                    
                    <Toast />

                    <Routes />

                </>
            </ThemeProvider>

    );
}