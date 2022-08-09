import React from 'react';
import styled from 'styled-components';

export interface ICheckBoxProps {
  children?: React.ReactNode;
  checked: boolean;
  onChange: (value?: boolean) => void;
}

const getEventValue =
  (callback: (value?: boolean) => void) => (e: React.ChangeEvent<HTMLInputElement>) =>
    callback(e.target.checked);

function Checkbox({ checked, onChange, children }: ICheckBoxProps) {
  return (
    <StyledLabel>
      {children}
      <input type="checkbox" checked={checked} onChange={getEventValue(onChange)} />
    </StyledLabel>
  );
}

export default React.memo(Checkbox);

const StyledLabel = styled.label`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  padding: 2px;
  border: 1px solid black;
  margin-right: 10px;
`;
