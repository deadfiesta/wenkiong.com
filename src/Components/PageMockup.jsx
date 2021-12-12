import React from 'react'
import { useState } from 'react'
import Scrium from './Scrium'
import Content from './Content'
import Navigation from './Navigation'
import { content } from './DataAll'

const PageCoral = ({ open, close }) => {

  const [topicIndex, setTopicIndex] = useState(0)

  let contentData = content[1].mockup;

  const change = (e) => {
    setTopicIndex(Number(e.currentTarget.attributes.topic.nodeValue))
  }

  return (
    <div className="content">
      <Navigation onclick={change} highlight={topicIndex} data={contentData} open={open} />
      {
        open
        && <Scrium click={close} />
      }
      <Content topicId={topicIndex} data={contentData} onclick={change} />
    </div>
  )
}

export default PageCoral
