import { navigate, routes } from '@redwoodjs/router'

import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import CartItemForm from 'src/components/CartItem/CartItemForm'

export const QUERY = gql`
  query EditCartItemById($id: Int!) {
    cartItem: cartItem(id: $id) {
      id
      productId
      quantity
      userId
      createdAt
    }
  }
`
const UPDATE_CART_ITEM_MUTATION = gql`
  mutation UpdateCartItemMutation($id: Int!, $input: UpdateCartItemInput!) {
    updateCartItem(id: $id, input: $input) {
      id
      productId
      quantity
      userId
      createdAt
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ cartItem }) => {
  const [updateCartItem, { loading, error }] = useMutation(
    UPDATE_CART_ITEM_MUTATION,
    {
      onCompleted: () => {
        toast.success('CartItem updated')
        navigate(routes.cartItems())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (input, id) => {
    updateCartItem({ variables: { id, input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">
          Edit CartItem {cartItem?.id}
        </h2>
      </header>
      <div className="rw-segment-main">
        <CartItemForm
          cartItem={cartItem}
          onSave={onSave}
          error={error}
          loading={loading}
        />
      </div>
    </div>
  )
}
