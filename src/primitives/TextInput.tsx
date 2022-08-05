import React from 'react';
import styled from 'styled-components';

interface ITextInputProps {
  children?: React.ReactNode;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function TextInput({ value, onChange, children }: ITextInputProps) {
  return (
    <StyledLabel>
      {children}
      <input type="text" value={value} onChange={onChange} />
    </StyledLabel>
  );
}

export default React.memo(TextInput);

const StyledLabel = styled.label`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  padding: 2px;
  border: 1px solid black;
  margin-right: 10px;
`;
