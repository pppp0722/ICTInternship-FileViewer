import React, {useState, useEffect} from 'react';
import styled from 'styled-components';

import Thumbnail from './Thumbnail';

import axios from 'axios';

import './components.css'

const Body = (props) => {
    // 이미지를 15개씩 페이지 넘기는 식으로 구현 현재 가리키고 있는 페이지 번호
    const [currentPage, setCurrentPage] = useState(1);

    // 추출해온 이미지 정보 리스트 저장
    const [imgInfoList, setImgInfoList] = useState();

    // 썸네일 컴포넌트 맵을 담은 배열 스테이트 return에서 사용하여 선택한 메뉴에 맞는 썸네일 컴포넌트들 출력
    const [thumbnailList, setThumbnailList] = useState([]);

    // 하단 보여주는 이미지 페이지 이동
    const [numberList, setNumberList] = useState();
     
    const Wrapper = styled.div`
        width: 1200px;
        padding: 20px 0 20px 0;
        background-color: #BFEDCC;
    `
    
    const Inner = styled.div`
        margin: auto;
        width: 1160px;
        background-color: #FFF;
        min-height: 510px;
    `

    const Text1 = styled.div`
        margin: 20px 0 20px 50px;
        display: inline-block;
        font-size: 50px;
        font-weight: 500;
    `

    const Text2 = styled.div`
        margin: 20px 0 20px 50px;
        display: inline-block;
        font-size: 35px;
    `

    const InputDiv = styled.div`
        margin: auto;
        text-align: center;
        width: 1160px;
        padding: 20px 0 20px 0;
        background-color: #B6C9BB
    `

    const PageNumberDiv = styled.div`
        text-align: center;
        width: 1200px;
        background-color: #BFEDCC;
    `

    const PageNumber = styled.div`
        text-align: center;
        width: 50px;
        height: 30px;
        display: inline-block;
        margin: 5px 20px 0 20px;
        font-size: 30px;
        cursor: pointer;
        color: ${props => props.name === currentPage ? "#00AAFF" : "#000"};
    `

    // 첫 실행 or 선택한 메뉴가 바뀔때 마다 서버에 저장된 스프링에서 현재 메뉴와 같은 디렉토리에 있는 영상 제외 파일의 url을 모두 전송함
    // 썸네일의 경우, 이름 마지막에 example@mp4.png 와 같이 url 전달옴
    // 따라서, 썸네일에서는 그대로 사용하고 썸네일 클릭 시 영상을 띄울 때는 example@mp4.png => example.mp4로 변경
    useEffect(() => {
        // 선택한 메뉴가 home이 아닐 때
        if(props.menu !== "home"){
            // 스프링 Controller에 get 보내기
            axios.get("/api/source?message="+props.menu)
            .then((response) => {
                // 전달받은 response => "A.png,B.png,C.png," ...
                const res = response.data;

                // useState에 저장
                setImgInfoList(res);

                const intArr = [];
                for(let i=1; i < (res.length/21) + 1; i++){
                    intArr.push(i);
                }
                    
                const bottomNumberList = intArr.map((n) => (<PageNumber name = {n} onClick = {() => {setCurrentPage(n)}}>{n}</PageNumber>));
                setNumberList(bottomNumberList);

                const urlList = res.slice(0,21).map((f) => (<Thumbnail menu = {props.menu} fileName = {f}/>));
                // return에서 사용하기 위하여 state에 썸네일 컴포넌트 넣어줌
                setThumbnailList(urlList);
            }).catch((error) => {
                console.log(error);
            });
        }
    },[props.menu]);

    //currentPage 바뀔 때 마다 21개 씩 이미지 출력
    useEffect(() => {
        // 첫 실행 말고 값이 들어올 때만
        if(imgInfoList){
            // 페이지 숫자 리스트 다시 갱신
            const intArr = [];
            for(let i=1; i < (imgInfoList.length/21 + 1); i++){
                intArr.push(i);
            }

            const bottomNumberList = intArr.map((n) => (<PageNumber name = {n} onClick = {() => {setCurrentPage(n)}}>{n}</PageNumber>));
            setNumberList(bottomNumberList);

            const start = (currentPage-1) * 21;
            const end = imgInfoList.length >= currentPage * 21 ? currentPage * 21 : imgInfoList.length;

            const slicedImgInfoList = imgInfoList.slice(start,end);
            const urlList = slicedImgInfoList.map((f) => (<Thumbnail menu = {props.menu} fileName = {f}/>));
            // return에서 사용하기 위하여 state에 썸네일 컴포넌트 넣어줌
            setThumbnailList(urlList);
        }
    },[currentPage]);

    const onSaveFile = async (e) => {
        let suitableExt = true;

        const formData = new FormData();
        formData.append("menu", props.menu);

        for(let i=0; i<e.target.files.length; i++){
            const ext = e.target.files[i]["name"].split(".")[1].toLowerCase();
            console.log(ext);
            if(ext === "bmp" || ext === "jpg" || ext === "jpeg" || ext === "gif" || ext === "png" || ext === "raw"
            || ext === "rle" || ext === "dib" || ext === "tif" || ext === "tiff" || ext === "psd" || ext === "ai"
            || ext === "svg" || ext === "mp4" || ext === "m4v" || ext === "avi" || ext === "wmv" || ext === "mwa"
            || ext === "asf" || ext === "mpg" || ext === "mpeg" || ext === "ts" || ext === "mkv" || ext === "mov"){
                formData.append(`files`, e.target.files[i]);
            }else{
                suitableExt = false;
                break;
            }
        }

        if(suitableExt){
            axios.post("/api/upload", formData)
            .then((response) => {
                if(response.data === "success"){
                    alert("업로드 성공!");
                }else if(response.data === "error_fail"){
                    alert("업로드 실패!");
                }else{
                    alert("잘못된 접근입니다.");
                }
            }).catch((error) => {
                console.log(error);
            });
        }else{
            alert("이미지, 동영상 파일만 업로드 가능합니다.");
        }
    }

    // Home 과 나머지 메뉴 분리해서
    if(props.menu === "home"){
        return(
            <Wrapper>
                <Inner>
                    <Text1>Welcome 👋</Text1><br/>
                    <Text2>영상 파일의 경우, 해당 영상 썸네일의 파일 명을</Text2><br/>
                    <Text2>영상: example.mp4 => 썸네일: example@mp4.png</Text2><br/>
                    <Text2>이와 같이 @와 영상의 확장자를 붙여서 작성</Text2><br/>
                    <br/>
                    <Text2>파일 업로드 시, Ctrl or Shift 누르면서 파일 선택하면</Text2><br/>
                    <Text2>여러 개 파일 동시에 업로드 가능(이미지 or 동영상만 가능)</Text2><br/>
                </Inner>
            </Wrapper>
        );
    } else{
        return(
            <Wrapper>
                <Inner>
                    {thumbnailList}
                </Inner>
                <div class = "filebox">
                    <label for = "ex_file">File Upload</label>
                    <input id = "ex_file" type = "file" multiple required onChange = { e => onSaveFile(e)}></input>
                </div>
                <PageNumberDiv>
                    {numberList}
                </PageNumberDiv>
            </Wrapper>
        );
    }
}

export default Body;