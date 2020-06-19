import React from 'react';
import styled from 'styled-components';

// Shared components
import { InputLabelForm } from '../../../components/text';
import { Form ,InputFormText } from '../../../components/inputs';
import { Button } from '../../../components/buttons';
import { on } from 'cluster';

interface ServerResponse {
  msg: string;
  numberOfWatchers: number;
  endingDate: string;
}

const SignUpForm: React.FC = () => {
  const [submitDisabled, setSubmitDisabled] = React.useState(true);
  const [serverResMsg, setServerResMsg] = React.useState<ServerResponse>();
  const batUrlInputRef = React.useRef<HTMLInputElement>(null);
  const pushoverInputKeyRef = React.useRef<HTMLInputElement>(null);

  const submitHandler = async (event: React.FormEvent) => {
    event.preventDefault();

    const payload = {
      url: batUrlInputRef.current!.value,
      pushoverToken: pushoverInputKeyRef.current!.value
    };

  let response = await fetch('http://localhost:3000/api/add-listing', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  })

  const content = await response.json();
  batUrlInputRef.current!.value = '';
  onInputChange();

  setServerResMsg(content);

  setTimeout(() => {
    setServerResMsg({
      msg: '',
      numberOfWatchers: 0,
      endingDate: ''
    });
  }, 3000);
}

  const onInputChange = () => {
    let state =
      batUrlInputRef.current!.value === '' ||
      pushoverInputKeyRef.current!.value === '';
    setSubmitDisabled(state);
  }

  return (
    <FormCard>
      <Form onSubmit={submitHandler}>
        <InputContainer>
          <InputLabelForm htmlFor="bat-url">BaT URL</InputLabelForm>
          <InputFormText
            id="bat-url"
            placeholder="https://bringatrailer.com/listing/e30-m3-evo"
            type="url"
            ref={batUrlInputRef}
            onChange={onInputChange}
          />
        </InputContainer>
        <div style={{ height: '15px' }} />
        <InputContainer>
          <InputLabelForm htmlFor="pushover-token">Pushover User Key</InputLabelForm>
          <InputFormText
            id="pushover-token"
            placeholder="ajkhgfdag4sdfg556g4sadfgasdg"
            type="text"
            ref={pushoverInputKeyRef}
            onChange={onInputChange}
          />
        </InputContainer>
        <div style={{ height: '30px' }} />
        <Button disabled={submitDisabled} type="submit">Submit</Button>
      </Form>
      {serverResMsg && serverResMsg.msg && <div>{serverResMsg.msg}</div>}
    </FormCard>
  );
}

export default SignUpForm;

// Local Stylings Only
const FormCard = styled.div`
  max-width: 500px;
  width: 100%;
  max-height: 500px;
  height: 100%;
  padding: 20px;
`
const InputContainer = styled.div`
  width: 100%;
`;