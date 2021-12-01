import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import Directory from "./Directory";

const Side = () => {
    const Wrapper = styled.div`
        display: inline-block;
        width: 20%;
        height: 100%;
        overflow: scroll;
    `

    const [resources, setResources] = useState();

    useEffect(() => {
        axios.get(`/api/getDirectories`)
        .then((response) => {
            const dirPathsArray = response.data;
            let dirPaths = [];

            let i = 0;

            while (i < dirPathsArray.length){
                let dirs = [];
                dirs.push(dirPathsArray[i]);

                let j = 1;
                for (let k = i + 1; k < dirPathsArray.length; k++){
                    if (dirPathsArray[k].startsWith(dirPathsArray[i])){
                        dirs.push(dirPathsArray[k]);
                        j++;
                    } else{
                        break;
                    }
                }

                dirPaths.push(dirs);
                i = i + j;
            }

            const dirs = dirPaths.map((dirPath) => (<Directory dirPaths = {dirPath} prePath = "" depth = {0}/>));
            setResources(dirs);
        }).catch((error) => {
            console.log(error);
        });
    }, []);

    return (
        <Wrapper>
            {resources}
        </Wrapper>
    );
}

export default Side;