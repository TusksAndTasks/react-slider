import React, { useMemo } from 'react';
import { observer } from 'mobx-react-lite';
import styled from 'styled-components';
import TextInput from '../primitives/TextInput';
import Checkbox from '../primitives/Checkbox';
import settingsStore from '../store/settingsStore';
import { SettingsEnum } from './Slider';

const Settings = observer(() => {
  const checkboxes = useMemo(
    () =>
      Object.values(SettingsEnum).map((value) => (
        <Checkbox
          checked={settingsStore[value]}
          key={value}
          onChange={() => settingsStore.toggleProp(value)}
        >
          {value}
        </Checkbox>
      )),
    [Object.values(SettingsEnum).map((value) => settingsStore[value])]
  );

  return (
    <>
      <StyledHeading>Tools</StyledHeading>
      <SettingsBox>
        {checkboxes}
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
