import React, { FC, memo, ChangeEvent } from 'react';
import { SliderInput } from './Slider.styled';

export interface SliderProps {
  min: number;
  max: number;
  value: number;
  step: number;
  id: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void | any;
}

export const Slider: FC<SliderProps> = memo((props) => (
  <SliderInput type="range" {...props} />
));
