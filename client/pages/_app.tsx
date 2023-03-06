import React from 'react';
import { AppProps } from 'next/app';
import { useState } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';

import '../styles/styles.scss';
import '../styles/menu.scss';

import '../styles/index.scss';
import '../styles/about.scss';
import '../styles/chat.scss';

import Head from 'next/head';

import setting from '../setting';
import { DataContext } from '../src/DataContext';
import SharedData from '../src/SharedData';

const key_prefixes = [
  'beautiful',
  'cute',
  'lovely',
];
const key_contents = [
  'dolphin',
  'cat',
  'dog',
  'bird',
  'fish',
];
const key = `${key_prefixes[Math.floor(Math.random() * key_prefixes.length)]} ${key_contents[Math.floor(Math.random() * key_contents.length)]}`;

export default function MyApp({ Component, pageProps }: AppProps) {

  const [sharedData, setSharedData] = useState<SharedData>({
    username: '',
    key: key,
    message: 'Hello World',
  });

  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <title>{setting.title}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="icon" type="image/png" href={`${setting.basePath}/favicon.ico`} />
      </Head>
      <DataContext.Provider value={{sharedData, setSharedData}}>
        <Component {...pageProps} />
      </DataContext.Provider>
    </>
  );
};
