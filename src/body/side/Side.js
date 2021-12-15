import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import Directory from "./Directory";

const Side = () => {
    const [dirPaths, setDirPaths] = useState();

    // 백엔드에서 재귀 순회를 통하여 모든 디렉토리를 검사하기 때문에
    // 받아온 디렉토리 정보는 {0: "", 1: "a", 2: "a/b", 3: "a/b/c", 4: "a/c", 5: "b", 6: "b/c"}와 같이 정렬되어 있음

    useEffect(() => {
        axios.get(`/api/getDirectories`)
        .then((response) => {
            setDirPaths(response.data); // root 이하 모든 디렉토리 정보 받아와서 Directory를 생성하고 props로 전달
        }).catch((error) => {
            alert("오류가 발생하였습니다.");
        });
    }, []);

    return (
        <Wrapper>
            {dirPaths ?
            <Directory dirPaths = {dirPaths} prePath = {dirPaths[0]} depth = {0}/> :
            null}
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