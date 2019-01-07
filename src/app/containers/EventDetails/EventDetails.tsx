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
import {
  DesktopMediaQuery,
  MobileMediaQuery,
  TabletMediaQuery
} from 'app/components/atoms/Responsive';

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
              {data.lineup && data.lineup.length > 0 && (
                <Section>
                  <H3>Lineup : </H3>
                  <Lineup>
                    {data.lineup.map((artist: string) => (
                      <LineupLine key={artist}>{artist}</LineupLine>
                    ))}
                  </Lineup>
                </Section>
              )}
            </ContentHandler>
            {data.location.position && (
              <MapboxHandler>
                <DesktopMediaQuery>
                  <Map
                    width="20vw"
                    height="50vh"
                    coordinates={data.coordinates}
                  />
                </DesktopMediaQuery>
                <TabletMediaQuery>
                  <Map
                    width="35vw"
                    height="50vh"
                    coordinates={data.coordinates}
                  />
                </TabletMediaQuery>
                <MobileMediaQuery>
                  <Map
                    width="100%"
                    height="25vh"
                    coordinates={data.coordinates}
                  />
                </MobileMediaQuery>
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
