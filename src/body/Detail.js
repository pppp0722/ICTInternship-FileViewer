import React from 'react';
import styled from 'styled-components';

const Detail = (props) => {
    // 고정시키고 주변 어둡게 해줘서 강조시킴
    // 부모의 detail 보여줄 것인지 boolean값이 true면 보여주고 false면 hidden
    const Wrapper = styled.div`
        display: table-cell;
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        background-color: rgba(0,0,0,0.5);

        visibility: ${props.detail ? "true" : "hidden"};
    `

    const Top = styled.div`
        height: 50px;
    `

    const Button = styled.button`
        float: right;
        display: block;
        width: 80px;
        height: 50px;
        font-size: 30px;
    `

    const Context = styled.div`
        height: 94%;
        width: 100%;
        display: table;
    `

    const Inner = styled.div`
        display: table-cell;
        vertical-align: middle;
        text-align: center;
    `
    const Img = styled.img`
        width: ${props.selected[0]};
        height: ${props.selected[1]};
    `

    // 닫으면 부모의 디테일뷰 띄울 것인지 boolean값 false로 변경
    // 선택한 값 없음으로 변경
    const close = () => {
        props.setDetail(false)
        props.setSelected([]);
    }

    return(
        <Wrapper>
            <Top>
                <Button onClick = {close}>X</Button>
            </Top>
            <Context>
                <Inner>
                    <Img width = {props.selected[0]} height = {props.selected[1]} src = {props.selected[2]}/>
                </Inner>
            </Context>
        </Wrapper>
    );
}

export default Detail;