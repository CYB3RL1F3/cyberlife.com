import * as React from 'react';
import { inject, observer } from 'mobx-react';
import { RouteComponentProps } from 'react-router';
import { EventsStore } from 'app/stores';
import { STORE_ROUTER, STORE_PAST_EVENTS } from 'app/constants';
import EventModel from 'app/models/EventModel';
import { EventItem } from 'app/components/molecules/EventItem';
import { Container } from './Events.styled';

export interface EventsProps extends RouteComponentProps<any> {
  /** MobX Stores will be injected via @inject() **/
  // [STORE_ROUTER]: RouterStore;
  // [STORE_PAST_EVENTS]: EventsStore;
}

export interface EventsState {}

@inject(STORE_PAST_EVENTS, STORE_ROUTER)
@observer
export class Events extends React.Component<EventsProps, EventsState> {
  constructor(props: EventsProps, context: any) {
    super(props, context);
    this.init();
  }

  init() {
    const eventsStore: EventsStore = this.props[
      STORE_PAST_EVENTS
    ] as EventsStore;
    eventsStore.loadEvents();
  }

  render() {
    const eventsStore = this.props[STORE_PAST_EVENTS] as EventsStore;
    const { data } = eventsStore;
    console.log(eventsStore);
    if (data) {
      return (
        <Container>
          {data.map(
            (event: EventModel): JSX.Element => (
              <EventItem
                id={event.id}
                title={event.title}
                location={event.address}
                date={event.formattedDate}
              />
            )
          )}
        </Container>
      );
    } else {
      return <div>LOADINGUE</div>;
    }
  }
}
