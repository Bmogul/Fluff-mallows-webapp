import { users, user, createUser, updateUser, deleteUser } from './users'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('users', () => {
  scenario('returns all users', async (scenario) => {
    const result = await users()

    expect(result.length).toEqual(Object.keys(scenario.user).length)
  })

  scenario('returns a single user', async (scenario) => {
    const result = await user({ uid: scenario.user.one.uid })

    expect(result).toEqual(scenario.user.one)
  })

  scenario('creates a user', async () => {
    const result = await createUser({
      input: { email: 'String4380389' },
    })

    expect(result.email).toEqual('String4380389')
  })

  scenario('updates a user', async (scenario) => {
    const original = await user({ uid: scenario.user.one.uid })
    const result = await updateUser({
      uid: original.uid,
      input: { email: 'String8899652' },
    })

    expect(result.email).toEqual('String8899652')
  })

  scenario('deletes a user', async (scenario) => {
    const original = await deleteUser({ uid: scenario.user.one.uid })
    const result = await user({ uid: original.uid })

    expect(result).toEqual(null)
  })
})
