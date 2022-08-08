import React from 'react';
import { observer } from 'mobx-react-lite';
import styled from 'styled-components';

import TextInput from '../primitives/TextInput';
import Checkbox from '../primitives/Checkbox';
import Typography from '../primitives/Typography'; // FIXME отступ
import settingsStore from '../store/settingsStore';
import { colors } from '../Theme/colors';
import { TextModeEnum } from '../primitives/Typography'; // FIXME выше под примитивы
import { SettingsEnum, TextInputEnum } from '../store/settingsStore'; // FIXME уже есть импорт из ../store/settingsStore'

function Settings() {
  return (
    <>
      <StyledHeading as="h2" mode={TextModeEnum.HEADING} color={colors.BLUE}>
        Tools
      </StyledHeading>
      <SettingsBox>
        {Object.values(SettingsEnum).map((value) => (
          <Checkbox
            checked={settingsStore[value]}
            key={value}
            onChange={settingsStore.toggleCheckboxes(value)}
          >
            {value}
          </Checkbox>
        ))}
        {Object.values(TextInputEnum).map((value) => (
          <TextInput
            value={settingsStore[value]}
            key={value}
            onChange={settingsStore.changeTextInput(value)}
          >
            {value}
          </TextInput>
        ))}
      </SettingsBox>
    </>
  );
}

export default React.memo(observer(Settings));

const SettingsBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledHeading = styled(Typography)`
  text-align: center;
  margin-bottom: 30px;
`;
