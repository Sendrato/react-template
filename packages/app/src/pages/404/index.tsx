import { NextPage } from 'next';
import Head from 'next/head';
import React from 'react';

import ErrorComponent from '@components/404/404';

const Custom404Page: NextPage = () => (
  <>
    <Head>
      <title>This page is under construction</title>
    </Head>
    <ErrorComponent />
  </>
);
export default Custom404Page;
