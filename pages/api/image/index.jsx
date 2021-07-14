import nc from 'next-connect'
import db from '@db/firebase'

const handler = nc()

handler.get(async (req, res) => {
  await db
    .collection('images')
    .get()
    .then((images) => {
      let imagesArr = []
      images.forEach(image => {
        imagesArr.push(image.data())
      })
      res.status(201).json(imagesArr)
    })
    .catch((err) => res.status(401).send(`error getting images ${err.message}`))
})

export default handler