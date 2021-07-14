import nc from 'next-connect'
import db from '@db/firebase'

const handler = nc()

handler.get(async (req, res) => {
  const {
    query: { uuid }
  } = req

  await db
    .collection('images')
    .where('uuid', '==', uuid)
    .get()
    .then((images) => {
      let imagesArr = []
      images.forEach(image => {
        imagesArr.push(image.data())
      })
      res.status(201).json(imagesArr[0])
    })
    .catch((err) => res.status(401).send(`error getting images ${err.message}`))
})

export default handler