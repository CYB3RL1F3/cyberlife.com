import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { EventsStore } from 'app/stores';
import { STORE_FORTHCOMING_EVENTS } from 'app/constants';
import EventModel from 'app/models/EventModel';
import { EventItem } from 'app/components/molecules/EventItem';
import { Container } from './Events.styled';
import { withLoadingStore } from 'app/hoc/LoadingStore/WithLoadingStore';
import { FallbackEvents } from 'app/components/molecules/FallbackEvents';
console.log(FallbackEvents);

export interface EventsProps extends RouteComponentProps<any> {
  [STORE_FORTHCOMING_EVENTS]: EventsStore;
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

export const Events = withLoadingStore(STORE_FORTHCOMING_EVENTS)(
  EventsComponent
);
