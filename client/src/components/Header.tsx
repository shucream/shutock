import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

interface Props {

}

const Header: React.FC<Props> = () => {
  return (
    <Background>
      <Link to={'/'}>home</Link>
      <Link to={'/products/1'}>productdetail</Link>
      <Link to={'/products/new'}>new product</Link>
      <Link to={'/'}>home</Link>
      <Link to={'/'}>home</Link>
    </Background>
  )
};

const Background = styled.div`
  width: 100%;
  height: 100px;
  background-color: #ddd;
`;

export default Header
