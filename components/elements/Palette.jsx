import React, { useState } from 'react'
import styles from '@styles/elements.module.css'

const Index = ({palette}) => {
  const [error_msg] = useState('')

  return(<>
    { error_msg ? <p style={{color: 'red'}}>{error_msg}</p> : null }
    <div className={`${styles.elementEntryRowsWrapper} ${styles.elementPaletteWrapper}`}>
      <span className={styles.elementPaletteSwatch}>
        <div style={{backgroundColor: `#${palette.hex0}`}}></div>
        <p>#{palette.hex0}</p>
        <p>{palette.color0}</p>
      </span>
      <span className={styles.elementPaletteSwatch}>
        <div style={{backgroundColor: `#${palette.hex1}`}}></div>
        <p>#{palette.hex1}</p>
        <p>{palette.color1}</p>
      </span>
      <span>
      </span>
    </div>
  </>)
}

export default Index