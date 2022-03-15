import Head from 'next/head'

export interface HeadProps {
  title: string
  description: string
  url: string
}

const PageHead = (props: HeadProps) => {
  const fullUrl = `https://jntuh-results-stats.vercel.app/${props.url}`
  return (
    <Head>
      <title>{props.title}</title>
      <link rel='icon' href='/financial.ico' />
      <meta property='og:url' content={fullUrl} />
      <meta property='og:type' content='website' />
      <meta property='og:title' content='JNTUH Results Statistics' />
      <meta name='twitter:card' content='summary' />
      <meta property='og:description' content={props.description} />
    </Head>
  )
}

export default PageHead
