import React, { useEffect, useState, useCallback } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styles from '@styles/elements.module.css'

const Category = ({category, tags}) => {
  const [tag_names, set_tag_names] = useState([])
  const [collapsed, set_collapsed] = useState(true)

  useEffect(() => {
    set_tag_names([])
    tags.forEach(tag => {
      if (tag.category_uuid == category.uuid) {
        set_tag_names(tag_names => [...tag_names, tag.name])
      }
    })
  }, [category])

  const tagNamesRef = useCallback(node => {
    if (node != null) {
      node.innerHTML = ''
      while (node.children.length > 0) {
        node.removeChild()
      }
      tag_names.forEach(name => {
        node.insertAdjacentHTML('beforeend',`<li>${name}</li>`)
      })
    }
  }, [tag_names])

  const openItem = () => {
    set_collapsed(false)
  }

  const closeItem = () => {
    set_collapsed(true)
  }

  if (collapsed) {
    return(
      <div className={styles.elementEntryRowsWrapper}>
        <div className={`${styles.elementHeaderRow} ${styles.elementHeaderRowCollapsible}`} onClick={openItem} >
          <FontAwesomeIcon icon={category.icon} />
          <h3 className={styles.elementHeaderRowTitle}>{category.name}</h3>
          <FontAwesomeIcon icon={['far', 'plus-square']}/>
        </div>
        <div className={styles.elementInfoRow}>
          <p>Tag Names</p>
          <ul ref={tagNamesRef} className={styles.elementListCloud}></ul>
        </div>
      </div>
    )} else {
    return(
      <div className={styles.elementEntryRowsWrapper}>
        <div className={`${styles.elementHeaderRow} ${styles.elementHeaderRowCollapsible}`} onClick={closeItem} >
          <FontAwesomeIcon icon={category.icon} />
          <h3 className={styles.elementHeaderRowTitle}>{category.name}</h3>
          <FontAwesomeIcon icon={['far', 'minus-square']}/>
        </div>
        <div className={styles.elementInfoRow}>
          <p>Description</p>
          <p>{category.description}</p>
        </div>
        <div className={`${styles.elementInfoRow} ${styles.elementInfoRowIncrement}`}>
          <span>
            <p>Tag Names</p>
          </span>
          <ul ref={tagNamesRef} className={styles.elementListCloud}></ul>
        </div>
      </div>
    )}
}

export default Category
