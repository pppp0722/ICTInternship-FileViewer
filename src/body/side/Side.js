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