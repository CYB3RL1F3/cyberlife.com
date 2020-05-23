import React, { FC } from 'react';
import { RouteComponentProps } from 'react-router';
import { Stores } from 'app/constants';
import EventModel from 'app/models/EventModel';
import { EventItem } from 'app/components/molecules/EventItem';
import { Container } from './Events.styled';
import { withLoadingStore } from 'app/hoc/LoadingStore/WithLoadingStore';
import { FallbackEvents } from 'app/containers/FallbackEvents';

export interface EventsProps extends RouteComponentProps<any> {
  data: EventModel[];
}

export const EventsComponent: FC<EventsProps> = ({ data }) => {
  if (data && data.length > 0) {
    return (
      <Container>
        {data.map(
          (event: EventModel, index: number): JSX.Element => (
            <EventItem
              index={index}
              key={event.id}
              id={event.id}
              title={event.title}
              location={event.address}
              type={event.type}
              date={event.formattedDate}
            />
          )
        )}
        <FallbackEvents />
      </Container>
    );
  } else {
    return <FallbackEvents asFail />;
  }
}

export const Events = withLoadingStore(Stores.forthcoming_events)(
  EventsComponent
);
