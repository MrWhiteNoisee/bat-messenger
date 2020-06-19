import React from 'react';
import styled from 'styled-components';

/********************************************** Forms **********************************************/
export const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

/********************************************** Inputs *********************************************/
export const InputFormText = React.forwardRef<
  HTMLInputElement,
  React.ComponentProps<'input'>
>((props, ref) => (
  <InputFormTextStyles.Input {...props} ref={ref} />
));

const InputFormTextStyles = {
  Input: styled.input<any>`
    border: 2px solid #000;
    border-radius: 20px;
    height: 30px;
    width: 100%;
    padding-left: 20px;
    padding-right: 20px;
    font-size: 1.2rem;
  `
};