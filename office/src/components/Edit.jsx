import { Form, useLoaderData, useActionData, useNavigate, Link } from 'react-router-dom';
import { axiosPrivate } from '../api/axios';
import { useEffect } from 'react';
import moment from 'moment';

export const editLoader = async ({ params }) => {
  try {
    const { data } = await axiosPrivate.get(`/pending/${params.id}`);
    return data;
  } catch {
    return null;
  }
};

export const editAction = async ({ request, params }) => {
  const formData = await request.formData();
  const status = formData.get('status');
  const user = formData.get('user');
  const startDate = formData.get('startDate');
  const endDate = formData.get('endDate');

  try {
    if (status === 'Approved') {
      await axiosPrivate.post('/vacation', { user, startDate, endDate });
      await axiosPrivate.delete(`/pending/${params.id}`);
    } else if (status === 'Denied') {
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

  useEffect(() => {
    if (actionData?.success) navigate('/pendings');
  }, [actionData, navigate]);

  if (!vacationItem) {
    return (
      <section style={{ textAlign: 'center', alignItems: 'center' }}>
        <h1>Not Found</h1>
        <p>The request may have been deleted or the ID is invalid.</p>
        <Link to="/pendings">
          <button type="button">&larr; Back to Pendings</button>
        </Link>
      </section>
    );
  }

  return (
    <Form className="editForm" method="post">
      {actionData?.error && (
        <p className="errmsg" aria-live="assertive">{actionData.error}</p>
      )}
      <h1>Review Vacation Request</h1>

      <label htmlFor="username">Employee</label>
      <input type="text" name="user" value={vacationItem.username} readOnly />

      <label htmlFor="startDate">Start Date</label>
      <input
        type="date"
        id="startDate"
        name="startDate"
        defaultValue={moment(vacationItem.startDate).format('YYYY-MM-DD')}
        readOnly
      />

      <label htmlFor="endDate">End Date</label>
      <input
        type="date"
        id="endDate"
        name="endDate"
        defaultValue={moment(vacationItem.endDate).format('YYYY-MM-DD')}
        readOnly
      />

      <label htmlFor="status">Decision</label>
      <select id="status" name="status" defaultValue="Pending">
        <option value="Pending" disabled>Pending</option>
        <option value="Approved">Approve</option>
        <option value="Denied">Deny</option>
      </select>

      <button type="submit">Submit Decision</button>
    </Form>
  );
};

export default Edit;
