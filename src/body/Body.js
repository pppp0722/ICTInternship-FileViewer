import React, {useState, useEffect} from 'react';
import styled from 'styled-components';

import Thumbnail from './Thumbnail';
import Detail from './Detail';

import axios from 'axios';

const Body = (props) => {
    // 모달창을 위해 detail 만들어 줌 true면 모달창 띄우기, false면 모달창 없애기
    const [detail,setDetail] = useState(false);

    // data를 통하여 선택한 컴포넌트의 정보를 썸네일, 모달창에 전달
    const [selected, setSelected] = useState([]);

    // 썸네일 컴포넌트 맵을 담은 배열 스테이트 return에서 사용하여 선택한 메뉴에 맞는 썸네일 컴포넌트들 출력
    const [thumbnailList, setThumbnailList] = useState([]);
     
    const Wrapper = styled.div`
        width: 1200px;
        padding: 20px 0 20px 0;
        background-color: #BFEDCC;
    `
    
    const Inner = styled.div`
        margin: auto;
        width: 1160px;
        background-color: #FFF;
        min-height: 640px;
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

    // 선택한 메뉴가 바뀔때 마다 서버에 저장된 스프링에서 현재 메뉴와 같은 디렉토리에 있는 영상 제외 파일의 url을 모두 전송함
    // 썸네일의 경우, 이름 마지막에 example@mp4.png 와 같이 url 전달옴
    // 따라서, 썸네일에서는 그대로 사용하고 썸네일 클릭 시 영상을 띄울 때는 example@mp4.png => example.mp4로 변경
    useEffect(() => {
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
                console.log(first_divided[i]);
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
            const urlList = status.map((s) => (<Thumbnail status = {s} setSelected = {setSelected} setDetail = {setDetail}/>));

            // return에서 사용하기 위하여 state에 썸네일 컴포넌트 넣어줌
            setThumbnailList(urlList);
        }).catch((error) => {
            console.log(error);
        });
    },[props.menu]);

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
                <Detail selected = {selected} setSelected = {setSelected} detail = {detail} setDetail = {setDetail}/>
            </Wrapper>
        );
    }
}

export default Body;