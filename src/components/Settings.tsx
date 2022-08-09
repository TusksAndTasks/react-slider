import React from 'react';
import { observer } from 'mobx-react-lite';
import styled from 'styled-components';

import Checkbox from 'primitives/Checkbox';
import Typography, { TypographyMode } from 'primitives/Typography';
import NumericalRange from 'primitives/NumericalRange';

import sliderSettingsModel from 'store/SliderSettingsModel';
import { colors } from 'Theme/colors';

function Settings() {
  return (
    <>
      <StyledHeading as="h2" mode={TypographyMode.HEADING} color={colors.BLUE}>
        Tools
      </StyledHeading>
      <SettingsBox>
        {Object.entries(sliderSettingsModel).map(([key, value]) => {
          return typeof value === 'boolean' ? (
            <Checkbox
              checked={value}
              key={key}
              onChange={sliderSettingsModel.setFieldValueFabric(key as any)}
            >
              {key}
            </Checkbox>
          ) : (
            <NumericalRange
              value={value}
              key={key}
              onChange={sliderSettingsModel.setFieldValueFabric(key as any)}
            >
              {key}
            </NumericalRange>
          );
        })}
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
