import axios from 'axios';
import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';

import DownloadPng from "../images/download.png";

const Detail = (props) => {
    // 버튼을 통하여 배경 변경
    const [backgroundColor , setBackgroundColor] = useState("grey");

    // 확대 및 축소 레벨
    const zoomArray = [0.25, 0.5, 0.75, 1, 1.25, 1.5, 2, 3, 5, 8, 12, 17, 23, 30]
    const [zoomLevel, setZoomLevel] = useState(3);

    // 이미지 너비, 높이 저장
    const [width, setWidth] = useState();
    const [height, setHeight] = useState();

    const menuStore = useSelector(store => store.menuReducer);

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
        background-color: ${props => props.bgColor === "grey" ? "rgba(0,0,0,0.5)" : props.bgColor === "white" ? "#FFF" : "#000"};
    `

    const Top = styled.div`
        height: 50px;
        text-align: center;
    `

    const ZoomButton = styled.button`
        float: left;
        width: 80px;
        height: 50px;
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
        cursor: pointer;
        border-style: outset;
    `

    const CloseButton = styled.button`
        float: right;
        width: 80px;
        height: 50px;
        font-size: 30px;
        font-weight: 600;
        cursor: pointer;
        border-style: outset;
    `

    const DeleteButton = styled.button`
        float: right;
        width: 80px;
        height: 50px;
        font-size: 30px;
        font-weight: 600;
        cursor: pointer;
        border-style: outset;
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

    // 처음에 이미지 너비, 높이 가져옴
    useEffect(()=> {
        const img = new Image;
        img.src = props.fileInfo[0];

        let width = img.width;
        let height = img.height;

        if(width > 1150 || height > 650){
            if(width/1150 > height/650){
                height *= (1150/width);
                width = 1150; 
            }
            else{
                width *= (650/height);
                height = 650;
            }
        }

        setWidth(width);
        setHeight(height);

        return () => {
            if(props.fileInfo[1]){
                URL.revokeObjectURL(props.fileInfo[0]);
            }
        };
    },[]);

    // 이미지 확대, 축소
    const zoomControl = (name) => {
        let fixedZoomLevel = name === "1" ? 3 : name === "+" ? zoomLevel + 1 : zoomLevel - 1;
        if(zoomLevel >= 0 && zoomLevel <= 13){
            if(width * zoomArray[fixedZoomLevel] <= 1150 && height * zoomArray[fixedZoomLevel] <= 650){
                setZoomLevel(fixedZoomLevel);
            }
        }
    }

    // 다운로드 기능
    const download = () =>{
        // 받아온 blob url, 파일 이름으로 다운로드 구현
        const name =props.fileInfo[2];
        const url = props.fileInfo[0];
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute("download", name);
        document.body.appendChild(link);
        link.click();
    }

    // 삭제 기능
    const deleteFile = () =>{
        if(window.confirm("정말 삭제하시겠습니까?") === true){
            axios.get(`/api/delete?message=${menuStore}/${props.fileInfo[2]}`)
            .then((response) => {
                if(response.data === "success"){
                    alert("삭제 완료!");
                }
            }).catch((error) => {
                console.log(error);
            });
        }
    }

    // ZoomButton 클릭 시 zoomControl 함수 호출하여 zoom 단계 조정
    // ChangeButton 클릭 시 배경화면 담는 useState 바꿔줘서 배경 조정
    // CloseButton 클릭 시 Detail 창 닫기
    // DownloadButton 클릭 시 download 함수 호출
    // Inner에서 zoom level 고려하여 이미지 크기 조정 후 출력
    return(
        <Wrapper bgColor = {backgroundColor}>
            <Top>
                {!props.fileInfo[1] ?
                <div>
                    <ZoomButton style = {{fontSize: "30px"}} onClick = {() => zoomControl("-")}>-</ZoomButton>
                    <ZoomButton style = {{fontSize: "25px"}} onClick = {() => zoomControl("1")}>x{zoomArray[zoomLevel]}</ZoomButton>
                    <ZoomButton style = {{fontSize: "30px"}} onClick = {() => zoomControl("+")}>+</ZoomButton>
                </div>
                : <Empty/>}

                <ChangeButton style = {{backgroundColor: "grey"}} onClick = {() => setBackgroundColor("grey")}></ChangeButton>
                <ChangeButton style = {{backgroundColor: "white"}} onClick = {() => setBackgroundColor("white")}></ChangeButton>
                <ChangeButton style = {{backgroundColor: "black"}} onClick = {() => setBackgroundColor("black")}></ChangeButton>
                <CloseButton onClick = {() => props.setDetail(false)}>X</CloseButton>
                <DownloadButton style = {{backgroundImage: `url(${DownloadPng})`}} onClick = {download}></DownloadButton>
                <DeleteButton onClick = {deleteFile}>🗑</DeleteButton>
            </Top>
            <Context>
                <Inner>
                    {!props.fileInfo[1] ? <Img src = {props.fileInfo[0]} width = {width * zoomArray[zoomLevel]} height = {height * zoomArray[zoomLevel]}/>
                                        : <Video src = {props.fileInfo[0]} controls/>}
                </Inner>
            </Context>
        </Wrapper>
    );
}

export default Detail;