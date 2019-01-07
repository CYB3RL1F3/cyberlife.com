import styled from 'app/theme';

export const SliderInput = styled.input`
  -webkit-appearance: none;
  width: 100%;
  background: transparent;

  /* Special styling for WebKit/Blink */
  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    border: 1px solid ${({ theme }) => theme.slider.thumbBorder};
    height: 1.2rem;
    width: 0.5rem;
    border-radius: 3px;
    background: ${({ theme }) => theme.slider.thumbColor};
    cursor: pointer;
    margin-top: -0.4rem; /* You need to specify a margin in Chrome, but in Firefox and IE it is automatic */
    box-shadow: 1px 1px 1px ${({ theme }) => theme.slider.thumbBorder},
      0px 0px 1px ${({ theme }) => theme.slider.thumbShadow}; /* Add cool effects to your sliders! */
  }

  /* All the same stuff for Firefox */
  &::-moz-range-thumb {
    border: 1px solid ${({ theme }) => theme.slider.thumbBorder};
    height: 1.2rem;
    width: 0.5rem;
    border-radius: 3px;
    background: ${({ theme }) => theme.slider.thumbColor};
    cursor: pointer;
    margin-top: -0.4rem; /* You need to specify a margin in Chrome, but in Firefox and IE it is automatic */
    box-shadow: 1px 1px 1px ${({ theme }) => theme.slider.thumbBorder},
      0px 0px 1px ${({ theme }) => theme.slider.thumbShadow}; /* Add cool effects to your sliders! */
  }

  &:focus {
    outline: none; /* Removes the blue border. You should probably do some kind of focus styling for accessibility reasons though. */
  }

  &::-webkit-slider-runnable-track {
    width: 100%;
    height: 0.4rem;
    cursor: pointer;
    box-shadow: 1px 1px 1px ${({ theme }) => theme.slider.thumbBorder},
      0px 0px 1px ${({ theme }) => theme.slider.thumbShadow};
    background: ${({ theme }) => theme.slider.color};
    border-radius: 1.3px;
    border: 0.2px solid #010101;
  }

  &:focus::-webkit-slider-runnable-track {
    background: ${({ theme }) => theme.slider.focus};
  }

  &::-moz-range-track {
    width: 100%;
    height: 0.4rem;
    cursor: pointer;
    box-shadow: 1px 1px 1px ${({ theme }) => theme.slider.thumbBorder},
      0px 0px 1px ${({ theme }) => theme.slider.thumbShadow};
    background: ${({ theme }) => theme.slider.color};
    border-radius: 1px;
    border: 0.2px solid #010101;
  }

  &::-moz-focus-outer {
    border: 0;
  }
`;
