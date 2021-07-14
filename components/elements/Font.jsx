import React, { useState } from 'react'
import styles from '@styles/elements.module.css'

const Index = ({font}) => {
  const [error_msg] = useState('')

  return(<>
    { error_msg ? <p style={{color: 'red'}}>{error_msg}</p> : null }
    <div className={`${styles.elementEntryRowsWrapper} ${styles.elementFontWrapper}`}>
      <p>{font.name}</p>
      <p>{font.category}</p>
      <p>{font.weight0}</p>
      <p>{font.weight1}</p>
      <span>
      </span>
    </div>
  </>)
}

export default Index