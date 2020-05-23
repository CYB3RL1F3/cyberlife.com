import React from 'react';
import { RouteComponentProps } from 'react-router';
import { EventsStore } from 'app/stores';
import { Stores } from 'app/constants';
import EventModel from 'app/models/EventModel';
import { EventItem } from 'app/components/molecules/EventItem';
import { Container } from './Events.styled';
import { withLoadingStore } from 'app/hoc/LoadingStore/WithLoadingStore';
import { FallbackEvents } from 'app/containers/FallbackEvents';

export interface EventsProps extends RouteComponentProps<any> {
  [Stores.forthcoming_events]: EventsStore;
  data: EventModel[];
}

export interface EventsState {
  pastEventsLoaded: boolean;
}
export class EventsComponent extends React.Component<EventsProps, EventsState> {
  constructor(props: EventsProps, context: any) {
    super(props, context);
  }

  render() {
    const { data } = this.props;
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
}

export const Events = withLoadingStore(Stores.forthcoming_events)(
  EventsComponent
);
