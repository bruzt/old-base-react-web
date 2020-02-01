import React, { useState, useEffect } from 'react';
//import { bindActionCreators } from 'redux';
import { /*connect*/ useDispatch } from 'react-redux';
import axios from 'axios';
import styled from 'styled-components';
import { lighten } from 'polished';

import { setToast } from '../../../redux/actions/toastActions';

import LoginPageOrAdminPage from './LoginPageOrAdminPage';
import Header from '../../common/Header';
import Footer from '../../common/Footer';
import If from '../../common/If';

export default function LoginPage() {

    const dispatch = useDispatch();

    const [userState, setUser] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const [validTokenState, setValidToken] = useState(false);
    const [loginModeState, setLoginMode] = useState(true);
    const [keepConnectedState, setkeepConnected] = useState(false);
    const [errorsState, setErrors] = useState([]);

    useEffect( () => {

        document.title = 'React Login';

    }, []);
    

    function handleSubmit(event) {

        event.preventDefault();

        const user = { ...userState, password: ''};

        setUser(user);
        setErrors([]);

        (loginModeState) ? login() : signup();
    }

    function renderErrors(){

        return errorsState.map( (error, index) => {
            return (
                <div className="alert alert-danger" role="alert" key={index}>
                    {error}
                </div>
            );
        });
    }

    function login() {
        
        return submit(`http://localhost:3001/api/auth`);

    }
    
    function signup() {
    
        return submit(`http://localhost:3001/api/user`);
    }

    async function submit(url) {

        try {

            let response = await axios.post(url, userState);

            if(keepConnectedState){

                localStorage.setItem('_userLogin', JSON.stringify(response.data));

            } else {

                sessionStorage.setItem('_userLogin', JSON.stringify(response.data));
            }

            //window.location.reload();

            setValidToken(true);
            
        } catch (error) {
            console.error(error);
            error.response.data.errors.forEach( (message) => {
                dispatch(setToast({ messages: [{ title: 'Erro', text: message, color: 'red' }] }));
                //props.setToast({ messages: [{ title: 'Erro', text: message, color: 'red' }] });
            });
        }
    }

    function changeMode() {

        setLoginMode(!loginModeState);
    }

    if(validTokenState){

        return (<LoginPageOrAdminPage />);

    } else {

        return (
            <Container id='home-login'>
                
                <Header id='header-login' />

                <div className="container col-xl-4 col-lg-6 col-md-8 col-sm-10 col-xs-12" id="main-login">
                    <div className="card card-login card mt-5 mb-5">
                        <div className="card-header">Login</div>
                        <div className="card-body">
                            <form onSubmit={(event) => handleSubmit(event)}>
                                <If test={(errorsState.length > 0)}>
                                    {renderErrors()}
                                </If>
                                <If test={! loginModeState}>
                                    <div className="form-group">
                                        <label htmlFor="name">Nome</label>
                                        <input type="text" className='form-control' value={userState.name} onChange={(event) => setUser({ ...userState, name: event.target.value })} placeholder='Insira seu nome' />
                                    </div>
                                </If>
                                <div className="form-group">
                                    <label htmlFor="email">E-mail</label>
                                    <input type="email" className='form-control' value={userState.email} onChange={(event) => setUser({ ...userState, email: event.target.value })} placeholder='Insira seu e-mail' />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="password">Senha</label>
                                    <input type="password" className='form-control' value={userState.password} onChange={(event) => setUser({ ...userState, password: event.target.value })} placeholder='Insira sua senha' />
                                </div>
                                <If test={! loginModeState}>
                                    <div className="form-group">
                                        <label htmlFor="confirmPassword">Confirme a senha</label>
                                        <input type="password" className='form-control' value={userState.confirmPassword} onChange={(event) => setUser({ ...userState, confirmPassword: event.target.value })} placeholder='Confirme sua senha' />
                                    </div>
                                </If>
                                
                                <If test={loginModeState}>
                                    <div className="form-group">
                                        <div className="custom-control custom-switch">
                                            <input type="checkbox" className='custom-control-input' name='keepConnected' id='switchKeepConnected' onChange={(event) => setkeepConnected(event.target.checked)} />
                                            <label htmlFor='switchKeepConnected' className='custom-control-label'>Manter conectado</label>
                                        </div>
                                    </div>
                                </If>
                                <button type="submit" className="btn btn-primary btn-flat">
                                    {loginModeState ? 'Entrar' : 'Registrar'}
                                </button>
                            </form>
                            {/*
                            <br />
                            <a onClick={() => changeMode()}>
                                {state.loginMode ? 'Novo usuário? Registrar aqui!' : 'Já é cadastrado? Entrar aqui!'}
                            </a>
                            */}
                        </div>
                    </div>
                </div>

                <div className='container-fluid'>
                    <div className="row">
                        <div className="col p-0">

                            <Footer id='footer-login' />
                            
                        </div>
                    </div>
                </div>
                
            </Container>
        );
    }

    /*
    return (
        <React.Fragment>
        
            {/*<div className="login-box">
                <div className="login-logo"><b> My</b> Money</div>
                <div className="login-box-body">
                    <p className="login-box-msg">Bem vindo!</p>
                    <form onSubmit={(values) => onSubmit(values)}>
                        <InputAuth 
                            type="input" 
                            name="name"
                            placeholder="Nome" 
                            icon='user' 
                            hide={state.loginMode} 
                        />
                        <InputAuth 
                            type="email" 
                            name="email"
                            placeholder="E-mail" 
                            icon='envelope' 
                        />
                        <InputAuth 
                            type="password" 
                            name="password"
                            placeholder="Senha" 
                            icon='lock' 
                        />
                        <InputAuth 
                            type="password" 
                            name="confirm_password"
                            placeholder="Confirmar Senha" 
                            icon='lock' 
                            hide={state.loginMode} 
                        />
                        <div className='row'>
                            <div className="col-xs-4">
                                <button 
                                    type="submit"
                                    className="btn btn-primary btn-block btn-flat"
                                >
                                    {state.loginMode ? 'Entrar' : 'Registrar'}
                                </button>
                            </div>
                        </div>
                    </form>
                    {/*<br />
                    <a onClick={() => changeMode()}>
                        {state.loginMode ? 'Novo usuário? Registrar aqui!' : 'Já é cadastrado? Entrar aqui!'}
                    </a>
                </div>
            </div>

        </React.Fragment>
    );*/
}

/////////////////////////////////////

/*const mapDispatchToProps = dispatch => bindActionCreators({ setToast }, dispatch);

export default connect(null, mapDispatchToProps)(LoginPage);*/

const Container = styled.div`

    .card {
        background: ${(props) => lighten(0.15, props.theme.background)};
    }
`;
