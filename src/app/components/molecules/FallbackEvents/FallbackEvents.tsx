import * as React from 'react';
import { inject, observer } from 'mobx-react';
import { STORE_PAST_EVENTS } from 'app/constants';
import {
  NoGigsHandler,
  NoGigsText,
  NoGigsSmiley,
  PleaseContact,
  Link,
  Container,
  A
} from './FallbackEvents.styled';
import { EventsStore } from 'app/stores';
import { PastEvents } from '../PastEvents';

export interface FallbackEventsProps {
  [STORE_PAST_EVENTS]?: EventsStore;
  asFail?: boolean;
}

export interface FallbackEventsState {}

@inject(STORE_PAST_EVENTS)
@observer
export class FallbackEvents extends React.Component<
  FallbackEventsProps,
  FallbackEventsState
> {
  loadPastEvents = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    e.stopPropagation();
    const store: EventsStore = this.props[STORE_PAST_EVENTS];
    store.init();
  };

  render() {
    const store: EventsStore = this.props[STORE_PAST_EVENTS];
    if (!store.data) {
      if (this.props.asFail) {
        return (
          <Container>
            <NoGigsHandler>
              <NoGigsText>No gigs to come...</NoGigsText>
              <NoGigsSmiley>:(</NoGigsSmiley>
            </NoGigsHandler>
            <PleaseContact>
              Contact / booking :{' '}
              <Link path="/contact">
                cyberlife.music<span>@</span>gmail.com
              </Link>
              <br />
              <A href="/events" onClick={this.loadPastEvents}>
                See past gigs...
              </A>
            </PleaseContact>
          </Container>
        );
      } else {
        return (
          <A href onClick={this.loadPastEvents}>
            See past gigs...
          </A>
        );
      }
    } else {
      return <PastEvents asFail={this.props.asFail} />;
    }
  }
}
