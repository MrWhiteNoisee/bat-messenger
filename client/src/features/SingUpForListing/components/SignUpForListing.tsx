import React from 'react';
import SignUpForm from './SignUpForm';
import styled from 'styled-components';

const SignUpForListing: React.FC = () => {
  return (
    <SignUpFormContainer>
      <SignUpForm />
    </SignUpFormContainer>
  )
}

export default SignUpForListing;

const SignUpFormContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;