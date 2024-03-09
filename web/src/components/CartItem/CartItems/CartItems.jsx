import { Link, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { QUERY } from 'src/components/CartItem/CartItemsCell'
import { timeTag, truncate } from 'src/lib/formatters'

const DELETE_CART_ITEM_MUTATION = gql`
  mutation DeleteCartItemMutation($id: Int!) {
    deleteCartItem(id: $id) {
      id
    }
  }
`

const CartItemsList = ({ cartItems }) => {
  const [deleteCartItem] = useMutation(DELETE_CART_ITEM_MUTATION, {
    onCompleted: () => {
      toast.success('CartItem deleted')
    },
    onError: (error) => {
      toast.error(error.message)
    },
    // This refetches the query on the list page. Read more about other ways to
    // update the cache over here:
    // https://www.apollographql.com/docs/react/data/mutations/#making-all-other-cache-updates
    refetchQueries: [{ query: QUERY }],
    awaitRefetchQueries: true,
  })

  const onDeleteClick = (id) => {
    if (confirm('Are you sure you want to delete cartItem ' + id + '?')) {
      deleteCartItem({ variables: { id } })
    }
  }

  return (
    <div className="rw-segment rw-table-wrapper-responsive">
      <table className="rw-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Product id</th>
            <th>Quantity</th>
            <th>User id</th>
            <th>Created at</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {cartItems.map((cartItem) => (
            <tr key={cartItem.id}>
              <td>{truncate(cartItem.id)}</td>
              <td>{truncate(cartItem.productId)}</td>
              <td>{truncate(cartItem.quantity)}</td>
              <td>{truncate(cartItem.userId)}</td>
              <td>{timeTag(cartItem.createdAt)}</td>
              <td>
                <nav className="rw-table-actions">
                  <Link
                    to={routes.cartItem({ id: cartItem.id })}
                    title={'Show cartItem ' + cartItem.id + ' detail'}
                    className="rw-button rw-button-small"
                  >
                    Show
                  </Link>
                  <Link
                    to={routes.editCartItem({ id: cartItem.id })}
                    title={'Edit cartItem ' + cartItem.id}
                    className="rw-button rw-button-small rw-button-blue"
                  >
                    Edit
                  </Link>
                  <button
                    type="button"
                    title={'Delete cartItem ' + cartItem.id}
                    className="rw-button rw-button-small rw-button-red"
                    onClick={() => onDeleteClick(cartItem.id)}
                  >
                    Delete
                  </button>
                </nav>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default CartItemsList
