import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setDir } from '../../redux/actions';
import Detail from './Detail';
import Add from './Add';

import PngFolder from '../../images/folder.png';
import PngAudio from '../../images/audio.png';
import PngVideo from '../../images/video.png';
import PngFile from '../../images/file.png';
import PngBack from '../../images/back.png';
import PngAdd from '../../images/add.png';

const Thumbnail = (props) => {
    const dispatch = useDispatch();

    const [image, setImage] = useState(); // 이미지 파일인 경우 사용하는 state
    const [detail, setDetail] = useState(false); // detail 창 띄울지
    const [add, setAdd] = useState(false); // add 창 띄울지
    const [display, setDisplay] = useState('inline-block'); // 삭제 시 컴포넌트 없애기 위하여
    const [hover, setHover] = useState(false);

    // file 의 유형에 따라 표시할 image 저장
    useEffect(()=> {
        if(props.fileInfo[1] === null){
            if(props.fileInfo[0].indexOf('.') === -1){ // 디렉토리
                setImage(PngFolder);
            }else{ // type 모르는 파일
                setImage(PngFile);
            }
        }else if(props.fileInfo[1].startsWith('image')){ // 이미지 파일
            axios.get(`/api/getFile?message=${props.dirPath}/${props.fileInfo[0]}`, {responseType: 'arraybuffer'})
            .then((response) => { // 이미지 파일의 경우 미리보기를 위해 이미지 가져옴
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
        else if(props.fileInfo[1].startsWith('video')){ // 동영상 파일
            setImage(PngVideo);
        }
        else if(props.fileInfo[1].startsWith('audio')){ // 오디오 파일
            setImage(PngAudio);
        }
        else if(props.fileInfo[1] === 'add'){ // 추가
            setImage(PngAdd);
        }
        else if(props.fileInfo[1] === 'back'){ // 뒤로가기
            setImage(PngBack);
        }
        else{ // 이미지, 동영상, 오디오, 모르는 파일 제외 type
            setImage(PngFile);
        }

        return () => { // image 파일은 컴포넌트 사라질 때 blob url 반환
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

    const handleMouseOver = () => {
        setHover(true);
    }

    const handleMouseOut = () => {
        setHover(false);
    }

    const deleteFile = () => {
        if(window.confirm("정말 삭제하시겠습니까?")){
            if(props.fileInfo[1] === null && props.fileInfo[0].indexOf('.') === -1){ // 디렉토리
                let inputString = window.prompt(`해당 디렉토리 내부 모든 파일이 삭제됩니다.\n삭제를 원하시면 해당 디렉토리 명을 입력하십시오. (${props.fileInfo[0]})`);
                if(inputString === props.fileInfo[0]){
                    axios.get(`/api/deleteDir?message=${props.dirPath}/${props.fileInfo[0]}`)
                    .then((response) => {
                        if(response.data === "success"){
                            alert("삭제 완료!");
                            setDisplay("none");
                        }else{
                            alert("오류가 발생하였습니다.");
                        }
                    }).catch((error) => {
                        alert("오류가 발생하였습니다.");
                    });
                }else if(inputString !== null){
                    alert("디렉토리 명이 다릅니다.")
                }
            }
            else{ // 디렉토리 외 파일
                axios.get(`/api/deleteFile?message=${props.dirPath}/${props.fileInfo[0]}`)
                .then((response) => {
                    if(response.data === "success"){
                        alert("삭제 완료!");
                        setDisplay("none");
                        if(image) URL.revokeObjectURL(image);
                    }else{
                        alert("오류가 발생하였습니다.");
                    }
                }).catch((error) => {
                    alert("오류가 발생하였습니다.");
                });
            }
        }
    }    

    return(
        <Container display = {display}>
            <Wrapper onClick = {thumbnailClick} onMouseOver = {handleMouseOver} onMouseOut = {handleMouseOut}>
                <Image src = {image}/>
                <Name type = {props.fileInfo[1]}>
                    {props.fileInfo[0]}
                </Name>
                {props.fileInfo[1] !== "add" && props.fileInfo[1] !== "back" ?
                <Delete hover = {hover} onClick = {(event) => {event.stopPropagation(); deleteFile();}}>X</Delete> : null}
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
    position: relative;
    width: 140px;
    height: 178px;
    cursor: pointer;

    &:hover {
        background-color: #DDEEFF;
    }
`

const Image = styled.img`
    top: 20px;
    left: 20px;
    position: absolute;
    width: 100px;
    height: 100px;
    cursor: pointer;
`

const Name = styled.div`
    position: absolute;
    top: 125px;
    left: 20px;
    width: 100px;
    height: 50px;
    text-align: center;
    font-size: 12px;
    color: ${props => props.type === "add" || props.type === "back" ? "blue" : "#000"};
    font-weight: ${props => props.type === "add" || props.type === "back" ? "bold" : "normal"};
    word-break: break-all;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
`

const Delete = styled.div`
    cursor: pointer;
    display: ${props => props.hover ? "inline-block" : "none"};
    position: absolute;
    left: 120px;
    width: 17px;
    padding-left: 3px;
    font-size: 20px;
    color: red;
    font-weight: bold;
`