import React, {useState} from 'react';
import styled from 'styled-components';

import DownloadPng from "../images/download.png";

const Detail = (props) => {
    // 버튼을 통하여 배경 변경
    const [backgroundColor , setBackgroundColor] = useState("grey");

    // 확대 및 축소 레벨
    const [zoomLevel, setZoomLevel] = useState(1.0);

    // 고정시키고 주변 어둡게 해줘서 강조시킴
    // 부모의 detail 보여줄 것인지 boolean값이 true면 보여주고 false면 hidden
    // 선택한 버튼 이름에 따라 컬러 변경 "grey" 반투명 회색, "white" 불투명 흰색, "black" 불투명 검은색
    const Wrapper = styled.div`
        cursor: default;
        z-index: 99;
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        background-color: ${backgroundColor === "grey" ? "rgba(0,0,0,0.5)" : backgroundColor === "white" ? "#FFF" : "#000"};
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
        cursor: pointer;
    `

    const ChangeButton = styled.button`
        width: 80px;
        height: 50px;
        font-size: 30px;
        cursor: pointer;
    `

    const DownloadButton = styled.button`
        float: right;
        width: 80px;
        height: 50px;
        font-size: 30px;
        margin-left: 80px;
        cursor: pointer;
    `

    const CloseButton = styled.button`
        float: right;
        width: 80px;
        height: 50px;
        font-size: 30px;
        font-weight: 600;
        cursor: pointer;
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

        // 1150px, 650px 넘어가지 않는 선에서 배율 0.5 이상일 때 zoom level 조정
        if(Number(props.fileInfo[0]) * fixed_level <= 1150 && Number(props.fileInfo[1]) * fixed_level <= 650){
            setZoomLevel(fixed_level <= 0.5 ? 0.5 : fixed_level);
        }
    }

    // 다운로드 기능
    const download = () =>{
        // 받아온 blob url, 파일 이름으로 다운로드 구현
        const name =props.fileInfo[4];
        const url = props.fileInfo[2];
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute("download", name);
        document.body.appendChild(link);
        link.click();
    }

    // ZoomButton 클릭 시 zoomControl 함수 호출하여 zoom 단계 조정
    // ChangeButton 클릭 시 배경화면 담는 useState 바꿔줘서 배경 조정
    // CloseButton 클릭 시 Detail 창 닫기
    // DownloadButton 클릭 시 download 함수 호출
    // Inner에서 zoom level 고려하여 이미지 크기 조정 후 출력
    return(
        <Wrapper>
            <Top>
                {!props.fileInfo[3] ?
                <div>
                    <ZoomButton onClick = {() => zoomControl("-")}>-</ZoomButton>
                    <ZoomButton onClick = {() => zoomControl("1")}>x{zoomLevel}</ZoomButton>
                    <ZoomButton onClick = {() => zoomControl("+")}>+</ZoomButton>
                </div>
                : <Empty/>}

                <ChangeButton style = {{backgroundColor: "grey"}} onClick = {() => setBackgroundColor("grey")}></ChangeButton>
                <ChangeButton style = {{backgroundColor: "white"}} onClick = {() => setBackgroundColor("white")}></ChangeButton>
                <ChangeButton style = {{backgroundColor: "black"}} onClick = {() => setBackgroundColor("black")}></ChangeButton>
                <CloseButton onClick = {() => props.setDetail(false)}>X</CloseButton>
                <DownloadButton style = {{backgroundImage: `url(${DownloadPng})`}} onClick = {download}></DownloadButton>
            </Top>
            <Context>
                <Inner>
                    {!props.fileInfo[3] ? <Img width = {props.fileInfo[0]*zoomLevel} height = {props.fileInfo[1]*zoomLevel} src = {props.fileInfo[2]}/>
                                        : <Video src = {props.fileInfo[2]} controls/>}
                </Inner>
            </Context>
        </Wrapper>
    );
}

export default Detail;