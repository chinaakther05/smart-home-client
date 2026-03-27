import { useQuery } from '@tanstack/react-query';
import useAuth from './useAuth';
import useAxiosSecure from './useAxiosSecure';


const UseRole = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { isLoading: roleLoading, data: roleData } = useQuery({
    queryKey: ['user-role', user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${user.email}/role`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  const role = roleData?.role || 'user';
  return { role, roleLoading };
};

export default UseRole;
