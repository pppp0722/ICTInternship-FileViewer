import React from 'react';
import styled from 'styled-components';

import Header from './header/Header';
import Body from './body/Body';

const Layout = () => {
    return(
        <Wrapper>
            <Header/>
            <Body/>
        </Wrapper>
    );
}

export default Layout;

const Wrapper = styled.div`
    padding: 10px 20px 10px 20px;
    background-color: #BFEDCC;
    width: 1280px;
    height: 720px;
    margin: 0 auto;
`;