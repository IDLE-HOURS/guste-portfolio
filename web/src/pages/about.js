import React from 'react'
import { graphql } from 'gatsby'

import Container from '../components/container'
import GraphQLErrorList from '../components/graphql-error-list'
import SEO from '../components/seo'
import Layout from '../containers/layout'
import About from '../components/about'
import { mapEdgesToNodes, filterOutDocsWithoutSlugs, cn } from '../lib/helpers'
import { responsiveTitle3, uppercase, border } from '../components/typography.module.css'

export const query = graphql`
  query AboutPageQuery {
    page: sanityAboutPage(_id: { regex: "/(drafts.|)aboutPage/" }) {
      id
      _id
      title
      _rawBody(resolveReferences: { maxDepth: 5 })
      pageImage {
        asset {
          fluid(maxWidth: 1920) {
            ...GatsbySanityImageFluid
          }
        }
      }
      heroImage {
        asset {
          fluid(maxWidth: 1920) {
            ...GatsbySanityImageFluid
          }
        }
      }
    }

    instagram: allInstaNode(sort: {fields: timestamp, order: DESC}) {
      edges {
        node {
          id
          caption
          timestamp
          localFile {
            childImageSharp {
              fluid(maxWidth: 600, maxHeight: 600) {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
      }
    }
  }
`

const AboutPage = props => {
  const { data, errors } = props

  if (errors) {
    return (
      <Layout>
        <GraphQLErrorList errors={errors} />
      </Layout>
    )
  }

  const page = data && data.page
  const instagram = data && data.instagram && data.instagram.edges.slice(0, 4)

  if (!page) {
    throw new Error(
      'Missing "About" page data. Open the studio at http://localhost:3333 and add "About" page data and restart the development server.'
    )
  }

  return (
    <Layout>
      <SEO title={page.title} />
      <Container>
        <About
          heroImage={page.heroImage}
          pageImage={page.pageImage}
          title={page.title}
          instagram={instagram}
          _rawBody={page._rawBody || []}
        />
      </Container>
    </Layout>
  )
}

export default AboutPage
