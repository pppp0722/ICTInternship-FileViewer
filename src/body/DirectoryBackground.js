import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";

const DirectoryBackground = (props) => {
    const dirStore = useSelector(state => state.dirReducer);
    console.log(dirStore);
    const Wrapper = styled.div`
        display: inline-block;
        width: 231px;
        height: 20px;
        background-color: ${props.dirPath === dirStore ? "#50BCDF" : "#FFF"};

        &:hover{
            background-color: ${props.dirPath === dirStore ? "#50BCDF" : "#D2F3F8"};
        }
    `

    return (
        <Wrapper>
        </Wrapper>
    );
}

export default DirectoryBackground;