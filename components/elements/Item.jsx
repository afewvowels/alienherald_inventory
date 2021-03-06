import styles from '@styles/elements.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import useSWR from 'swr'
import Link from 'next/link'
import React, { useState } from 'react'

const fetcher = (...args) => fetch(...args).then(res => res.json())

function useImage(uuid) {
  const { data, error } = useSWR(`/api/image/base64/${uuid}`, fetcher)
  return { image: data, isLoading: !error && !data, isError: error }
}

function PrototypeImage({uuid, item}) {
  const { image, isLoading, isError } = useImage(uuid)

  if (isLoading) return (
    <span className={`${styles.statusIconWrapper} ${styles.statusIconWrapperAnimated}`}>
      <FontAwesomeIcon icon={['far', 'atom-alt']} />
    </span>)
  if (isError) return (
    <span className={styles.statusIconWrapper}>
      <FontAwesomeIcon icon={['far', 'exclamation']} />
    </span>)
  return (<Link href={`/prototype/${item.prototype_uuid}`}><img src={image.base64} alt={uuid} className={styles.elementInfoImage}/></Link>)
}

const Item = ({item}) => {
  const [collapsed, set_collapsed] = useState(true)
  const [check_in_out] = useState()
  const [error_msg] = useState('')

  const openItem = () => {
    set_collapsed(false)
  }

  const closeItem = () => {
    set_collapsed(true)
  }

  if (collapsed) {
    return(
      <div className={styles.elementEntryRowsWrapper}>
        <div className={`${styles.elementHeaderRowItems} ${styles.elementHeaderRowCollapsible}`}>
          <span>
            {check_in_out ? <FontAwesomeIcon icon={['fas', 'toggle-on']} /> :<FontAwesomeIcon icon={['fas', 'toggle-off']} />}
            <FontAwesomeIcon className={styles.elementHeaderRowItemIconPrototype} icon={item.prototype_icon} />
          </span>
          <span onClick={openItem}>
            <h3 className={styles.elementHeaderRowTitle}>{item.prototype_name}</h3>
            <FontAwesomeIcon icon={['far', 'plus-square']} />
          </span>
        </div>
      </div>
    )} else {
    return(
      <div className={styles.elementEntryRowsWrapper}>
        {error_msg ? <p style={{color: 'red'}}>{error_msg}</p> : null}
        <div className={`${styles.elementHeaderRowItems} ${styles.elementHeaderRowCollapsible}`}>
          <span>
            {check_in_out ? <FontAwesomeIcon icon={['fas', 'toggle-on']} /> : <FontAwesomeIcon icon={['fas', 'toggle-off']} />}
            <FontAwesomeIcon className={styles.elementHeaderRowItemIconPrototype}  icon={item.prototype_icon}/>
          </span>
          <span onClick={closeItem}>
            <h3 className={styles.elementHeaderRowTitle}>{item.prototype_name}</h3>
            <FontAwesomeIcon icon={['far', 'minus-square']} onClick={closeItem} />
          </span>
        </div>
        <div className={styles.elementInfoRow}>
          <PrototypeImage uuid={item.prototype_image_uuid} item={item}/>
        </div>
        <div className={styles.elementInfoRow}>
          <p>Notes</p>
          <p>{(item.notes) ? (item.notes == '') ? 'None' : item.notes : 'None' }</p>
        </div>
        <div className={styles.elementButtonsWrapperGrid}>
        </div>
      </div>
    )}
}

export default Item
