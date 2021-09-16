import React from 'react';
import styled from 'styled-components';

import imageBackground from '../images/image_background.PNG';
import PlayButton from '../images/play.png';

// 썸네일의 경우 레이아웃을 위해 너비 200px, 높이 100px로 한 열에 5개씩 들어감
const Thumbnail = (props) => {
    const Div = styled.div`
        display: inline-block;
        cursor: pointer;
        margin: 16px 16px 16px 16px;
        background-image: url(${imageBackground});
        background-repeat: round;
        width: 200px;
        height: 123px;
        position: relative;
    `
    const Img = styled.img`
        width: 200px;
        height: 123px;
        position: absolute;
    `

    const Play = styled.img`
        position: absolute;
        width: 50px;
        height: 50px;
        margin: 36.5px 75px 0 75px;
    `

    // status[] => 0: width, 1: height, 2: url, 3: isVideo
    const thumbnailClick = () => {
        let selected = [];
        selected.push(props.status[0]);
        selected.push(props.status[1]);

        let url = props.status[2];
        // 선택한 url에 @가 들어간다면 동영상이니까 '@'을 없애주고 '.'을 넣어주고 기존 확장자를 없애준다.
        // Ex) example@mp4.png => example.mp4
        if(props.status[3]){
            // "example@mp4.png" => "example" / "mp4.png"
            let splited1 = props.status[2].split("@");
            // "mp4.png" => "mp4" / "png"
            let splited2 = splited1[1].split(".");
            // "example" + "." + "mp4"
            url = splited1[0] + "." + splited2[0];
        }

        selected.push(url);
        selected.push(props.status[3]);

        props.setSelected(selected); // state에 선택한 url 넣어주기
        props.setDetail(true); // state에 디테일 뷰 띄우기 true로
    };

    return(
        <Div onClick = {thumbnailClick}>
            <Img src = {props.status[2]} background-image = {imageBackground}/>
            {props.status[3] ? <Play src = {PlayButton}/> : ""}
        </Div>
    );
}

export default Thumbnail;