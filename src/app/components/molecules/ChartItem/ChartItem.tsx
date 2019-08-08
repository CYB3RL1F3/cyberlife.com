import * as React from 'react';
import { Paragraph, Container, Link } from './ChartItem.styled';

interface ChartProp {
  title: string;
  label: string;
  index: number;
  link: string;
}

export const ChartItem: React.StatelessComponent<ChartProp> = (
  chart: ChartProp
) => (
  <Container index={chart.index}>
    <Paragraph>
      <Link target="_blank" href={chart.link}>
        {chart.title}
      </Link>
    </Paragraph>
    <Paragraph>{chart.label}</Paragraph>
  </Container>
);
