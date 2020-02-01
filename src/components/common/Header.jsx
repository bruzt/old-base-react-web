import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import ReactSwitch from 'react-switch';
import { useSelector, useDispatch } from 'react-redux';

import { setTheme } from '../../redux/actions/themeActions';

import logoImg from '../../assets/img/logo-200x100.jpg'

import If from '../common/If';

export default function Header(props) {

    const theme = useSelector( (state) => state.theme);
    const dispatch = useDispatch();

    function logOut(){

        sessionStorage.removeItem('_userLogin');
        localStorage.removeItem('_userLogin');

        //props.history.push('/')
        //props.history.replace('/admin') //.push('/admin');
        
        //window.location.reload();
    }


    return (
        <StyledHeader>
            
                <div className="col">

                    <StyledNavLogo className="navbar">
                        <Link to="/" className='nav-brand'>
                            <img src={logoImg} alt="logo-img" />
                        </Link>
                    </StyledNavLogo>

                </div>

                <MidHeader className="col">

                    <h6>CABEÇALHO</h6>
                    
                </MidHeader>

                <div className="col d-flex">
                    <div className="row">
                        
                        <StyledThemeSwitchWrapper>
                            
                            <ReactSwitch
                                onChange={() => dispatch(setTheme())}
                                checked={(theme.title === 'dark') ? true : false}
                                height={15}
                                width={40}
                                handleDiameter={20}
                                onColor={theme.secondary}
                                offColor={theme.secondary}
                                onHandleColor={theme.background}
                                offHandleColor={theme.background}
                            />
                        </StyledThemeSwitchWrapper>

                    </div>
                    <div className="row">
                        <If test={props.login}>
                            <StyledAdminWrapper>
                                <Link to='/admin' className='btn'>
                                    Login <i className="fa fa-sign-in" />
                                </Link>
                            </StyledAdminWrapper>
                        </If>

                        <If test={props.admin}>
                            <StyledAdminWrapper>
                                <Link to='/' className='btn' onClick={() => logOut()}>
                                    Logout <i className="fa fa-sign-out" />
                                </Link>
                            </StyledAdminWrapper>
                        </If>
                    </div>
                </div>  
                
        </StyledHeader>
    );
}

const StyledHeader = styled.header`
    display: flex;
    height: 100px;
    background: ${(props) => props.theme.primary};
`;

const StyledNavLogo = styled.nav`
    position: absolute;
    top: 0;
    left: 0;
    padding: 0;
    margin: 0;
    z-index: 10;
`;

const StyledThemeSwitchWrapper = styled.div`
    position: absolute;
    right: 5px;
    top: 5px;
    z-index: 10;
`;

const StyledAdminWrapper = styled.div`
    position: absolute;
    right: 1px;
    bottom: 1px;
    z-index: 10;
`;

const MidHeader = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;

    @media (max-width: 768px){
        display: none;
    }
`;