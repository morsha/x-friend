import useSWR from 'swr';

// 这是一个自定义的 fetcher 函数，它从 localStorage 获取 accessToken
// 并且将它添加到请求的 Authorization 头部。
const fetchWithToken = (url: string) => {
  const token = localStorage.getItem('accessToken');
  return fetch(url, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  }).then(r => r.json());
};

// 自定义 Hook
function useAuthSwr(url: string) {
  const { data, error, mutate } = useSWR(url, fetchWithToken);

  return {
    data: data,
    isLoading: !error && !data,
    isError: error,
    mutate
  };
}

export default useAuthSwr;
