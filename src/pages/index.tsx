import React, { JSX } from 'react';
import Layout from '@theme/Layout';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

export default function Home(): JSX.Element {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout title="Available soon!" description="fuegocable - open source usb audio modding">
      <main style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '70vh',
        padding: '2rem',
        textAlign: 'center',
      }}>
        <img
          src="/img/presonus-fsp-modded-back.webp"
          alt="fuegocable modded presonus"
        />
        <h1 style={{fontSize: '3rem', marginBottom: '1rem', marginTop: '1rem'}}>
          Available soon!
        </h1>
        <p style={{fontSize: '1.5rem', color: '#666', maxWidth: '600px'}}>
          The fuegocable website is currently being built. Check back soon for documentation and resources about modding a Presonus Firestudio Project to work with USB audio.
        </p>
      </main>
    </Layout>
  );
}
