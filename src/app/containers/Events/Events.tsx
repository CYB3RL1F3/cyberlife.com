import * as React from 'react';
import { inject, observer } from 'mobx-react';
import { RouteComponentProps } from 'react-router';
import { EventsStore } from 'app/stores';
import { STORE_ROUTER, STORE_PAST_EVENTS } from 'app/constants';
import EventModel from 'app/models/EventModel';

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
    const eventsStore = this.props[STORE_PAST_EVENTS] as EventsStore;
    eventsStore.loadEvents();
  }

  render() {
    const eventsStore = this.props[STORE_PAST_EVENTS] as EventsStore;
    const { events } = eventsStore;
    console.log(eventsStore);
    if (events) {
      return (
        <div>
          {events.map(
            (event: EventModel): JSX.Element => (
              <div key={event.id}>{event.title}</div>
            )
          )}
        </div>
      );
    } else {
      return <div>LOADINGUE</div>;
    }
  }
}
