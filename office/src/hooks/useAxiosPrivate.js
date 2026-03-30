import { axiosPrivate } from '../api/axios';

/**
 * Thin wrapper kept for backward-compatibility.
 *
 * In the original codebase this hook set up per-render interceptors.
 * That pattern caused duplicate interceptors on every re-render and made
 * it impossible to use the instance inside Router loaders/actions.
 *
 * Interceptors now live at the module level in `api/axios.js`, so this
 * hook simply returns the pre-configured instance.
 */
const useAxiosPrivate = () => axiosPrivate;

export default useAxiosPrivate;
