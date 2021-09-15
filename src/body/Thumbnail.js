import React from 'react';
import styled from 'styled-components';

// 썸네일의 경우 레이아웃을 위해 너비 200px, 높이 100px로 한 열에 5개씩 들어감
const Thumbnail = (props) => {
    const Img = styled.img`
        display: inline-block;
        cursor: pointer;
        width: 200px;
        height: 100px;
        margin: 16px 16px 16px 16px;
        background-color: yellow;
        text-align: center;
        line-height: 100px;
    `

    const thumbnailClick = () => {
        props.setSelected(props.width_height_url);
        props.setDetail(true);
    };

    return(
        <Img src = {props.width_height_url[2]} onClick = {thumbnailClick}/>
    );
}

export default Thumbnail;