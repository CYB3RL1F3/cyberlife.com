import React, { FC, lazy, Suspense } from 'react';
import { Stores } from 'app/constants/stores';
import { EventModel } from 'app/models/EventModel';
import { withLoadingStore } from 'app/hoc/LoadingStore/WithLoadingStore';
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
  MapboxHandler,
  GoBack,
  InfoLink,
  Flyer,
  Unavailable,
  PicHandler
} from './EventDetails.styled';
import {
  DesktopMediaQuery,
  MobileMediaQuery,
  TabletMediaQuery
} from 'app/components/atoms/Responsive';
import { paths } from "app/paths";
import Heads from 'app/components/atoms/Heads';

const Map = lazy(() => import('app/components/atoms/Map'));

interface EventDetailsProps {
  data: EventModel;
}

export const EventDetailsComponent: FC<EventDetailsProps> = ({ data }) => {
  if (data) {
    return (
      <Container>
        <Heads title={`Cyberlife @${data.title} - ${data.date}`} image={data.flyer.front} description={`@${data.location.address} on ${data.date}`} />
        <TitleHandler>
          <Title>{data.title}</Title>
          <GoBack path={paths.events}>&lt; Back</GoBack>
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
            {data.flyer.front && (
              <Section>
                <PicHandler picture={data.flyer.front}>
                  <Flyer src={data.flyer.front} alt={data.title} />
                </PicHandler>

              </Section>
            )}
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
            {data.cost && (
              <Section>
                <Info children={data.cost} />
              </Section>
            )}
            <Section>
              <Info>
                <InfoLink target="_blank" href={data.links.event}>
                  More infos
                </InfoLink>
                {' - '}
                <InfoLink target="_blank" href={data.links.venue}>
                  Promoter
                </InfoLink>
              </Info>
            </Section>
          </ContentHandler>
          {data.location.position && (
            <Suspense fallback={<MapboxHandler />}>
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
            </Suspense>
          )}
        </Content>
      </Container>
    );
  } else {
    return (
      <Container>
        <Unavailable>This event doesn't exists or can't be loaded properly...</Unavailable>
      </Container>
    )
  }
}

export const EventDetails = withLoadingStore(Stores.selected_event)(
  EventDetailsComponent
);

export default EventDetails;