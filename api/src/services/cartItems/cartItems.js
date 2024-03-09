import { db } from 'src/lib/db'

export const cartItems = () => {
  return db.cartItem.findMany()
}

export const cartItem = ({ id }) => {
  return db.cartItem.findUnique({
    where: { id },
  })
}

export const createCartItem = ({ input }) => {
  return db.cartItem.create({
    data: input,
  })
}

export const updateCartItem = ({ id, input }) => {
  return db.cartItem.update({
    data: input,
    where: { id },
  })
}

export const deleteCartItem = ({ id }) => {
  return db.cartItem.delete({
    where: { id },
  })
}

export const CartItem = {
  product: (_obj, { root }) => {
    return db.cartItem.findUnique({ where: { id: root?.id } }).product()
  },
  user: (_obj, { root }) => {
    return db.cartItem.findUnique({ where: { id: root?.id } }).user()
  },
}
