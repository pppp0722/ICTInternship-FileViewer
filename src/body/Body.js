import React, {useState, useEffect} from 'react';
import styled from 'styled-components';

import Thumbnail from './Thumbnail';
import Detail from './Detail';

import axios from 'axios';

const Body = (props) => {
    // 모달창을 위해 detail 만들어 줌 true면 모달창 띄우기, false면 모달창 없애기
    const [detail,setDetail] = useState(false);

    // data를 통하여 선택한 컴포넌트의 정보를 썸네일, 모달창에 전달
    const [data, setData] = useState("");

    const [text, setText] = useState("");

    const [imgList, setImgList] = useState([]);
     
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
    useEffect(() => {console.log(imgList)},[imgList]);
    // 서버에 저장된 php문에서 해당 디렉토리에 있는 이미지파일의 url을 모두 전송함
    // 이 메소드에서 모든 url을 받아와서 화면에 이미지 띄우게 할것
    const getText = () => {
        axios.get("http://localhost:80/image.php")
        .then((response) => {
            let res = response.data;
            let strArray = res.split(',');

            setImgList(strArray);
        }).catch((error) => {
            console.log(error);
        });
    }

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
                    <button onClick = {getText}>Get</button>
                </Inner>
                <Detail data = {data} detail = {detail} setDetail = {setDetail}/>
            </Wrapper>
        );
    }
}

export default Body;