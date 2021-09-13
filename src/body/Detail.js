import React from 'react';
import styled from 'styled-components';

const Detail = (props) => {
    // 부모에서 모달창 띄울 것인지 boolean값 가져옴
    let visible = props.detail;

    // 고정시키고 주변 어둡게 해줘서 모달창 강조
    const Wrapper = styled.div`
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        background-color: rgba(0,0,0,0.5);

        visibility: ${visible ? "true" : "hidden"};
    `

    const Button = styled.button`
        float: right;
        display: block;
        width: 80px;
        height: 50px;
        font-size: 30px;
    `

    const Text = styled.div`
        font-size: 30px;
    `

    // 닫으면 부모의 모달창 띄울 것인지 boolean값 false로 변경
    const close = () => {
        props.setDetail(false)
    }

    return(
        <Wrapper>
            <Button onClick = {close}>X</Button>
        </Wrapper>
    );
}

export default Detail;