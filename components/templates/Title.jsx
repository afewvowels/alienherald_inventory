import React from 'react'

import styles from '@styles/titles.module.css'

const Title = ({title}) => {
  return(
    <div className={styles.titleWrapper}>
      <h2>{title}</h2>
    </div>)
}

export default Title