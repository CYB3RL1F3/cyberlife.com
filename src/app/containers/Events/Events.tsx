import React, { FC, useCallback, useMemo, MouseEvent } from 'react';
import { RouteComponentProps } from 'react-router';
import { Stores } from 'app/constants';
import EventModel from 'app/models/EventModel';
import { EventItem } from 'app/components/molecules/EventItem';
import { Container, SpinnerHandler, LoadingSpinner, A } from './Events.styled';
import { withLoadingStore } from 'app/hoc/LoadingStore/WithLoadingStore';
import FallbackEvents from 'app/containers/FallbackEvents';
import { usePastEventStore } from 'app/hooks/stores';
import { paths } from "app/paths";
import { observer } from 'mobx-react';
export interface EventsProps extends RouteComponentProps<any> {
  data: EventModel[];
  loading: boolean;
  error: string;
}

export const EventsComponent: FC<EventsProps> = observer(({ data, loading, error }) => {
  const pastEventStore = usePastEventStore();
  const loadPastEvents = useCallback((e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    e.stopPropagation();
    pastEventStore.init();
  }, [pastEventStore.init]);

  const loadingSpinner = useMemo(() => {
    return pastEventStore.loading ? (
      <SpinnerHandler>
        <LoadingSpinner />
      </SpinnerHandler>
    ) : null;
  }, [pastEventStore.loading]);
  if (!!data && data.length > 0 && !loading && !error) {
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
        {(!pastEventStore.data || pastEventStore.loading) && (
          <A href={paths.events} onClick={loadPastEvents}>
            See past gigs... {loadingSpinner}
          </A>
        )}
        {pastEventStore.data && pastEventStore.data.map(
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
  } else {
    return <FallbackEvents />;
  }
});

export const Events = withLoadingStore(Stores.forthcoming_events)(
  EventsComponent
);

export default Events;