import React from 'react';
import { SliderInput } from './Slider.styled';

export interface SliderProps {
  min: number;
  max: number;
  value: number;
  step: number;
  id: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void | any;
}

export const Slider: React.StatelessComponent<SliderProps> = (props) => (
  <SliderInput type="range" {...props} />
);
