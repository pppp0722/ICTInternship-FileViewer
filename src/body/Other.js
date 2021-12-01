import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useSelector } from 'react-redux';

import DownloadPng from "../images/download.png";

const Other = (props) => {
    const menuStore = useSelector(store => store.menuReducer);

    const Wrapper = styled.div`
        cursor: default;
        z-index: 99;
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        background-color: rgba(0,0,0,0.5);
    `

    const Top = styled.div`
        height: 50px;
        text-align: center;
    `
    const Empty = styled.div`
        width: 240px;
        height: 50px;
        display: inline-block;
    `

    const Text = styled.div`
        font-size : 30px;
        display: inline-block;
        background-color: #3EF8FF;
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


    // 다운로드 기능
    const download = () =>{
        // 받아온 blob url, 파일 이름으로 다운로드 구현
        const name =props.fileName;
        const url = props.url;
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute("download", name);
        document.body.appendChild(link);
        link.click();
    }

    // 삭제 기능
    const deleteFile = () =>{
        if(window.confirm("정말 삭제하시겠습니까?") === true){
            axios.get(`/api/delete?message=${menuStore}/${props.fileName}`)
            .then((response) => {
                if(response.data === "success"){
                    alert("삭제 완료!");
                }
            }).catch((error) => {
                console.log(error);
            });
        }
    }

    // CloseButton 클릭 시 Detail 창 닫기
    // DownloadButton 클릭 시 download 함수 호출
    return(
        <Wrapper>
            <Top>
                <Empty/>
                <CloseButton onClick = {() => props.setDetail(false)}>X</CloseButton>
                <DownloadButton style = {{backgroundImage: `url(${DownloadPng})`}} onClick = {download}></DownloadButton>
                <DeleteButton onClick = {deleteFile}>🗑</DeleteButton>
            </Top>
            <Context>
                <Inner>
                    <Text>📄{props.fileName}</Text>
                </Inner>
            </Context>
        </Wrapper>
    );
}

export default Other;