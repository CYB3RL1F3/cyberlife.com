import React, { FC, useCallback, useMemo, MouseEvent } from 'react';
import { observer } from 'mobx-react';
import {
  NoGigsHandler,
  NoGigsText,
  NoGigsSmiley,
  PleaseContact,
  Link,
  Container,
  SpinnerHandler,
  LoadingSpinner,
  A
} from './FallbackEvents.styled';
import { PastEvents } from 'app/components/organisms/PastEvents';
import { usePastEventStore } from 'app/hooks/stores';

import { paths } from "app/paths";

export interface FallbackEventsProps {
  asFail?: boolean;
}

export const FallbackEvents: FC<FallbackEventsProps> = observer(({ asFail }) => {
  const store = usePastEventStore();
  const loadPastEvents = useCallback((e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    e.stopPropagation();
    store.init();
  }, [store.init]);

  const loadingSpinner = useMemo(() => {
    return store.loading ? (
      <SpinnerHandler>
        <LoadingSpinner />
      </SpinnerHandler>
    ) : null;
  }, [store.loading]);

  if (!store.data) {
    if (asFail) {
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
            <A href={paths.events} onClick={loadPastEvents}>
              See past gigs... {loadingSpinner}
            </A>
          </PleaseContact>
        </Container>
      );
    } else {
      return (
        <Container>
          <A href onClick={loadPastEvents}>
            See past gigs... {loadingSpinner}
          </A>
        </Container>
      );
    }
  } else {
    return <PastEvents asFail={asFail} />;
  }
});

export default FallbackEvents;