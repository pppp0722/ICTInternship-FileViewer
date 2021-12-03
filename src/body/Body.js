import React, {useState, useEffect} from 'react';
import styled from 'styled-components';

import Thumbnail from './Thumbnail';
import Audio from './Audio';
import Side from './Side';
import View from './View';

import './components.css'

const Body = () => {

    // // 이미지를 15개씩 페이지 넘기는 식으로 구현 현재 가리키고 있는 페이지 번호
    // const [currentPage, setCurrentPage] = useState(1);

    // // 추출해온 이미지 정보 리스트 저장
    // const [fileNameList, setFileNameList] = useState();

    // // 썸네일 컴포넌트 맵을 담은 배열 스테이트 return에서 사용하여 선택한 메뉴에 맞는 썸네일 컴포넌트들 출력
    // const [thumbnailList, setThumbnailList] = useState([]);

    // // 하단 보여주는 이미지 페이지 이동
    // const [numberList, setNumberList] = useState();
    // const menuStore = useSelector((store) => store.menuReducer);
     
    const Wrapper = styled.div`
        width: 1240px;
        height: 640px;
        background-color: #FFF;
        margin: 0 auto;
    `
    
    // const Context = styled.div`
    //     display: inline-block;
    //     width: 80%;
    //     height: 100%;
    //     background-color: red;
    // `

    // const Text1 = styled.div`
    //     margin: 20px 0 20px 50px;
    //     display: inline-block;
    //     font-size: 50px;
    //     font-weight: 500;
    // `

    // const Text2 = styled.div`
    //     margin: 20px 0 20px 50px;
    //     display: inline-block;
    //     font-size: 25px;
    // `

    // const PageNumberDiv = styled.div`
    //     text-align: center;
    //     width: 1200px;
    //     background-color: #BFEDCC;
    // `

    // const PageNumber = styled.div`
    //     text-align: center;
    //     width: 50px;
    //     height: 30px;
    //     display: inline-block;
    //     margin: 5px 20px 0 20px;
    //     font-size: 30px;
    //     cursor: pointer;
    //     color: ${props => props.name === currentPage ? "#00AAFF" : "#000"};
    // `

    // 첫 실행 or 선택한 메뉴가 바뀔때 마다 서버에 저장된 스프링에서 현재 메뉴와 같은 디렉토리에 있는 영상 제외 파일의 url을 모두 전송함
    // 썸네일의 경우, 이름 마지막에 example@mp4.png 와 같이 url 전달옴
    // 따라서, 썸네일에서는 그대로 사용하고 썸네일 클릭 시 영상을 띄울 때는 example@mp4.png => example.mp4로 변경
    // useEffect(() => {
    //     // 선택한 메뉴가 home이 아닐 때
    //     if( menuStore !== "home"){
    //         // 스프링 Controller에 get 보내기
    //         axios.get(`/api/source?message=${menuStore}`)
    //         .then((response) => {
    //             // 전달받은 response => "A.png,B.png,C.png," ...
    //             const res = response.data;

    //             console.log(res);
    //             // useState에 저장
    //             setFileNameList(response.data);

    //             const intArr = [];
    //             for(let i=1; i < (res.length/21) + 1; i++){
    //                 intArr.push(i);
    //             }
                    
    //             const bottomNumberList = intArr.map((n) => (<PageNumber name = {n} onClick = {() => {setCurrentPage(n)}}>{n}</PageNumber>));
    //             setNumberList(bottomNumberList);

    //             let currentThumnailList = [];
    //             if(menuStore !== "bgm" && menuStore !== "mr"){
    //                 currentThumnailList = res.slice(0,21).map((f) => (<Thumbnail fileName = {f}/>));
    //             }else{
    //                 currentThumnailList = res.slice(0,21).map((f) => (<Audio fileName = {f}/>));
    //             }

    //             // return에서 사용하기 위하여 state에 썸네일 컴포넌트 넣어줌
    //             setThumbnailList(currentThumnailList);
    //         }).catch((error) => {
    //             console.log(error);
    //         });
    //     }
    //     else {
    //         axios.get(`/api/source?message=${menuStore}`)
    //         .then((response) => {
    //             // 전달받은 response => "A.png,B.png,C.png," ...
    //             const res = response.data;

    //             console.log(res);
    //             // useState에 저장
    //             setFileNameList(response.data);

    //             const intArr = [];
    //             for(let i=1; i < (res.length/21) + 1; i++){
    //                 intArr.push(i);
    //             }
                    
    //             const bottomNumberList = intArr.map((n) => (<PageNumber name = {n} onClick = {() => {setCurrentPage(n)}}>{n}</PageNumber>));
    //             setNumberList(bottomNumberList);

    //             let currentThumnailList = [];
    //             if(menuStore !== "bgm" && menuStore !== "mr"){
    //                 currentThumnailList = res.slice(0,21).map((f) => (<Thumbnail fileName = {f}/>));
    //             }else{
    //                 currentThumnailList = res.slice(0,21).map((f) => (<Audio fileName = {f}/>));
    //             }

    //             // return에서 사용하기 위하여 state에 썸네일 컴포넌트 넣어줌
    //             setThumbnailList(currentThumnailList);
    //         }).catch((error) => {
    //             console.log(error);
    //         });
    //     }
    // },[menuStore]);


    //currentPage 바뀔 때 마다 21개 씩 이미지 출력
    // useEffect(() => {
    //     // 첫 실행 말고 값이 들어올 때만
    //     if(fileNameList){
    //         // 페이지 숫자 리스트 다시 갱신
    //         const intArr = [];
    //         const fileNum = fileNameList.length;
    //         for(let i=1; i < (fileNum/21 + 1); i++){
    //             intArr.push(i);
    //         }

    //         const bottomNumberList = intArr.map((n) => (<PageNumber name = {n} onClick = {() => {setCurrentPage(n)}}>{n}</PageNumber>));
    //         setNumberList(bottomNumberList);

    //         const start = (currentPage-1) * 21;
    //         const end = fileNum >= currentPage * 21 ? currentPage * 21 : fileNum;

    //         const slicedFileNameList = fileNameList.slice(start,end);

    //         let currentThumnailList = [];
    //         if(menuStore !== "bgm" && menuStore !== "mr"){
    //             currentThumnailList = slicedFileNameList.map((f) => (<Thumbnail fileName = {f}/>));
    //         }else{
    //             currentThumnailList = slicedFileNameList.map((f) => (<Audio fileName = {f}/>));
    //         }

    //         // return에서 사용하기 위하여 state에 썸네일 컴포넌트 넣어줌
    //         setThumbnailList(currentThumnailList);
    //     }
    // },[currentPage]);

    // const onSaveFile = async (e) => {
    //     const formData = new FormData();
    //     formData.append("menu", menuStore);

    //     for(let i=0; i<e.target.files.length; i++){
    //         formData.append(`files`, e.target.files[i]);
    //     }

    //     axios.post('/api/upload', formData)
    //     .then((response) => {
    //         if(response.data === "success"){
    //             alert("업로드 성공!");
    //         }else if(response.data === "error_fail"){
    //             alert("업로드 실패!");
    //         }else{
    //             alert("잘못된 접근입니다.");
    //         }
    //     }).catch((error) => {
    //          console.log(error);
    //     });
    // }

    // Home 과 나머지 메뉴 분리해서
    return(
        <Wrapper>
            <Side/>
            <View/>
        </Wrapper>
    );
}

export default Body;