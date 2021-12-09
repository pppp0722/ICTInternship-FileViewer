import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useSelector } from "react-redux";
import { setDir } from '../../redux/actions';
import Detail from './Detail';
import Add from './Add';

import PngFolder from '../../images/folder.png';
import PngAudio from '../../images/audio.png';
import PngVideo from '../../images/video.png';
import PngFile from '../../images/file.png';
import PngBack from '../../images/back.png';
import PngAdd from '../../images/add.png';

// 썸네일의 경우 레이아웃을 위해 너비 200px, 높이 100px로 한 열에 5개씩 들어감
const Thumbnail = (props) => {
    const dispatch = useDispatch();

    const [image, setImage] = useState();
    const [detail, setDetail] = useState(false);
    const [add, setAdd] = useState(false);
    const [display, setDisplay] = useState('inline-block');

    // file 의 유형에 따라 표시할 image 저장
    useEffect(()=> {
        if(props.fileInfo[1] === null){
            if(props.fileInfo[0].indexOf('.') === -1){
                setImage(PngFolder);
            }else{
                setImage(PngFile);
            }
        }else if(props.fileInfo[1].startsWith('image')){
            axios.get(`/api/getFile?message=${props.dirPath}/${props.fileInfo[0]}`, {responseType: 'arraybuffer'})
            .then((response) => {
                let blob = new Blob(
                    [response.data],
                    {type: props.fileInfo[1]}
                );
                let img = URL.createObjectURL(blob);

                setImage(img);
            }).catch((error) => {
                alert("오류가 발생하였습니다.");
            });
        }
        else if(props.fileInfo[1].startsWith('video')){
            setImage(PngVideo);
        }
        else if(props.fileInfo[1].startsWith('audio')){
            setImage(PngAudio);
        }
        else if(props.fileInfo[1] === 'back'){
            setImage(PngBack);
        }
        else if(props.fileInfo[1] === 'add'){
            setImage(PngAdd);
        }
        else{
            setImage(PngFile);
        }

        return () => {
            if(image) URL.revokeObjectURL(image);
        };
    },[props.dirPath, props.fileInfo]);

    const thumbnailClick = () => {
        if(props.fileInfo[1] === 'back'){ // back 클릭 시 상위 폴더로 이동
            let splited = props.dirPath.split("/");
            splited.pop()
            let result = "";
            for(let i = 0; i < splited.length; i++){
                result = result + splited[i] + "/";
            }
            result = result.substring(0, result.length - 1);

            dispatch(setDir(result));
        }else if(props.fileInfo[1] === 'add'){ // add 클릭 시 파일 업로드 모달 창 띄우기
            setAdd(true);
        }
        else if(props.fileInfo[0].indexOf('.') === -1){ // 디렉토리 파일 클릭 시 디렉토리 이동
            const path = props.dirPath !== '' ? `${props.dirPath}/${props.fileInfo[0]}` : props.fileInfo[0];
            dispatch(setDir(path));
        }else{
            setDetail(true); // 그냥 파일의 경우 detail 모달 띄우기
        }
    }

    return(
        <Container display = {display}>
            <Wrapper onClick = {thumbnailClick}>
                <Image src = {image}/>
                <Name type = {props.fileInfo[1]}>
                    {props.fileInfo[0]}
                </Name>
            </Wrapper>
            {detail ?
            <Detail setDetail = {setDetail} dirPath = {props.dirPath} fileInfo = {props.fileInfo} image = {image} setDisplay = {setDisplay}/> : null}
            {add ?
            <Add setAdd = {setAdd} dirPath = {props.dirPath} added = {props.added} setAdded = {props.setAdded}/> : null}
        </Container>
    );
}

export default Thumbnail;

const Container = styled.div`
    display: ${props => props.display};
`

const Wrapper = styled.div`
    float: left;
    width: 106px;
    height: 158px;
    margin: 7px 7px 7px 7px;
    cursor: pointer;

    &:hover {
        background-color: #DDEEFF;
    }
`

const Image = styled.img`
    width: 100px;
    height: 100px;
    margin: 3px 3px 0 3px;
    cursor: pointer;
`

const Name = styled.div`
    width: 100px;
    height: 48px;
    text-align: center;
    margin: 0 3px 3px 3px;
    word-break:break-all;
    font-size: 12px;
    color: ${props => props.type === "add" || props.type === "back" ? "blue" : "#000"};
    font-weight: ${props => props.type === "add" || props.type === "back" ? "bold" : "normal"};
`