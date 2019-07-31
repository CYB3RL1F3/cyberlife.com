import * as React from 'react';
import {
  STORE_PAST_EVENTS,
  STORE_FORTHCOMING_EVENTS
} from 'app/constants/stores';
import EventModel from 'app/models/EventModel';
import { EventsStore } from 'app/stores';
import { Container, NoPast, Link, BackLinkHandler } from './PastEvents.styled';
import { EventItem } from 'app/components/molecules/EventItem';
import { withLoadingStore } from 'app/hoc/LoadingStore/WithLoadingStore';
import { inject } from 'mobx-react';

export interface PastEventsProps {
  [STORE_PAST_EVENTS]: EventsStore;
  data: EventModel[];
  asFail?: boolean;
}

@inject(STORE_FORTHCOMING_EVENTS)
class PastEventsComponent extends React.Component<PastEventsProps> {
  renderBackLink = () => {
    return (
      <BackLinkHandler>
        <Link onClick={this.goBack}>return to new gigs</Link>
      </BackLinkHandler>
    );
  };

  goBack = () => {
    const currentStore: EventsStore = this.props[STORE_PAST_EVENTS];
    const store: EventsStore = this.props[STORE_FORTHCOMING_EVENTS];
    currentStore.reset();
    store.loadEvents();
  };

  render() {
    const { data, asFail } = this.props;
    if (!data) {
      return (
        <Container asFail={asFail}>
          <NoPast>None past gig to show...</NoPast>
          <br />
          {this.renderBackLink()}
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
          {this.renderBackLink()}
        </Container>
      );
    }
  }
}

export const PastEvents = withLoadingStore(STORE_PAST_EVENTS)(
  PastEventsComponent
);
