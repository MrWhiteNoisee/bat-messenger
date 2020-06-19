import React from 'react';
import styled from 'styled-components';

export const InputLabelForm: React.FC<React.ComponentProps<'label'>> = (props) => (
  <InputLabelFormStyles.Label {...props} />
);

const InputLabelFormStyles = {
  Label: styled.label<React.ComponentProps<any>>`
    margin-left: 20px
  `
}