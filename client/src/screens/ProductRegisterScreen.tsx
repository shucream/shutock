import React from 'react';
import styled from 'styled-components';

interface Props {

}

const ProductRegisterScreen: React.FC<Props> = () => {
  return (
    <Background>
      <p>product new</p>
    </Background>
  )
};

const Background = styled.div`
  width: 100%;
  height: 100px;
`;

export default ProductRegisterScreen;
