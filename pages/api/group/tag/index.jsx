import nc from 'next-connect'
import db from '@db/firebase'

const handler = nc()

handler.get(async (req, res) => {
  await db
    .collection('tags')
    .orderBy('name')
    .get()
    .then((tags) => {
      let tagsArr = []
      tags.forEach(tag => {
        tagsArr.push(tag.data())
      })
      res.status(201).json(tagsArr)
    })
    .catch((err) => res.status(401).send(`error getting tags ${err.message}`))
})

export default handler