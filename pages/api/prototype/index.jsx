import nc from 'next-connect'
import db from '@db/firebase'

const handler = nc()

handler.get(async (req, res) => {
  await db
    .collection('prototypes')
    .orderBy('name')
    .get()
    .then((prototypes) => {
      let prototypesArr = []
      prototypes.forEach(prototype => {
        prototypesArr.push(prototype.data())
      })
      res.status(201).json(prototypesArr)
    })
    .catch((err) => res.status(401).send(`error getting prototypes ${err.message}`))
})

export default handler