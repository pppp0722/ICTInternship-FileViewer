import React, {useState} from 'react';
import styled from 'styled-components';

import Login from './Login';

const App = () => {
  const Wrapper = styled.div`
    text-align: center;
  `;

  return (
    <Wrapper>
      <Login/>
    </Wrapper>
  );
}

export default App;
