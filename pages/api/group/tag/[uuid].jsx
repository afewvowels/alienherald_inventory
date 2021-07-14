import nc from 'next-connect'
import db from '@db/firebase'

const handler = nc()

handler.get(async (req, res) => {
  const {
    query: { uuid }
  } = req

  await db
    .collection('tags')
    .where('uuid', '==', uuid)
    .get()
    .then((tags) => {
      let tagsArr = []
      tags.forEach(tag => {
        tagsArr.push(tag.data())
      })
      res.status(201).json(tagsArr[0])
    })
    .catch((err) => res.status(401).send(`error getting tags ${err.message}`))
})

export default handler