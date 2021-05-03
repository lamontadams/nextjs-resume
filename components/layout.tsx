import Head from 'next/head'
import { isNil } from 'lodash'
import { PersonalData } from '../models/personalData'
import React from 'react'
import Profile from './profile'

interface Props {
  children: any,
  home?: any,
  title?: string,
  personal: PersonalData
}

export default function Layout({ children, home, title, personal }: Props) {
  const defaultTitle = `${personal.name} - Resume`;
  const titleOverride = isNil(title) ? defaultTitle : `${defaultTitle} - ${title}`;
  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/devicons/devicon@v2.11.0/devicon.min.css"></link>
        <meta
          name="description"
          content={personal.content}
        />
        <meta name="og:title" content={titleOverride} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
        <title>{titleOverride}</title>
            
      </Head>
      <div className="resume-wrapper">
        <Profile personal={personal} />
      </div>
      <main>{children}</main>
      {/* {!home && (
        <div className={styles.backToHome}>
          <Link href="/">
            <a>← Back to home</a>
          </Link>
        </div>
      )} */}
    </>
  )
}

  