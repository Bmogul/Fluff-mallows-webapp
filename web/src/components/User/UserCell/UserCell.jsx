import User from 'src/components/User/User'

export const QUERY = gql`
  query FindUserByUid($uid: String!) {
    user: user(uid: $uid) {
      uid
      email
      fname
      lname
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>User not found</div>

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ user }) => {
  return <User user={user} />
}
