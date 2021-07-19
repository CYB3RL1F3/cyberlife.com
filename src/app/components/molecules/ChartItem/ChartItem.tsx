import React, { FC } from 'react';
import { Paragraph, Container, Link } from './ChartItem.styled';

interface ChartProp {
  title: string;
  label: string;
  index: number;
  link: string;
}

export const ChartItem: FC<ChartProp> = (chart: ChartProp) => (
  <Container index={chart.index}>
    <Paragraph>
      <Link target="_blank" rel="external nofollow" href={chart.link}>
        {chart.title}
      </Link>
    </Paragraph>
    <Paragraph>{chart.label}</Paragraph>
  </Container>
);
