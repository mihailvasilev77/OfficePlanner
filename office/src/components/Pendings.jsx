import { useLoaderData, Link } from 'react-router-dom';
import { axiosPrivate } from '../api/axios';
import moment from 'moment';

/**
 * Router loader — fetches pending requests before the component renders.
 * Eliminates useEffect + useState data-fetching pattern.
 */
export const pendingsLoader = async () => {
  const { data } = await axiosPrivate.get('/pending');
  return data ?? [];
};

/**
 * Pendings list.
 *
 * Bug fixes:
 *  - Uses database `_id` as React key instead of array index.
 *  - Navigates to `/edit/:id` with only the ID in the URL (not the
 *    entire pendingData array through router state).
 */
const Pendings = () => {
  const pendingData = useLoaderData();

  return (
    <div className="pendingList">
      <h1>Pendings List</h1>
      <ul className="pendingUl">
        {pendingData?.length ? (
          pendingData.map((item) => (
            <li className="pendingLi" key={item._id}>
              Username: {item.username}
              <br />
              Start date: {moment(item.startDate).format('DD MMM YYYY, ddd')}
              <br />
              End date: {moment(item.endDate).format('DD MMM YYYY, ddd')}
              <br />
              Status: {item.status}
              <br />
              <Link to={`/edit/${item._id}`}>
                <button type="button">Change Status</button>
              </Link>
            </li>
          ))
        ) : (
          <p>No pending vacations to display</p>
        )}
      </ul>
    </div>
  );
};

export default Pendings;
