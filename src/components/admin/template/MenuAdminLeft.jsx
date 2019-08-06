import React from 'react';
import styled from 'styled-components';

export default class MenuAdmin extends React.Component {

    render(){ 
        return (
            <StyledNav className='nav' id='menu-admin'>  
                NAVEGAÇÃO LATERAL
            </StyledNav>
        );
    }
}

const StyledNav = styled.nav`
    display: flex;
    height: 100%;
    justify-content: center;
`;

// col-lg-2 d-lg-flex d-none
// col-lg-2 d-lg-none d-flex