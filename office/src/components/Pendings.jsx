import { useLoaderData, Link } from 'react-router-dom';
import { axiosPrivate } from '../api/axios';
import moment from 'moment';

export const pendingsLoader = async () => {
  const { data } = await axiosPrivate.get('/pending');
  return data ?? [];
};

const Pendings = () => {
  const pendingData = useLoaderData();

  return (
    <div className="pendingList">
      <h1>Pending Requests</h1>
      <ul className="pendingUl">
        {pendingData?.length ? (
          pendingData.map((item) => (
            <li className="pendingLi" key={item._id}>
              <strong style={{ fontSize: 'var(--font-size-base)', color: 'var(--color-neutral-900)' }}>
                {item.username}
              </strong>
              <span>
                {moment(item.startDate).format('DD MMM YYYY')} &mdash;{' '}
                {moment(item.endDate).format('DD MMM YYYY')}
              </span>
              <span style={{ color: 'var(--color-warning-600)', fontWeight: 'var(--font-weight-medium)' }}>
                {item.status}
              </span>
              <Link to={`/edit/${item._id}`}>
                <button type="button">Review</button>
              </Link>
            </li>
          ))
        ) : (
          <p style={{ gridColumn: '1 / -1', textAlign: 'center', padding: 'var(--space-8)' }}>
            No pending vacations to display
          </p>
        )}
      </ul>
    </div>
  );
};

export default Pendings;
