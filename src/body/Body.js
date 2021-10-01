import React, {useState, useEffect} from 'react';
import styled from 'styled-components';

import Thumbnail from './Thumbnail';

import axios from 'axios';

const Body = (props) => {
    // 썸네일 컴포넌트 맵을 담은 배열 스테이트 return에서 사용하여 선택한 메뉴에 맞는 썸네일 컴포넌트들 출력
    const [thumbnailList, setThumbnailList] = useState([]);

    // 이미지를 15개씩 페이지 넘기는 식으로 구현 현재 가리키고 있는 페이지 번호
    const [currentPage, setCurrentPage] = useState(1);

    // 추출해온 이미지 정보 리스트 저장
    const [imgInfoList, setImgInfoList] = useState();

    // 이미지 길이 저장
    const [imgListLength, setImgListLength] = useState();

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
        min-height: 500px;
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
                // 스프링에서 전달받은 메뉴를 통하여 메뉴와 같은 이름의 디렉토리에 있는 파일 가져옴
                const res = response.data;
                // 구분하기 위하여 ','가 붙여서 오기 때문에 split 해주고, 마지막 빈 데이터를 지우기 위해 pop 한번 해줌
                const first_divided = res.split(',');
                first_divided.pop();
                
                // status[] => 0: width, 1: height, 2: url, 3: isVideo
                const status = []; 

                // width, height, url로 split한 배열 담아주기
                for(let i=0; i<first_divided.length; i++){
                    // '!'로 스플릿하고
                    const second_divided = first_divided[i].split('!');
                    
                    // 사이즈가 1150, 650이 넘는다면, 너비는 1150, 높이는 650이 넘어가지 않도록 원본 너비, 높이 비율 유지하면서 조정 
                    if(Number(second_divided[0]) > 1150 || Number(second_divided[1]) > 650){
                    
                        second_divided[0] = Number(second_divided[0]);
                        second_divided[1] = Number(second_divided[1]);
                    
                        if(second_divided[0] > 1150){
                            second_divided[1] = second_divided[1] * 1150 / second_divided[0];
                            second_divided[0] = second_divided[0] * 1150 / second_divided[0];
                        }

                        if(second_divided[1] > 650){
                            second_divided[0] = second_divided[0] * 650 / second_divided[1];
                            second_divided[1] = second_divided[1] * 650 / second_divided[1];
                        }

                        second_divided[0] = String(Math.round(second_divided[0]));
                        second_divided[1] = String(Math.round(second_divided[1]));
                    }

                    second_divided.push(second_divided[2].indexOf("@") !== -1 ? true : false);

                    // 스플릿한 배열 width_height_url 배열에 담아줌
                    status.push(second_divided);
                }

                // map을 사용하여 url 리스트에 들어있는 원소 개수 만큼 썸네일 컴포넌트 생성
                // 
                // 디테일 뷰를 활용하기 위해서 selected와 detail 같이 전달
                setImgInfoList(status);
                setImgListLength(status.length);

                // 페이지 가능한 수 만큼 선택할 수 있는 PageNumber 생성
                const intArr = [];
                for(let i=1; i < (status.length/21) + 1; i++){
                    intArr.push(i);
                }
                const bottomNumberList = intArr.map((n) => (<PageNumber name = {n} onClick = {() => {setCurrentPage(n)}}>{n}</PageNumber>));
                setNumberList(bottomNumberList);

                const slicedStatus = status.slice(0,21);

                const urlList = slicedStatus.map((s) => (<Thumbnail status = {s}/>));
                // return에서 사용하기 위하여 state에 썸네일 컴포넌트 넣어줌
                setThumbnailList(urlList);

            }).catch((error) => {
                console.log(error);
            });
        }
    },[props.menu]);

    //currentPage 바뀔 때 마다 15개 씩 이미지 출력
    useEffect(() => {
        let start = (currentPage-1) * 21;
        let end = 0;

        if(imgListLength >= currentPage * 21) {
            end = currentPage * 21;
        }else {
            end = imgListLength;
        }

        // 첫 실행 말고 값이 들어올 때만
        if(imgInfoList){
            const slicedImgInfoList = imgInfoList.slice(start,end);

            const urlList = slicedImgInfoList.map((s) => (<Thumbnail status = {s}/>));
            // return에서 사용하기 위하여 state에 썸네일 컴포넌트 넣어줌
            setThumbnailList(urlList);
        }
    },[currentPage]);

    // Home 과 나머지 메뉴 분리해서
    if(props.menu === "home"){
        return(
            <Wrapper>
                <Inner>
                    <Text1>Welcome 👋</Text1><br/>
                    <Text2>영상 파일의 경우, 해당 영상 썸네일의 파일 명을</Text2><br/>
                    <Text2>영상: example.mp4 => 썸네일: example@mp4.png</Text2><br/>
                    <Text2>이와 같이 @와 영상의 확장자를 붙여서 작성</Text2><br/>
                </Inner>
            </Wrapper>
        );
    } else{
        return(
            <Wrapper>
                <Inner>
                    {thumbnailList}
                </Inner>
                <PageNumberDiv>
                    {numberList}
                </PageNumberDiv>
            </Wrapper>
        );
    }
}

export default Body;