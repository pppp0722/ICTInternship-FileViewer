import React, {useState} from 'react';
import styled from 'styled-components';
import axios from 'axios';

import imageBackground from '../images/image_background.PNG';
import PlayButton from '../images/play.png';
import { useEffect } from 'react/cjs/react.development';

// 썸네일의 경우 레이아웃을 위해 너비 200px, 높이 100px로 한 열에 5개씩 들어감
const Thumbnail = (props) => {
    const [image, setImage] = useState();

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

    useEffect(()=> {
        axios.get("/api/getsource?message="+props.status[2], {responseType: 'arraybuffer'})
        .then((response) => {
            let blob = new Blob(
                [response.data],
                {type: response.headers['content-type']}
            );
            let image = URL.createObjectURL(blob);
            setImage(image);
        }).catch((error) => {
            console.log(error);
        });
    },[]);

    // status[] => 0: width, 1: height, 2: url, 3: isVideo
    const thumbnailClick = () => {
        let selected = [];
        selected.push(props.status[0]);
        selected.push(props.status[1]);

        // Ex) "a/b@mp4.png"
        if(props.status[3]){
            // a/b@mp4.png => "a/b" / "mp4.png"
            let splited1 = props.status[2].split("@");
            // "mp4.png" => "mp4" / "png"
            let splited2 = splited1[1].split(".");
            // "example" + "." + "mp4"
            let url = splited1[0] + "." + splited2[0];
            
            axios.get("/api/getsource?message="+url, {responseType: 'arraybuffer'})
            .then((response) => {
                let blob = new Blob(
                    [response.data],
                    {type: response.headers['content-type']}
                );
                let video = URL.createObjectURL(blob);
                console.log(video);
                selected.push(video);
                selected.push(props.status[3]);
                selected.push(url.split("/")[1]);

                props.setSelected(selected); // state에 선택한 url 넣어주기
                props.setDetail(true); // state에 디테일 뷰 띄우기 true로
            }).catch((error) => {
                console.log(error);
            });
        }
        else{
            selected.push(image );
            selected.push(props.status[3]);
            selected.push(props.status[2]);

            props.setSelected(selected); // state에 선택한 url 넣어주기
            props.setDetail(true); // state에 디테일 뷰 띄우기 true로
        }
    };

    return(
        <Div onClick = {thumbnailClick}>
            <Img src = {image} background-image = {imageBackground}/>
            {props.status[3] ? <Play src = {PlayButton}/> : ""}
        </Div>
    );
}

export default Thumbnail;