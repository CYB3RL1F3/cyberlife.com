import * as React from 'react';
import { STORE_SELECTED_EVENT } from 'app/constants/stores';
import { EventModel } from 'app/models/EventModel';
import { withLoadingStore } from 'app/hoc/LoadingStore/WithLoadingStore';
import { Map } from 'app/components/atoms/Map';
import { SelectedEventStore } from 'app/stores/SelectedEventStore';

import {
  Container,
  TitleHandler,
  Title,
  Content,
  ContentHandler,
  Info,
  Lineup,
  LineupLine,
  Section,
  H3,
  MapboxHandler
} from './EventDetails.styled';

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
    if (data) {
      return (
        <Container>
          <TitleHandler>
            <Title>{data.title}</Title>
          </TitleHandler>
          <Content>
            <ContentHandler>
              <Section>
                <Info>{data.formattedDate}</Info>
                <Info>
                  {data.time.begin} {data.time.end ? `- ${data.time.end}` : ''}
                </Info>
              </Section>
              <Section>
                <Info>{data.address}</Info>
                <Info>
                  {data.area}, {data.country}
                </Info>
              </Section>
              <Section>
                <H3>Lineup : </H3>
                <Lineup>
                  {data.lineup.map((artist: string) => (
                    <LineupLine>{artist}</LineupLine>
                  ))}
                </Lineup>
              </Section>
            </ContentHandler>
            {data.location.position && (
              <MapboxHandler>
                <Map coordinates={data.coordinates} />
              </MapboxHandler>
            )}
          </Content>
        </Container>
      );
    } else return <div />;
  }
}

export const EventDetails = withLoadingStore(STORE_SELECTED_EVENT)(
  EventDetailsComponent
);
