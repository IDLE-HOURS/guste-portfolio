import { format, distanceInWords, differenceInDays } from 'date-fns'
import React from 'react'
import { buildImageObj } from '../lib/helpers'
import { imageUrlFor } from '../lib/image-url'
import BlockContent from './block-content'
import Container from './container'
import RoleList from './role-list'
import Image from './image/image'
import { makeComponents } from '../templates/dynamicComponents'

import styles from './blog-post.module.css'

class BlogPost extends React.Component {
  componentWillMount () {
    this.components = makeComponents(this.props._rawContent)
  }

  render () {
    console.log('Produced components: ', this.components)
    const { _rawBody, authors, categories, title, mainImage, publishedAt } = this.props
    return (
      <article className={styles.root}>
        <Container>
          <div className={styles.grid}>
            <div className={styles.mainContent}>
              <Image fluid={mainImage.asset.fluid} alt='Main Image' />
              <h1 className={styles.title}>{title}</h1>
              {this.components}
              {_rawBody && <BlockContent blocks={_rawBody} />}
            </div>
            <aside className={styles.metaContent}>
              {publishedAt && (
                <div className={styles.publishedAt}>
                  {differenceInDays(new Date(publishedAt), new Date()) > 3
                    ? distanceInWords(new Date(publishedAt), new Date())
                    : format(new Date(publishedAt), 'MMMM Do YYYY')}
                </div>
              )}
              {authors && <RoleList items={authors} title='Authors' />}
              {categories && (
                <div className={styles.categories}>
                  <h3 className={styles.categoriesHeadline}>Categories</h3>
                  <ul>
                    {categories.map(category => (
                      <li key={category._id}>{category.title}</li>
                    ))}
                  </ul>
                </div>
              )}
            </aside>
          </div>
        </Container>
      </article>
    )
  }
}

export default BlogPost
