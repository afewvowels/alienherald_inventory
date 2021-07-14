import nc from 'next-connect'
import db from '@db/firebase'

const handler = nc()

handler.get(async (req, res) => {
  await db
    .collection('items')
    .get()
    .then(async (items) => {
      let itemsArr = []
      items.forEach(async (item) => {
        itemsArr.push(item.data())
      })
      res.status(201).json(itemsArr)
    })
    .catch((err) => res.status(401).send(`error getting items ${err.message}`))
})

export default handler