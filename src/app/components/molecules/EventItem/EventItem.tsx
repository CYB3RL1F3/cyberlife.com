import * as React from 'react';
import { Paragraph, Link, Container } from './EventItem.styled';

interface EventProp {
  id: number;
  date: string;
  title: string;
  location: string;
}

export const EventItem: React.StatelessComponent<EventProp> = (
  event: EventProp
) => (
  <Container>
    <Link path={`/events/${event.id}`}>{event.date}</Link>
    <Link path={`/events/${event.id}`}>{event.title}</Link>
    <Paragraph>{event.location}</Paragraph>
  </Container>
);
