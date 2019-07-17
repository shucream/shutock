import React from 'react';
import styled from 'styled-components';

interface Props {

}

const HomeScreen: React.FC<Props> = () => {
  return (
    <Background>
      <p>home</p>
    </Background>
  )
};

const Background = styled.div`
  width: 100%;
  height: 100px;
`;

export default HomeScreen;
