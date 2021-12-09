import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import Directory from "./Directory";

const Side = () => {
    const [resources, setResources] = useState();

    useEffect(() => {
        axios.get(`/api/getDirectories`)
        .then((response) => {
            const tree = response.data;
            // let dirPaths = [];

            // let i = 0;

            // while (i < root.length){
            //     let dirs = [];
            //     dirs.push(root[i]); // 첫 시작 인덱스 부터 dirs에 넣고

            //     let skip = 1;
            //     for (let j = i + 1; j < root.length; j++){
            //         if (root[j].startsWith(root[i])){
            //             dirs.push(root[j]); // 시작한 인덱스의 하위 디렉토리들 dirs에 넣기
            //             skip++; // 넣은 디렉토리는 skip
            //         } else{
            //             break;
            //         }
            //     }

            //     dirPaths.push(dirs); // 디렉토리와 하위 디렉토리들로 구성 된 배열 dirPaths에 넣기
            //     i = i + skip;
            // }

            const directory = <Directory dirPaths = {tree} prePath = {tree[0]} depth = {0}/>;
            setResources(directory);
        }).catch((error) => {
            alert("오류가 발생하였습니다.");
        });
    }, []);

    return (
        <Wrapper>
            {resources}
        </Wrapper>
    );
}

export default Side;

const Wrapper = styled.div`
    display: inline-block;
    width: 20%;
    height: 100%;
    overflow: scroll;
`