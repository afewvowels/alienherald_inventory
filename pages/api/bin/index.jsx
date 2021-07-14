import db from '@db/firebase'
import nc from 'next-connect'

const handler = nc()

handler.get(async (req, res) => {
  await db
    .collection('bins')
    .orderBy('name')
    .get()
    .then((bins) => {
      let binsArr = []
      bins.forEach(bin => {
        binsArr.push(bin.data())
      })
      res.status(201).json(binsArr)
    })
    .catch((err) => res.status(401).send(`error getting bins ${err.message}`))
})

export default handler