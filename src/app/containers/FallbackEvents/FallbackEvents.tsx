import React, { FC, useEffect } from 'react';

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
import { observer } from 'mobx-react';


export const FallbackEvents: FC = observer(() => {
  const store = usePastEventStore();

  useEffect(() => {
    store.init();
  }, []);

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
          {store.data && !store.loading ? store.data.map(
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
            <SpinnerHandler>
              <LoadingSpinner />
            </SpinnerHandler>
          )}
        </>
      ) : (
        null
      )
    }
    </Container>
  )
});

export default FallbackEvents;