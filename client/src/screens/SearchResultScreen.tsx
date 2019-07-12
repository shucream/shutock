import React from 'react';
import styled from 'styled-components';

interface Props {

}

const SearchResultScreen: React.FC<Props> = () => {
  return (
    <Background>
      <p>search result</p>
    </Background>
  )
};

const Background = styled.div`
  width: 100%;
  height: 100px;
`;

export default SearchResultScreen;
