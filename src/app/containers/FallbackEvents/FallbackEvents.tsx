import React, { FC, useMemo, useEffect } from 'react';

import {
  NoGigsHandler,
  NoGigsText,
  NoGigsSmiley,
  PleaseContact,
  Link,
  Container,
  SpinnerHandler,
  LoadingSpinner,
  SeePastLink
} from './FallbackEvents.styled';
import { usePastEventStore } from 'app/hooks/stores';

import { paths } from "app/paths";
import { EventModel } from 'app/models';
import { EventItem } from 'app/components';


export const FallbackEvents: FC = () => {
  const store = usePastEventStore();

  useEffect(() => {
    store.init();
  });

  const loadingSpinner = useMemo(() => {
    return store.loading ? (
      <SpinnerHandler>
        <LoadingSpinner />
      </SpinnerHandler>
    ) : null;
  }, [store.loading]);

  return (
    <Container>
      <NoGigsHandler>
        <NoGigsText>No gigs to come...</NoGigsText>
        <NoGigsSmiley>:(</NoGigsSmiley>
      </NoGigsHandler>
      <PleaseContact>
        Contact / booking :{' '}
        <Link path={paths.contact}>
          cyberlife.music<span>@</span>gmail.com
        </Link>
        <br />
      </PleaseContact>
      {store.loading || !!store.data ? (
        <>
          <SeePastLink>
            Some past gigs:
          </SeePastLink>
          {store.data ? store.data.map(
            (event: EventModel, index: number) => (
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
          ) : store.loading && (
            {loadingSpinner}
          )}
        </>
      ) : (
        null
      )
    }
    </Container>
  )
};

export default FallbackEvents;