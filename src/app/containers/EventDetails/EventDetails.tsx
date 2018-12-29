import * as React from 'react';
import { STORE_SELECTED_EVENT } from 'app/constants/stores';
import { EventModel } from 'app/models/EventModel';
import { withLoadingStore } from 'app/hoc/LoadingStore/WithLoadingStore';
import { SelectedEventStore } from 'app/stores/SelectedEventStore';

interface EventDetailsProps {
  data: EventModel;
  [STORE_SELECTED_EVENT]: SelectedEventStore;
}

export class EventDetailsComponent extends React.Component<EventDetailsProps> {
  constructor(props, context) {
    super(props, context);
  }
  render() {
    const { data } = this.props;
    return <div>{data && data.title}</div>;
  }
}

export const EventDetails = withLoadingStore(STORE_SELECTED_EVENT)(
  EventDetailsComponent
);
