import React from 'react';
import styled from 'styled-components';

const Thumbnail = (props) => {
    const Wrapper = styled.div`
        display: inline-block;
        cursor: pointer;
        width: 200px;
        height: 100px;
        margin: 16px 16px 16px 16px;
        background-color: yellow;
        text-align: center;
        line-height: 100px;
    `

    // 어떤 썸네일을 선택했느냐에 따라 부모의 데이터 값 변경
    const setData = () => {
        props.setData(props.name);
        props.setDetail(true);
    };

    return(
        <Wrapper onClick = {() => setData()}>{props.name}</Wrapper>
    );
}

export default Thumbnail;