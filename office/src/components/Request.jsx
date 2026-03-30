import { Form, useActionData } from 'react-router-dom';
import { axiosPrivate } from '../api/axios';
import { getAuth } from '../store/authStore';
import useAuth from '../hooks/useAuth';
import { useEffect } from 'react';

/**
 * Router action — submits a new vacation request.
 */
export const requestAction = async ({ request }) => {
  const formData = await request.formData();
  const user = formData.get('user');
  const startDate = formData.get('startDate');
  const endDate = formData.get('endDate');

  if (!startDate || !endDate) {
    return { error: 'Start and end dates are required.' };
  }

  try {
    await axiosPrivate.post('/request', { user, startDate, endDate });
    return { success: true };
  } catch (err) {
    if (!err?.response) return { error: 'No server response.' };
    return { error: 'Request failed.' };
  }
};

const Request = () => {
  const actionData = useActionData();
  const { auth } = useAuth();
  const username = auth?.username || auth?.user || '';

  useEffect(() => {
    document.title = 'Request a vacation';
  }, []);

  return (
    <Form className="requestForm" method="post">
      <h1>Create a request for vacation.</h1>

      {actionData?.error && (
        <p className="errmsg" aria-live="assertive">
          {actionData.error}
        </p>
      )}

      {actionData?.success && (
        <p className="successmsg" aria-live="polite">
          Vacation request submitted successfully!
        </p>
      )}

      <label htmlFor="username">
        Username:&nbsp;
        <input type="text" name="user" value={username} readOnly />
      </label>

      <label htmlFor="startDate">
        Start Date:&nbsp;
        <input type="date" id="startDate" name="startDate" required />
      </label>

      <label htmlFor="endDate">
        End Date:&nbsp;
        <input type="date" id="endDate" name="endDate" required />
      </label>

      <button type="submit">Submit</button>
    </Form>
  );
};

export default Request;
