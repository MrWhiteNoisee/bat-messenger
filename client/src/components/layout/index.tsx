import React from 'react';
import styled from 'styled-components';

export const Layout: React.FC = (props) => (
  <LayoutStyles.Container>
    {props.children}
  </LayoutStyles.Container>
);

const LayoutStyles = {
  Container: styled.div`
    width: 100%;
    height: 100%;
    background-color: #F5F5F5;
  `
}