import React, { useState } from 'react';
import styled from 'styled-components';

import Header from './header/Header';
import Body from './body/Body';

const Layout = () => {
    // Header에서 메뉴를 클릭하면 menu useState 변경
    // 그리고 menu useState Body로 전달
    const [menu, setMenu] = useState("home");

    const Wrapper = styled.div`
        width: 1200px;
        margin: 0 auto;
    `;

    return(
        <Wrapper>
            <Header menu = {menu} setMenu = {setMenu}/>
            <Body menu = {menu}></Body>
        </Wrapper>
    );
}

export default Layout;