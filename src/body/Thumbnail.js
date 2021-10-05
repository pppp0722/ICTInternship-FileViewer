import React, {useState,useEffect} from 'react';
import styled from 'styled-components';
import axios from 'axios';

import imageBackground from '../images/image_background.PNG';
import PlayButton from '../images/play.png';
import Detail from './Detail';

// 썸네일의 경우 레이아웃을 위해 너비 200px, 높이 100px로 한 열에 5개씩 들어감
const Thumbnail = (props) => {
    // 처음 썸네일 이미지를 로드하고 blob url을 적재하기 위한 useState
    const [image, setImage] = useState();

    // Detail에 전달할 파일의 정보 Array
    // 0: width, 1: height, 2: blob url, 3: isVideo(boolean) 4: file name
    const [fileInfo, setFileInfo] = useState();

    // Detail을 킬 것인지 boolean 값
    const [detail, setDetail] = useState(false);

    const Wrapper = styled.div`
        display: inline-block;
        position: relative;
        margin: 16px 16px 16px 16px;
        cursor: pointer;
        position: relative;
    `
    const Div = styled.div`
        background-image: url(${props => props.bgImage});
        background-repeat: round;
        width: 133px;
        height: 133px;
    `
    const Img = styled.img`
        width: 133px;
        height: 133px;
        position: absolute;
    `

    const Play = styled.img`
        position: absolute;
        width: 40px;
        height: 40px;
        margin: 46px 46px 0 46px;
    `

    // 컴포넌트에 들어갈 이미지를 Spring에 요청해서 받아옴
    useEffect(()=> {
        // Spring에 "메뉴/파일이름" 을 message로 get 요청
        axios.get("/api/getsource?message="+props.status[2], {responseType: 'arraybuffer'})
        .then((response) => {
            // response로 file data 받음
            // src에 넣을 blob 생성
            let blob = new Blob(
                [response.data],
                {type: response.headers['content-type']}
            );
            let img = URL.createObjectURL(blob);

            // Detail에 url 전달하기 위한 목적으로 useState에 넣어줌
            setImage(img);
        }).catch((error) => {
            console.log(error);
        });
    },[]);

    // status[] => 0: width, 1: height, 2: url, 3: isVideo
    const thumbnailClick = () => {
        let selected = [];
        selected.push(props.status[0]);
        selected.push(props.status[1]);

        // 영상인 경우
        // Ex) "a/b@mp4.png" => "a/b.mp4" 로 변경하기 위한 로직
        if(props.status[3]){
            // a/b@mp4.png => "a/b" / "mp4.png"
            let splited1 = props.status[2].split("@");
            // "mp4.png" => "mp4" / "png"
            let splited2 = splited1[1].split(".");
            // "example" + "." + "mp4"
            let url = splited1[0] + "." + splited2[0];
            
            // 해당 썸네일에 맞는 영상을 Spring에 요청하여 받아옴 (썸네일은 단순 png)
            axios.get("/api/getsource?message="+url, {responseType: 'arraybuffer'})
            .then((response) => {
                let blob = new Blob(
                    [response.data],
                    {type: response.headers['content-type']}
                );
                let video = URL.createObjectURL(blob);

                // blob정보, 동영상인지, 파일 이름을 넣어 줌
                selected.push(video);
                selected.push(props.status[3]);
                selected.push(url.split("/")[1]);

                // Detail에 보낼 배열을 useState에 넣고 detail창을 true로 해줌
                setFileInfo(selected); // state에 선택한 url 넣어주기
                setDetail(true); // state에 디테일 뷰 띄우기 true로
            }).catch((error) => {
                console.log(error);
            });
        }
        else{
            // 동영상이 아닌 경우, 기존의 useState에 넣어 놓은 blob url 넣어주고, 동영상인지 false 넣어주고, 파일 이름 넣어줌
            selected.push(image);
            selected.push(props.status[3]);
            selected.push(props.status[2]);

            // Detail에 보낼 배열을 useState에 넣고 detail창을 true로 해줌
            setFileInfo(selected);
            setDetail(true); 
        }
    };
    
    return(
        <Wrapper>
            <Div bgImage = {imageBackground} onClick = {thumbnailClick}>
                <Img src = {image} background-image = {imageBackground}/>
                {props.status[3] ? <Play src = {PlayButton}/> : ""}
            </Div>
            {detail ? <Detail fileInfo = {fileInfo} setDetail = {setDetail}/> : null}
        </Wrapper>
    );
}

export default Thumbnail;