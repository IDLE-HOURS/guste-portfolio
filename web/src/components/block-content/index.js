import BaseBlockContent from '@sanity/block-content-to-react'
import React from 'react'
import Figure from './figure'
import Slideshow from './slideshow'
import { makeGrid, makeMediaComponent, makeLine } from '../../templates/dynamicComponents'

import typography from '../typography.module.css'

const serializers = {
  types: {
    block (props) {
      switch (props.node.style) {
      case 'h1':
        return <h1 className={typography.responsiveTitle1}>{props.children}</h1>

      case 'h2':
        return <h2 className={typography.responsiveTitle2}>{props.children}</h2>

      case 'h3':
        return <h3 className={typography.responsiveTitle3}>{props.children}</h3>

      case 'h4':
        return <h4 className={typography.responsiveTitle4}>{props.children}</h4>

      case 'blockquote':
        return <blockquote className={typography.blockQuote}>{props.children}</blockquote>
      default:
        return <p className={typography.paragraph}>{props.children}</p>
      }
    },
    figure (props) {
      return makeMediaComponent(props.node)
    },
    slideshow (props) {
      return <Slideshow {...props.node} />
    },
    video (props) {
      return makeMediaComponent(props.node)
    },
    grid (props) {
      return makeGrid(props.node)
    },
    line(props) {
      return makeLine(props.node)
    }
  },
  marks: {
    properties (props) {
      const { color } = props.mark
      return (
        <span style={color? { color: color } : {}}>
          {props.children}
        </span>
      )
    }
  }
}

const BlockContent = ({ blocks, className }) => <BaseBlockContent className={className} blocks={blocks} serializers={serializers} />
export default BlockContent
