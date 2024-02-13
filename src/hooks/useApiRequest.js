import { logoutUserRequest } from '@/store/reducers/auth-reducer';
import { showFaliureToast } from '@/utils/toast-helpers';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const useApiRequest = (apiFunction) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    try {
      dispatch(logoutUserRequest()).then(() => navigate("/sign-in"));
    } catch (error) {
      console.log(error);
    }
  }

  const makeApiRequest = async (params) => {
    try {
      const result = await dispatch(apiFunction(params));
      return [result, null];
    } catch (err) {
      console.log(`Error at API call : `, err)
      showFaliureToast(err?.response?.data?.message)
      if (err?.response?.data?.message === 'User not found') {
        handleLogout();
      }
      return [null, err];
    }
  };

  return { makeApiRequest };
};

export default useApiRequest;
