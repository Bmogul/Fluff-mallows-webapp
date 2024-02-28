import { db } from 'src/lib/db'

export const users = () => {
  return db.user.findMany()
}

export const user = ({ uid }) => {
  return db.user.findUnique({
    where: { uid },
  })
}

export const createUser = ({ input }) => {
  return db.user.create({
    data: input,
  })
}

export const updateUser = ({ uid, input }) => {
  return db.user.update({
    data: input,
    where: { uid },
  })
}

export const deleteUser = ({ uid }) => {
  return db.user.delete({
    where: { uid },
  })
}
