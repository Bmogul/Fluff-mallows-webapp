import { Link, routes, navigate } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { timeTag } from 'src/lib/formatters'

const DELETE_CART_ITEM_MUTATION = gql`
  mutation DeleteCartItemMutation($id: Int!) {
    deleteCartItem(id: $id) {
      id
    }
  }
`

const CartItem = ({ cartItem }) => {
  const [deleteCartItem] = useMutation(DELETE_CART_ITEM_MUTATION, {
    onCompleted: () => {
      toast.success('CartItem deleted')
      navigate(routes.cartItems())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onDeleteClick = (id) => {
    if (confirm('Are you sure you want to delete cartItem ' + id + '?')) {
      deleteCartItem({ variables: { id } })
    }
  }

  return (
    <>
      <div className="rw-segment">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">
            CartItem {cartItem.id} Detail
          </h2>
        </header>
        <table className="rw-table">
          <tbody>
            <tr>
              <th>Id</th>
              <td>{cartItem.id}</td>
            </tr>
            <tr>
              <th>Product id</th>
              <td>{cartItem.productId}</td>
            </tr>
            <tr>
              <th>Quantity</th>
              <td>{cartItem.quantity}</td>
            </tr>
            <tr>
              <th>User id</th>
              <td>{cartItem.userId}</td>
            </tr>
            <tr>
              <th>Created at</th>
              <td>{timeTag(cartItem.createdAt)}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <nav className="rw-button-group">
        <Link
          to={routes.editCartItem({ id: cartItem.id })}
          className="rw-button rw-button-blue"
        >
          Edit
        </Link>
        <button
          type="button"
          className="rw-button rw-button-red"
          onClick={() => onDeleteClick(cartItem.id)}
        >
          Delete
        </button>
      </nav>
    </>
  )
}

export default CartItem
