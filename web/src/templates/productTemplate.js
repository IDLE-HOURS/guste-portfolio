import React from 'react'
import { graphql } from 'gatsby'
import Container from '../components/container'
import GraphQLErrorList from '../components/graphql-error-list'
import Product from '../components/product/product'
import SEO from '../components/seo'
import Layout from '../containers/layout'

export const query = graphql`
  query ProductTemplateQuery($id: String!) {
    product: sanityProduct(id: { eq: $id }) {
      id
      publishedAt
      title
      price
      discount
      quantity
      slug {
        current
      }
      categories {
        _id
        title
      }

      mainImage {
          asset {
            url
            id
            fluid {
              ...GatsbySanityImageFluid
            }
          }
        alt
      }

    images {
      asset {
        url
        id
        fluid {
          ...GatsbySanityImageFluid
        }
      }
    }
      _rawDescription
    }
  }
`

const ProductTemplate = props => {
  const { data, errors } = props
  const product = data && data.product
  return (
    <Layout>
      {errors && <SEO title='GraphQL Error' />}
      {product && <SEO title={product.title || 'Untitled'} />}

      {errors && (
        <Container>
          <GraphQLErrorList errors={errors} />
        </Container>
      )}
      {product && <Product {...product} />}
    </Layout>
  )
}

export default ProductTemplate
