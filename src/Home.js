import React from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router';

const Home = () => {
    const Wrapper = styled.div`
    `

    const Button = styled.button`
        width: 200px;
        height: 50px;
        font-size: 30px;
    `

    const history = useHistory();

    const logout = () => {
        sessionStorage.removeItem("isAuthorized");
        history.push("/");
    };

    return(
        <Wrapper>
            <Button onClick = {logout}>Logout</Button>
            {sessionStorage.getItem("isAuthorized")}
        </Wrapper>
    );
}

export default Home;