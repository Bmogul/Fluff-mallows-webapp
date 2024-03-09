import { navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import CartItemForm from 'src/components/CartItem/CartItemForm'

const CREATE_CART_ITEM_MUTATION = gql`
  mutation CreateCartItemMutation($input: CreateCartItemInput!) {
    createCartItem(input: $input) {
      id
    }
  }
`

const NewCartItem = () => {
  const [createCartItem, { loading, error }] = useMutation(
    CREATE_CART_ITEM_MUTATION,
    {
      onCompleted: () => {
        toast.success('CartItem created')
        navigate(routes.cartItems())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (input) => {
    createCartItem({ variables: { input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">New CartItem</h2>
      </header>
      <div className="rw-segment-main">
        <CartItemForm onSave={onSave} loading={loading} error={error} />
      </div>
    </div>
  )
}

export default NewCartItem
