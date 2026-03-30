import { Form, useLoaderData, useActionData, useNavigate, Link } from 'react-router-dom';
import { axiosPrivate } from '../api/axios';
import { useEffect } from 'react';
import moment from 'moment';

/**
 * Router loader — fetches a single pending item by its `_id` param.
 *
 * Bug fix: The old code relied entirely on `location.state` which is
 * null after a page refresh, crashing the app. Now the data comes from
 * the URL param + an API call, surviving refreshes gracefully.
 */
export const editLoader = async ({ params }) => {
  try {
    const { data } = await axiosPrivate.get(`/pending/${params.id}`);
    return data;
  } catch {
    return null;
  }
};

/**
 * Router action — handles the approve/deny form submission.
 */
export const editAction = async ({ request, params }) => {
  const formData = await request.formData();
  const status = formData.get('status');
  const user = formData.get('user');
  const startDate = formData.get('startDate');
  const endDate = formData.get('endDate');

  try {
    if (status === 'Approved') {
      // Create the approved vacation entry
      await axiosPrivate.post('/vacation', { user, startDate, endDate });
      // Delete the pending request
      await axiosPrivate.delete(`/pending/${params.id}`);
    } else if (status === 'Denied') {
      // Just delete the pending request
      await axiosPrivate.delete(`/pending/${params.id}`);
    }

    return { success: true };
  } catch (err) {
    if (!err?.response) return { error: 'No server response.' };
    return { error: 'Edit failed.' };
  }
};

const Edit = () => {
  const vacationItem = useLoaderData();
  const actionData = useActionData();
  const navigate = useNavigate();

  // Redirect to pendings on successful action
  useEffect(() => {
    if (actionData?.success) {
      navigate('/pendings');
    }
  }, [actionData, navigate]);

  // Fallback UI if the item wasn't found (replaces the old crash)
  if (!vacationItem) {
    return (
      <div style={{ textAlign: 'center', padding: '2rem' }}>
        <h2>No vacation data found.</h2>
        <p>The request may have been deleted or the ID is invalid.</p>
        <Link to="/pendings">Go back to Pendings</Link>
      </div>
    );
  }

  return (
    <Form className="editForm" method="post">
      {actionData?.error && (
        <p className="errmsg" aria-live="assertive">
          {actionData.error}
        </p>
      )}
      <h1>Edit the request for a vacation.</h1>

      <label htmlFor="username">
        Username:&nbsp;
        <input type="text" name="user" value={vacationItem.username} readOnly />
      </label>

      <label htmlFor="startDate">
        Start Date:&nbsp;
        <input
          type="date"
          id="startDate"
          name="startDate"
          defaultValue={moment(vacationItem.startDate).format('YYYY-MM-DD')}
          readOnly
        />
      </label>

      <label htmlFor="endDate">
        End Date:&nbsp;
        <input
          type="date"
          id="endDate"
          name="endDate"
          defaultValue={moment(vacationItem.endDate).format('YYYY-MM-DD')}
          readOnly
        />
      </label>

      <label htmlFor="status">
        Status:&nbsp;
        <select id="status" name="status" defaultValue="Pending">
          <option value="Pending" disabled>
            Pending
          </option>
          <option value="Denied">Denied</option>
          <option value="Approved">Approved</option>
        </select>
      </label>

      <button type="submit">Submit</button>
    </Form>
  );
};

export default Edit;
