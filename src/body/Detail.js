import React, {useState} from 'react';
import styled from 'styled-components';

const Detail = (props) => {
    const [backgroundColor , setBackgroundColor] = useState("grey");

    // 고정시키고 주변 어둡게 해줘서 강조시킴
    // 부모의 detail 보여줄 것인지 boolean값이 true면 보여주고 false면 hidden
    const Wrapper = styled.div`
        display: table-cell;
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        background-color: ${backgroundColor === "grey" ? "rgba(0,0,0,0.5)" : backgroundColor === "white" ? "#FFF" : "#000"};

        visibility: ${props.detail ? "true" : "hidden"};
    `

    const Top = styled.div`
        height: 50px;
        text-align: center;
        padding-left: 80px;
    `

    const ChangeButton = styled.button`
        width: 80px;
        height: 50px;
        font-size: 30px;
    `

    const CloseButton = styled.button`
        float: right;
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
    `

    const Video = styled.video`
        max-width: 1150px;
        max-height: 650px;
    `

    // 닫으면 부모의 디테일뷰 띄울 것인지 boolean값 false로 변경
    // 선택한 값 없음으로 변경
    const close = () => {
        props.setDetail(false)
        props.setSelected([]);
    }

    const backgroundChange = (color) => {
        setBackgroundColor(color);
    }

    return(
        <Wrapper>
            <Top>
                <ChangeButton style = {{backgroundColor: "grey"}} onClick = {() => backgroundChange("grey")}></ChangeButton>
                <ChangeButton style = {{backgroundColor: "white"}} onClick = {() => backgroundChange("white")}></ChangeButton>
                <ChangeButton style = {{backgroundColor: "black"}} onClick = {() => backgroundChange("black")}></ChangeButton>
                <CloseButton onClick = {close}>X</CloseButton>
            </Top>
            <Context>
                <Inner>
                    {!props.selected[3] ? <Img width = {props.selected[0]} height = {props.selected[1]} src = {props.selected[2]}/>
                                    : <Video src = {props.selected[2]} controls/>}
                </Inner>
            </Context>
        </Wrapper>
    );
}

export default Detail;