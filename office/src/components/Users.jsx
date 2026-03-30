import { useLoaderData } from 'react-router-dom';
import { axiosPrivate } from '../api/axios';

/**
 * Optional loader (can be wired into the router if this route is added).
 */
export const usersLoader = async () => {
  try {
    const { data } = await axiosPrivate.get('/users');
    return data ?? [];
  } catch {
    return [];
  }
};

/**
 * Users list.
 *
 * Bug fix: Uses `user._id` as the React key instead of the array index.
 * Using array indices causes rendering bugs when items are deleted.
 */
const Users = () => {
  const users = useLoaderData();

  return (
    <article>
      <h2>Users List</h2>
      {users?.length ? (
        <ul>
          {users.map((user) => (
            <li key={user._id}>{user?.username}</li>
          ))}
        </ul>
      ) : (
        <p>No users to display</p>
      )}
    </article>
  );
};

export default Users;
