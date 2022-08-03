import React from 'react';
import { observer } from 'mobx-react-lite';
import styled from 'styled-components';
import TextInput from '../primitives/TextInput';
import Checkbox from '../primitives/Checkbox';
import settingsStore from '../store/settingsStore';
import { SettingsEnum } from './Slider';

const Settings = observer(() => {
  return (
    <>
      <StyledHeading>Tools</StyledHeading>
      <SettingsBox>
        {Object.values(SettingsEnum).map((value) => (
          <Checkbox
            checked={settingsStore[value]}
            key={value}
            onChange={() => settingsStore.toggleProp(value)}
          >
            {value}
          </Checkbox>
        ))}
        <TextInput
          value={settingsStore.delay}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            settingsStore.changeDelay(+e.target.value)
          }
        >
          Delay
        </TextInput>
      </SettingsBox>
    </>
  );
});

export { Settings };

const SettingsBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledHeading = styled.h2`
  text-align: center;
  margin-bottom: 30px;
`;
