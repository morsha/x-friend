import { useState } from 'react';

function usePost(url: string) {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // post 函数接受一个 body 参数，它是要发送的 JSON 数据
  const post = async (body: any) => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem('accessToken');
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(body)
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const result = await response.json();
      setData(result);
      return result;
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  return { post, data, isLoading };
}

export default usePost;
