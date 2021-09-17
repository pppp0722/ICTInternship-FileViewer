import axios from 'axios';
import React, {useState} from 'react';
import styled from 'styled-components';

import DownloadPng from "../images/download.png";

const Detail = (props) => {
    const [backgroundColor , setBackgroundColor] = useState("grey");
    const [zoomLevel, setZoomLevel] = useState(1.0);

    // 고정시키고 주변 어둡게 해줘서 강조시킴
    // 부모의 detail 보여줄 것인지 boolean값이 true면 보여주고 false면 hidden
    const Wrapper = styled.div`
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
    `

    const ZoomButton = styled.button`
        float: left;
        width: 80px;
        height: 50px;
        font-size: 30px;
    `

    const ChangeButton = styled.button`
        width: 80px;
        height: 50px;
        font-size: 30px;
    `

    const DownloadButton = styled.button`
        float: right;
        width: 80px;
        height: 50px;
        font-size: 30px;
        margin-left: 80px;
    `

    const CloseButton = styled.button`
        float: right;
        width: 80px;
        height: 50px;
        font-size: 30px;
        font-weight: 600;
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
        max-width: 1150px;
        max-height: 650px;
    `

    const Video = styled.video`
        max-width: 1150px;
        max-height: 650px;
    `

    const Empty = styled.div`
        display: inline-block;
        width: 240px;
        height: 50px;
    `

    // 이미지 확대, 축소
    const zoomControl = (name) => {
        // +버튼이면 0.2 더하고 -버튼이면 0.2 감소
        let after_level = name === "-" ? zoomLevel - 0.5 : name === "+" ? zoomLevel + 0.5 : 1;
        // toFixed 함수를 사용하여 소수점 1자리 까지 반올림 (컴퓨터 소수계산은 작은 오차 있음)
        let fixed_level = Math.round(after_level*10)/10


        if(Number(props.selected[0]) * fixed_level <= 1150 && Number(props.selected[1]) * fixed_level <= 650){
            setZoomLevel(fixed_level <= 0.5 ? 0.5 : fixed_level);
        }
    }

    // 이미지의 식별을 위하여 배경 색상을 투명한 회색, 흰색, 검은색 선택 가능
    const backgroundChange = (color) => {
        setBackgroundColor(color);
    }

    // 다운로드 기능
    const download = () =>{
        // 현재 http:// ~~~~ /api/source/메뉴명/파일이름.확장자 인 상태이므로 파일이름, 확장자만 분리하여 가져온다.
        const splited1 = props.selected[2].split("api/")[1];
        // source/메뉴명/파일이름.확장자인 상태
        const splited2 = splited1.split("/")[2];

        // 파일 다운로드
        axios({url: props.selected[2], method: 'GET', responseType: "blob"})
        .then((response) => {
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute("download", splited2);
            document.body.appendChild(link);
            link.click();
        })
        .catch((error) => {console.log(error)});
    }

    // 닫으면 부모의 디테일뷰 띄울 것인지 boolean값 false로 변경
    // 선택한 값 없음으로 변경
    const close = () => {
        props.setDetail(false)
        props.setSelected([]);
    }

    return(
        <Wrapper>
            <Top>
                {!props.selected[3] ?
                <div>
                    <ZoomButton onClick = {() => zoomControl("-")}>-</ZoomButton>
                    <ZoomButton onClick = {() => zoomControl("1")}>x{zoomLevel}</ZoomButton>
                    <ZoomButton onClick = {() => zoomControl("+")}>+</ZoomButton>
                </div>
                : <Empty/>}

                <ChangeButton style = {{backgroundColor: "grey"}} onClick = {() => backgroundChange("grey")}></ChangeButton>
                <ChangeButton style = {{backgroundColor: "white"}} onClick = {() => backgroundChange("white")}></ChangeButton>
                <ChangeButton style = {{backgroundColor: "black"}} onClick = {() => backgroundChange("black")}></ChangeButton>
                <CloseButton onClick = {close}>X</CloseButton>
                <DownloadButton style = {{backgroundImage: `url(${DownloadPng})`}} onClick = {download}></DownloadButton>
            </Top>
            <Context>
                <Inner>
                    {!props.selected[3] ? <Img width = {props.selected[0]*zoomLevel} height = {props.selected[1]*zoomLevel} src = {props.selected[2]}/>
                                        : <Video src = {props.selected[2]} controls/>}
                </Inner>
            </Context>
        </Wrapper>
    );
}

export default Detail;