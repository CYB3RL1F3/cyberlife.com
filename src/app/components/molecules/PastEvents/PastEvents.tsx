import * as React from 'react';
import { STORE_PAST_EVENTS } from 'app/constants/stores';
import EventModel from 'app/models/EventModel';
import { EventsStore } from 'app/stores';
import { Container, NoPast } from './PastEvents.styled';
import { EventItem } from '../EventItem';
import { withLoadingStore } from 'app/hoc/LoadingStore/WithLoadingStore';

export interface PastEventsProps {
  [STORE_PAST_EVENTS]: EventsStore;
  data: EventModel[];
  asFail?: boolean;
}

class PastEventsComponent extends React.Component<PastEventsProps> {
  render() {
    const { data, asFail } = this.props;
    if (!data) {
      return (
        <Container asFail={asFail}>
          <NoPast>None past gig to show...</NoPast>
        </Container>
      );
    } else {
      return (
        <Container asFail={asFail}>
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
        </Container>
      );
    }
  }
}

export const PastEvents = withLoadingStore(STORE_PAST_EVENTS)(
  PastEventsComponent
);
