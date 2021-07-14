import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styles from '@styles/elements.module.css'

const Tag = ({tag, categories}) => {
  const [category_name, set_category_name] = useState('')
  const [collapsed, set_collapsed] = useState(true)

  useEffect(() => {
    categories.forEach(category => {
      if (category.uuid == tag.category_uuid) {
        set_category_name(category.name)
        return
      }
    })
  }, [tag])

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
          <FontAwesomeIcon icon={tag.icon} />
          <h3 className={styles.elementHeaderRowTitle}>{tag.name}</h3>
          <FontAwesomeIcon icon={['far', 'plus-square']}/>
        </div>
      </div>
    )} else {
    return(
      <div className={styles.elementEntryRowsWrapper}>
        <div className={`${styles.elementHeaderRow} ${styles.elementHeaderRowCollapsible}`} onClick={closeItem} >
          <FontAwesomeIcon icon={tag.icon} />
          <h3 className={styles.elementHeaderRowTitle}>{tag.name}</h3>
          <FontAwesomeIcon icon={['far', 'minus-square']}/>
        </div>
        <div className={styles.elementInfoRow}>
          <p>Category</p>
          <p>{category_name}</p>
        </div>
        <div className={styles.elementInfoRow}>
          <p>Description</p>
          <p>{tag.description}</p>
        </div>
        <div className={styles.elementButtonsWrapperGrid}>
        </div>
      </div>
    )}
}

export default Tag
