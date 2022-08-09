import React from 'react';
import styled from 'styled-components';

interface ITextInputProps {
  children?: React.ReactNode;
  value: string | number;
  onChange: (value?: number) => void;
}

const getEventValue =
  (callback: (value?: number) => void) => (e: React.ChangeEvent<HTMLInputElement>) =>
    callback(+e.target.value);

function NumericalRange({ value, children, onChange }: ITextInputProps) {
  return (
    <StyledLabel>
      {children}
      <input
        type="range"
        min="1"
        max="20"
        step="1"
        value={value}
        onChange={getEventValue(onChange)}
      />
    </StyledLabel>
  );
}

export default React.memo(NumericalRange);

const StyledLabel = styled.label`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  padding: 2px;
  border: 1px solid black;
  margin-right: 10px;
`;
