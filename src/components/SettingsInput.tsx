import { ISettingInputProps } from '../types/interfaces';
import styled from 'styled-components';

const StyledLabel = styled.label`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  padding: 2px;
  border: 1px solid black;
  margin-right: 10px;
`;

export default function SettingsInput({
  actionType,
  settingDispatch,
  settingState,
}: ISettingInputProps) {
  if (typeof settingState[actionType] === 'boolean') {
    return (
      <StyledLabel>
        <input
          type="checkbox"
          checked={settingState[actionType] as boolean}
          onChange={(e) => settingDispatch(actionType, (e.target as HTMLInputElement).checked)}
        />
        {actionType}
      </StyledLabel>
    );
  } else {
    return (
      <StyledLabel>
        <input
          type="text"
          value={settingState[actionType] as number}
          onChange={(e) => settingDispatch(actionType, true, +(e.target as HTMLInputElement).value)}
        />
        {actionType}
      </StyledLabel>
    );
  }
}
