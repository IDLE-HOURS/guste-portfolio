import React from 'react'
import { graphql } from 'gatsby'
import Container from '../components/container'
import GraphQLErrorList from '../components/graphql-error-list'
import Product from '../components/product/product'
import SEO from '../components/seo'
import Layout from '../containers/layout'
import { CurrencyContext, currencies } from '../context/currency-context'

export const query = graphql`
  query ProductTemplateQuery($id: String!) {
    product: sanityProduct(id: { eq: $id }) {
      id
      publishedAt
      title
      discount
      details {
          instock
          size
          price
        }
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
            fluid(maxHeight: 1000, maxWidth: 1000) {
              ...GatsbySanityImageFluid
            }
          }
        alt
      }

    images {
      asset {
        url
        id
        fluid(maxHeight: 1000, maxWidth: 1000) {
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
  const rates = props.pageContext.rates

  return (
    <Layout>
      {errors && <SEO title='GraphQL Error' />}
      {product && <SEO title={product.title || 'Untitled'} />}

      {errors && (
        <Container>
          <GraphQLErrorList errors={errors} />
        </Container>
      )}
      <CurrencyContext.Consumer>
        {({ currency, switchCurrency, calcPrice }) => {
          const currencyContext = { currency, switchCurrency, rates, calcPrice }
          return (
            product && <Product {...product} currencyContext={currencyContext} />
          )
        }}
      </CurrencyContext.Consumer>
    </Layout>
  )
}

export default ProductTemplate
