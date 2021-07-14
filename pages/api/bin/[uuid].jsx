import db from '@db/firebase'
import nc from 'next-connect'

const handler = nc()

handler.get(async (req, res) => {
  const {
    query: { uuid }
  } = req

  await db
    .collection('bins')
    .where('uuid', '==', uuid)
    .get()
    .then((bins) => {
      let binsArr = []
      bins.forEach(bin => {
        binsArr.push(bin.data())
      })
      res.status(201).json(binsArr[0])
    })
    .catch((err) => res.status(401).send(`error getting bins ${err.message}`))
})

export default handler