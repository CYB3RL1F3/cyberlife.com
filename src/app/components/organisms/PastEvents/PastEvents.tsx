import React, { FC, useMemo, useCallback, memo } from 'react';
import {
  Stores
} from 'app/constants/stores';
import EventModel from 'app/models/EventModel';
import { EventsStore } from 'app/stores';
import { Container, NoPast, Link, BackLinkHandler } from './PastEvents.styled';
import { EventItem } from 'app/components/molecules/EventItem';
import { withLoadingStore } from 'app/hoc/LoadingStore/WithLoadingStore';
import { usePastEventStore, useForthcomingEventStore } from 'app/hooks/stores';

export interface PastEventsProps {
  data: EventModel[];
  asFail?: boolean;
}

const PastEventsComponent: FC<PastEventsProps> = memo(({ data, asFail }) => {
  const currentStore: EventsStore = usePastEventStore();
  const store: EventsStore = useForthcomingEventStore();
    
  const goBack = useCallback(() => {
    currentStore.reset();
    store.loadEvents();
  }, [currentStore, store]);
  const backLink = useMemo(() => {
    return (
      <BackLinkHandler>
        <Link onClick={goBack}>return to new gigs</Link>
      </BackLinkHandler>
    );
  }, [goBack]);
  if (!data) {
    return (
      <Container asFail={asFail}>
        <NoPast>None past gig to show...</NoPast>
        <br />
        {backLink}
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
        {backLink}
      </Container>
    );
  }
});

export const PastEvents = withLoadingStore(Stores.past_events)(
  PastEventsComponent
);
