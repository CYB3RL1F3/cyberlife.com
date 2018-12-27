import * as React from 'react';
import { Paragraph, Container } from './ChartItem.styled';

interface ChartProp {
  title: string;
  label: string;
}

export const ChartItem: React.StatelessComponent<ChartProp> = (
  chart: ChartProp
) => (
  <Container>
    <Paragraph>{chart.title}</Paragraph>
    <Paragraph>{chart.label}</Paragraph>
  </Container>
);
