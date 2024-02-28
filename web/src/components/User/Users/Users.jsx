import { Link, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { QUERY } from 'src/components/User/UsersCell'
import { truncate } from 'src/lib/formatters'

const DELETE_USER_MUTATION = gql`
  mutation DeleteUserMutation($uid: String!) {
    deleteUser(uid: $uid) {
      uid
    }
  }
`

const UsersList = ({ users }) => {
  const [deleteUser] = useMutation(DELETE_USER_MUTATION, {
    onCompleted: () => {
      toast.success('User deleted')
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

  const onDeleteClick = (uid) => {
    if (confirm('Are you sure you want to delete user ' + uid + '?')) {
      deleteUser({ variables: { uid } })
    }
  }

  return (
    <div className="rw-segment rw-table-wrapper-responsive">
      <table className="rw-table">
        <thead>
          <tr>
            <th>Uid</th>
            <th>Email</th>
            <th>Fname</th>
            <th>Lname</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.uid}>
              <td>{truncate(user.uid)}</td>
              <td>{truncate(user.email)}</td>
              <td>{truncate(user.fname)}</td>
              <td>{truncate(user.lname)}</td>
              <td>
                <nav className="rw-table-actions">
                  <Link
                    to={routes.user({ uid: user.uid })}
                    title={'Show user ' + user.uid + ' detail'}
                    className="rw-button rw-button-small"
                  >
                    Show
                  </Link>
                  <Link
                    to={routes.editUser({ uid: user.uid })}
                    title={'Edit user ' + user.uid}
                    className="rw-button rw-button-small rw-button-blue"
                  >
                    Edit
                  </Link>
                  <button
                    type="button"
                    title={'Delete user ' + user.uid}
                    className="rw-button rw-button-small rw-button-red"
                    onClick={() => onDeleteClick(user.uid)}
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

export default UsersList
