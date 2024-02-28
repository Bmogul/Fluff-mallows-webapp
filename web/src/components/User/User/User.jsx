import { Link, routes, navigate } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import 'src/lib/formatters'

const DELETE_USER_MUTATION = gql`
  mutation DeleteUserMutation($uid: String!) {
    deleteUser(uid: $uid) {
      uid
    }
  }
`

const User = ({ user }) => {
  const [deleteUser] = useMutation(DELETE_USER_MUTATION, {
    onCompleted: () => {
      toast.success('User deleted')
      navigate(routes.users())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onDeleteClick = (uid) => {
    if (confirm('Are you sure you want to delete user ' + uid + '?')) {
      deleteUser({ variables: { uid } })
    }
  }

  return (
    <>
      <div className="rw-segment">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">
            User {user.uid} Detail
          </h2>
        </header>
        <table className="rw-table">
          <tbody>
            <tr>
              <th>Uid</th>
              <td>{user.uid}</td>
            </tr>
            <tr>
              <th>Email</th>
              <td>{user.email}</td>
            </tr>
            <tr>
              <th>Fname</th>
              <td>{user.fname}</td>
            </tr>
            <tr>
              <th>Lname</th>
              <td>{user.lname}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <nav className="rw-button-group">
        <Link
          to={routes.editUser({ uid: user.uid })}
          className="rw-button rw-button-blue"
        >
          Edit
        </Link>
        <button
          type="button"
          className="rw-button rw-button-red"
          onClick={() => onDeleteClick(user.uid)}
        >
          Delete
        </button>
      </nav>
    </>
  )
}

export default User
