import { useRef, useState, useEffect } from 'react';
import { faCheck, faTimes, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link, Form, useActionData } from 'react-router-dom';
import axiosPublic from '../api/axios';

const USER_REGEX = /^[A-Za-z][A-Za-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const EMAIL_REGEX = /^[\w.-]+@([\w-]+\.)+[\w-]{2,4}$/;

/**
 * Router action — handles registration form submission.
 */
export const registerAction = async ({ request }) => {
  const formData = await request.formData();
  const user = formData.get('user');
  const fname = formData.get('fname');
  const lname = formData.get('lname');
  const email = formData.get('email');
  const pwd = formData.get('pwd');

  // Server-side validation (client-side is for UX only)
  if (!USER_REGEX.test(user) || !PWD_REGEX.test(pwd) || !EMAIL_REGEX.test(email)) {
    return { error: 'Invalid Entry' };
  }

  try {
    await axiosPublic.post(
      '/register',
      { user, fname, lname, email, pwd },
      { headers: { 'Content-Type': 'application/json' }, withCredentials: true },
    );
    return { success: true };
  } catch (err) {
    if (!err?.response) return { error: 'No Server Response' };
    if (err.response?.status === 409) return { error: 'Username Taken' };
    return { error: 'Registration Failed' };
  }
};

const Register = () => {
  const actionData = useActionData();
  const userRef = useRef();
  const fnameRef = useRef();
  const lnameRef = useRef();
  const emailRef = useRef();

  // ── Client-side validation state ──────────────────────────────────
  const [user, setUser] = useState('');
  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  const [fname, setFName] = useState('');
  const [lname, setLName] = useState('');

  const [email, setEmail] = useState('');
  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);

  const [pwd, setPwd] = useState('');
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [matchPwd, setMatchPwd] = useState('');
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  useEffect(() => {
    document.title = 'Register page';
    userRef.current?.focus();
  }, []);

  useEffect(() => setValidName(USER_REGEX.test(user)), [user]);
  useEffect(() => setValidEmail(EMAIL_REGEX.test(email)), [email]);
  useEffect(() => {
    setValidPwd(PWD_REGEX.test(pwd));
    setValidMatch(pwd === matchPwd);
  }, [pwd, matchPwd]);

  // Reset fields on success
  useEffect(() => {
    if (actionData?.success) {
      setUser('');
      setFName('');
      setLName('');
      setEmail('');
      setPwd('');
      setMatchPwd('');
    }
  }, [actionData]);

  if (actionData?.success) {
    return (
      <section>
        <h1>Success!</h1>
        <p>
          <Link to="/login">Sign in</Link>
        </p>
      </section>
    );
  }

  return (
    <section>
      {actionData?.error && (
        <p className="errmsg" aria-live="assertive">
          {actionData.error}
        </p>
      )}
      <h1>Register</h1>
      <Form method="post">
        {/* Username */}
        <label htmlFor="username">
          Username:
          <FontAwesomeIcon icon={faCheck} className={validName ? 'valid' : 'hide'} />
          <FontAwesomeIcon icon={faTimes} className={validName || !user ? 'hide' : 'invalid'} />
        </label>
        <input
          type="text"
          id="username"
          name="user"
          placeholder="Enter your username"
          ref={userRef}
          autoComplete="off"
          onChange={(e) => setUser(e.target.value)}
          value={user}
          required
          aria-invalid={!validName}
          aria-describedby="uidnote"
          onFocus={() => setUserFocus(true)}
          onBlur={() => setUserFocus(false)}
        />
        <p id="uidnote" className={userFocus && user && !validName ? 'instructions' : 'offscreen'}>
          <FontAwesomeIcon icon={faInfoCircle} />
          4 to 24 characters. Must begin with a letter. Letters, numbers, underscores, hyphens allowed.
        </p>

        {/* First name */}
        <label htmlFor="fname">First name:</label>
        <input
          type="text"
          id="fname"
          name="fname"
          placeholder="Enter your first name"
          ref={fnameRef}
          onChange={(e) => setFName(e.target.value)}
          value={fname}
          required
        />

        {/* Last name */}
        <label htmlFor="lname">Last name:</label>
        <input
          type="text"
          id="lname"
          name="lname"
          placeholder="Enter your last name"
          ref={lnameRef}
          onChange={(e) => setLName(e.target.value)}
          value={lname}
          required
        />

        {/* Email */}
        <label htmlFor="email">
          Email:
          <FontAwesomeIcon icon={faCheck} className={validEmail ? 'valid' : 'hide'} />
          <FontAwesomeIcon icon={faTimes} className={validEmail || !email ? 'hide' : 'invalid'} />
        </label>
        <input
          type="text"
          id="email"
          name="email"
          placeholder="Enter your email"
          ref={emailRef}
          autoComplete="off"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          required
          aria-invalid={!validEmail}
          aria-describedby="emailnote"
          onFocus={() => setEmailFocus(true)}
          onBlur={() => setEmailFocus(false)}
        />
        <p id="emailnote" className={emailFocus && email && !validEmail ? 'instructions' : 'offscreen'}>
          <FontAwesomeIcon icon={faInfoCircle} />
          Enter a valid email.
        </p>

        {/* Password */}
        <label htmlFor="password">
          Password:
          <FontAwesomeIcon icon={faCheck} className={validPwd ? 'valid' : 'hide'} />
          <FontAwesomeIcon icon={faTimes} className={validPwd || !pwd ? 'hide' : 'invalid'} />
        </label>
        <input
          type="password"
          id="password"
          name="pwd"
          placeholder="Enter your password"
          onChange={(e) => setPwd(e.target.value)}
          value={pwd}
          required
          aria-invalid={!validPwd}
          aria-describedby="pwdnote"
          onFocus={() => setPwdFocus(true)}
          onBlur={() => setPwdFocus(false)}
        />
        <p id="pwdnote" className={pwdFocus && !validPwd ? 'instructions' : 'offscreen'}>
          <FontAwesomeIcon icon={faInfoCircle} />
          8 to 24 characters. Must include uppercase and lowercase letters, a number and a special character (!@#$%).
        </p>

        {/* Confirm password */}
        <label htmlFor="confirm_pwd">
          Confirm Password:
          <FontAwesomeIcon icon={faCheck} className={validMatch && matchPwd ? 'valid' : 'hide'} />
          <FontAwesomeIcon icon={faTimes} className={validMatch || !matchPwd ? 'hide' : 'invalid'} />
        </label>
        <input
          type="password"
          id="confirm_pwd"
          placeholder="Confirm your password"
          onChange={(e) => setMatchPwd(e.target.value)}
          value={matchPwd}
          required
          aria-invalid={!validMatch}
          aria-describedby="confirmnote"
          onFocus={() => setMatchFocus(true)}
          onBlur={() => setMatchFocus(false)}
        />
        <p id="confirmnote" className={matchFocus && !validMatch ? 'instructions' : 'offscreen'}>
          <FontAwesomeIcon icon={faInfoCircle} />
          Must match the first password input field.
        </p>

        <button disabled={!validName || !validPwd || !validMatch || !validEmail}>
          Sign Up
        </button>
      </Form>
      <p>
        Already have an account?&nbsp;
        <span className="line">
          <Link to="/login">Sign in</Link>
        </span>
      </p>
    </section>
  );
};

export default Register;
