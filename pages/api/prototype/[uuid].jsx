import nc from 'next-connect'
import db from '@db/firebase'

const handler = nc()

handler.get(async (req, res) => {
  const {
    query: { uuid }
  } = req

  await db
    .collection('prototypes')
    .where('uuid', '==', uuid)
    .get()
    .then((prototypes) => {
      let prototypesArr = []
      prototypes.forEach(prototype => {
        prototypesArr.push(prototype.data())
      })
      res.status(201).json(prototypesArr[0])
    })
    .catch((err) => res.status(401).send(`error getting prototypes ${err.message}`))
})

export default handler