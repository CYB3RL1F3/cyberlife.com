import * as React from 'react';
import { EventLink, Paragraph, Link, Container } from './EventItem.styled';
import { getEventLink } from 'app/utils/event';

interface EventProp {
  id: number;
  date: string;
  title: string;
  location: string;
  index: number;
  type: number;
}

export const EventItem: React.StatelessComponent<EventProp> = (
  event: EventProp
) => {
  const link = getEventLink(event);
  return (
    <Container index={event.index}>
      <Link path={link}>{event.date}</Link>
      <EventLink path={link}>{event.title}</EventLink>
      <Paragraph>{event.location}</Paragraph>
    </Container>
  );
};
