import React from 'react';
import styled from 'styled-components';

import Side from './side/Side';
import View from './view/View';

const Body = () => {

    return(
        <Wrapper>
            <Side/>
            <View/>
        </Wrapper>
    );
}

export default Body;

const Wrapper = styled.div`
    height: 610px;
    background-color: #FFF;
`