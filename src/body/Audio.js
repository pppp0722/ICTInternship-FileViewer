import React,{useState} from 'react';
import styled from 'styled-components';
import axios from 'axios';
import AudioPlay from './AudioPlay';

const Audio = (props) => {
    const [detail, setDetail] = useState(false);
    const [audio, setAudio]= useState();

    const Wrapper = styled.div`
        display: inline-block;
        position: relative;
        margin: 16px 16px 16px 16px;
        cursor: pointer;
        position: relative;
        width: 354px;
        background-color: #E9F9EE;
    `

    const Context = styled.div`
    `

    const clicked = () => {
        axios.get(`http://localhost:8091/api/getsource?message=${props.menu}/${props.fileName}`, {responseType: 'arraybuffer'}) // 로컬
        // axios.get(`http://183.111.234.54:8091/api/getsource?message=${props.menu}/${fileName}`, {responseType: 'arraybuffer'}) // Linux
        .then((response) => {
            const blob = new Blob(
                [response.data],
                {type: response.headers['content-type']}
            );
            const audio = URL.createObjectURL(blob);

            // blob정보 저장
            setAudio(audio);

            // Detail에 보낼 배열을 useState에 넣고 detail창을 true로 해줌
            setDetail(true); // state에 디테일 뷰 띄우기 true로
        }).catch((error) => {
            console.log(error);
        });
    }

    return(
        <Wrapper>
            <Context onClick = {clicked}>
                🔊
                {props.fileName}
            </Context>
            {detail ? <AudioPlay menu = {props.menu} fileName = {props.fileName} url = {audio} setDetail = {setDetail}/> : null}
        </Wrapper>
    );
}

export default Audio;