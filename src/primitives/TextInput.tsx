import styled from 'styled-components';
import { ITextInputProps } from '../components/Slider';

export default function TextInput({ value, onChange, children }: ITextInputProps) {
  return (
    <StyledLabel>
      {children}
      <input type="text" value={value} onChange={onChange} />
    </StyledLabel>
  );
}

const StyledLabel = styled.label`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  padding: 2px;
  border: 1px solid black;
  margin-right: 10px;
`;
