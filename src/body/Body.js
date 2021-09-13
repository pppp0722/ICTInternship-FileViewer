import React, {useState} from 'react';
import styled from 'styled-components';

import Thumbnail from './Thumbnail';
import Detail from './Detail';

const Body = (props) => {
    // 모달창을 위해 detail 만들어 줌 true면 모달창 띄우기, false면 모달창 없애기
    const [detail,setDetail] = useState(false);

    // data를 통하여 선택한 컴포넌트의 정보를 썸네일, 모달창에 전달
    const [data, setData] = useState("");

    const Wrapper = styled.div`
        width: 1200px;
        padding: 20px 0 20px 0;
        background-color: #BFEDCC;
    `
    
    const Inner = styled.div`
        margin: auto;
        width: 1160px;
        background-color: #FFF;
    `

    const Text = styled.div`
        margin: 100px 0 100px 16px;
        display: inline-block;
        font-size: 50px;
    `

    // Home 과 나머지 메뉴 분리해서
    if(props.menu === "home"){
        return(
            <Wrapper>
                <Inner>
                    <Text>Welcome!</Text>
                </Inner>
            </Wrapper>
        );
    } else{
        return(
            <Wrapper>
                <Inner>
                    <Thumbnail name = "1" setData = {setData} setDetail = {setDetail}/>
                    <Thumbnail name = "2" setData = {setData} setDetail = {setDetail}/>
                    <Thumbnail name = "3" setData = {setData} setDetail = {setDetail}/>
                    <Thumbnail name = "4" setData = {setData} setDetail = {setDetail}/>
                    <Thumbnail name = "5" setData = {setData} setDetail = {setDetail}/>
                    <Thumbnail name = "6" setData = {setData} setDetail = {setDetail}/>
                    <Thumbnail name = "7" setData = {setData} setDetail = {setDetail}/>
                </Inner>
                <Detail data = {data} detail = {detail} setDetail = {setDetail}/>
            </Wrapper>
        );
    }
}

export default Body;