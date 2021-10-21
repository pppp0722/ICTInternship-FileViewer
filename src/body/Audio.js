import React,{useState, useEffect} from 'react';
import styled from 'styled-components';
import axios from 'axios';
import AudioPlay from './AudioPlay';

import { useSelector } from 'react-redux';

import Other from './Other';

const Audio = (props) => {
    const [detail, setDetail] = useState(false);
    const [audio, setAudio] = useState();

    // audio인지 아닌지
    const [suitable, setSuitable] = useState(true);

    const [otherDetail, setOtherDetail] = useState(false);

    const Wrapper = styled.div`
        display: inline-block;
        margin: 16px 16px 16px 16px;
        cursor: pointer;
        width: 354px;
    `

    const Context = styled.div`
        width: 354px;
        height: 32px;
        word-break: break-all;
        background-color: #E9F9EE;
        padding-top: 8px;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        font-size: 16px;
    `

    const Other = styled.div`
        width: 354px;
        height: 32px;
        padding-top: 8px;
        word-break: break-all;
        background-color: #FFB0A0;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        font-size: 16px;
    `

    const {url} = useSelector(state => state.url);

    useEffect(()=> {
        const ext = props.fileName.split('.')[1];
        if(ext !== "mp3" && ext !== "aac" && ext !== "wav" && ext !== "aiff" && ext !== "flac" && ext !== "ogg"){
            setSuitable(false);
        }
    },[]);

    const clicked = () => {
        axios.get(`${url}/api/getsource?message=${props.menu}/${props.fileName}`, {responseType: 'arraybuffer'})
        .then((response) => {
            const blob = new Blob(
                [response.data],
                {type: response.headers['content-type']}
            );
            const audio = URL.createObjectURL(blob);

            // blob정보 저장
            setAudio(audio);

            // Detail에 보낼 배열을 useState에 넣고 detail창을 true로 해줌
            if(suitable) setDetail(true); // state에 디테일 뷰 띄우기 true로
            else setOtherDetail(true);
        }).catch((error) => {
            console.log(error);
        });
    }

    return(
        <Wrapper>
            {suitable ? 
            <Context onClick = {clicked}>
                🔊{props.fileName}
            </Context> :
            <Other onClick = {clicked}>
                ❓{props.fileName}
            </Other>}
            {detail ? <AudioPlay menu = {props.menu} fileName = {props.fileName} url = {audio} setDetail = {setDetail}/> : null}
            {otherDetail ? <Other menu = {props.menu} fileName = {props.fileName} url = {audio} setDetail = {setOtherDetail}/> : null}
        </Wrapper>
    );
}

export default Audio;