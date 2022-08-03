import styled from 'styled-components';
import { ICheckBoxProps } from '../components/Slider';

export default function Checkbox({ checked, onChange, children }: ICheckBoxProps) {
  return (
    <StyledLabel>
      {children}
      <input type="checkbox" checked={checked} onChange={onChange} />
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
