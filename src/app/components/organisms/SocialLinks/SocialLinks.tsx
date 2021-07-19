import InfosModel from 'app/models/InfosModel';
import React, { FC, lazy, Suspense } from 'react';
import { A } from './SocialLinks.styled';

const Icon = lazy(() => import('app/components/atoms/Icon'));

export interface SocialLinksProps {
  data: InfosModel;
}

export const SocialLinks: FC<SocialLinksProps> = ({ data }) => (
  <Suspense fallback={<div />}>
    <A
      title="Facebook"
      href={data.facebook}
      target="_blank"
      rel="external nofollow"
    >
      <Icon size={25} name="socials/facebook" />
    </A>
    <A
      title="Twitter"
      href={data.twitter}
      target="_blank"
      rel="external nofollow"
    >
      <Icon size={25} name="socials/twitter" />
    </A>
    <A
      title="Soundcloud"
      href={data.soundcloud}
      target="_blank"
      rel="external nofollow"
    >
      <Icon size={25} name="socials/soundcloud" />
    </A>
    <A
      title="Discogs"
      href={data.discogs}
      target="_blank"
      rel="external nofollow"
    >
      <Icon size={25} name="socials/discogs" />
    </A>
    <A
      title="Resident Advisor"
      href={data.RA}
      target="_blank"
      rel="external nofollow"
    >
      <Icon size={25} name="socials/resident-advisor" />
    </A>
  </Suspense>
);
