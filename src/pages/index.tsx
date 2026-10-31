import React, { JSX } from 'react';
import {Redirect} from '@docusaurus/router';
import {PageMetadata} from '@docusaurus/theme-common';

export default function Home(): JSX.Element {
  return (
    <>
      <PageMetadata
        title="What is fuegocable?"
        description={"fuegocable is an open source project for everyone interested in giving new life to Firewire audio interfaces."}
        image="/assets/audio-devices/presonus/firestudio-project/presonus-fsp-modded-back.webp"
      />
      <Redirect to="/docs/what-is-fuegocable" />
    </>
  );
}
