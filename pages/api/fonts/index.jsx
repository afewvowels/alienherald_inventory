import nc from 'next-connect'
import db from '@db/firebase'

const handler = nc()

handler.get(async (req, res) => {
  await db
    .collection('fonts')
    .orderBy('name')
    .get()
    .then((fonts) => {
      let fontsArr = []
      fonts.forEach(font => {
        fontsArr.push(font.data())
      })
      res.status(201).json(fontsArr)
    })
    .catch((err) => res.status(401).send(`error getting fonts ${err.message}`))
})

export default handler