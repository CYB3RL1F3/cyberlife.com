import React, { FC, useMemo } from "react";
import { withLoadingStore } from "app/hoc";
import { Stores } from "app/constants";
import { PostModel } from 'app/models/PostModel';
import { Container, HtmlBlock, PictureHandler, Picture } from "./About.styled";
import { parseHtml } from "app/utils/html";

interface AboutComponentProps {
  data: PostModel;
}

const AboutComponent: FC<AboutComponentProps> = ({ data }) => {
  const about = useMemo(() => data && parseHtml(data.content), [data]);
  if (!data) return <p>Article not available right now </p>
  return (
    <Container>
      <HtmlBlock children={about} />
      <PictureHandler picture={data.illustration}>
        <Picture src={data.illustration} alt={data.subtitle} />
      </PictureHandler>
    </Container>
  );
}

export const About = withLoadingStore(Stores.about)(AboutComponent);

export default About;