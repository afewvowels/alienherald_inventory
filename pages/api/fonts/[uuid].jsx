import nc from 'next-connect'
import db from '@db/firebase'

const handler = nc()

handler.get(async (req, res) => {
  const {
    query: { uuid }
  } = req

  await db
    .collection('fonts')
    .where('uuid', '==', uuid)
    .get()
    .then((fonts) => {
      let fontsArr = []
      fonts.forEach(font => {
        fontsArr.push(font.data())
      })
      res.status(201).json(fontsArr[0])
    })
    .catch((err) => res.status(401).send(`error getting fonts ${err.message}`))
})

export default handler