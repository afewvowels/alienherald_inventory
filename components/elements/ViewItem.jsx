import styles from '@styles/elements.module.css'
import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import useSWR from 'swr'

const fetcher = (...args) => fetch(...args).then(res => res.json())

function useBin(uuid) {
  const { data, error } = useSWR(`/api/bin/${uuid}`, fetcher)
  return { bin: data, binIsLoading: !error && !data, binIsError: error }
}

function usePrototype(uuid) {
  const { data, error } = useSWR(`/api/prototype/${uuid}`, fetcher)
  return { prototype: data, prototypeIsLoading: !error && !data, prototypeIsError: error }
}

function useImage(uuid) {
  const { data, error } = useSWR(`/api/image/base64/${uuid}`, fetcher)
  return { image: data, isLoading: !error && !data, isError: error }
}

function BinImage({uuid}) {
  const { image, isLoading, isError } = useImage(uuid)

  if (isLoading) return (
    <span className={styles.statusIconWrapper}>
      <FontAwesomeIcon icon={['far', 'atom-alt']} spin />
    </span>)
  if (isError) return (
    <span className={styles.statusIconWrapper}>
      <FontAwesomeIcon icon={['far', 'exclamation']} />
    </span>)
  return <img src={image.base64} alt={uuid} />
}

function PrototypeImage({uuid}) {
  const { image, isLoading, isError } = useImage(uuid)

  if (isLoading) return (
    <span className={styles.statusIconWrapper}>
      <FontAwesomeIcon icon={['far', 'atom-alt']} spin />
    </span>)
  if (isError) return (
    <span className={styles.statusIconWrapper}>
      <FontAwesomeIcon icon={['far', 'exclamation']} />
    </span>)
  return <img src={image.base64} alt={uuid} />
}

const ViewItem = ({item}) => {
  const { bin } = useBin(item.bin_uuid)
  const { prototype } = usePrototype(item.prototype_uuid)

  if (!bin || !prototype) return <FontAwesomeIcon icon={['far', 'atom-alt']} spin size='sm' />

  return(
    <div className={styles.elementEntryRowsWrapper}>
      <div className={styles.elementButtonsWrapper}>
      </div>
      <div className={styles.elementHeaderRow}>
        <FontAwesomeIcon icon={bin.icon}/>
        <h3>{bin.name}</h3>
      </div>
      <div className={styles.elementInfoRow}>
        <BinImage uuid={bin.image_uuid}/>
      </div>
      <div className={styles.elementHeaderRow}>
        <FontAwesomeIcon icon={prototype.icon}/>
        <h3>{prototype.name}</h3>
      </div>
      <div className={styles.elementInfoRow}>
        <PrototypeImage uuid={prototype.image_uuid}/>
      </div>
      <div className={styles.elementInfoRow}>
        <p>Notes</p>
        <p>{(item.notes) ? (item.notes == '') ? 'None' : item.notes : 'None' }</p>
      </div>
      <div className={styles.elementInfoRow}>
        <p>Item is in bin</p>
      </div>
      <div className={styles.elementButtonsWrapper}>
      </div>
    </div>
  )
}

export default ViewItem