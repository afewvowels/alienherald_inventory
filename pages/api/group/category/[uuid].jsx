import nc from 'next-connect'
import db from '@db/firebase'

const handler = nc()

handler.get(async (req, res) => {
  const {
    query: { uuid }
  } = req

  await db
    .collection('categories')
    .where('uuid', '==', uuid)
    .get()
    .then((categories) => {
      let categoriesArr = []
      categories.forEach(category => {
        categoriesArr.push(category.data())
      })
      res.status(201).json(categoriesArr[0])
    })
    .catch((err) => res.status(401).send(`error getting categories ${err.message}`))
})

export default handler