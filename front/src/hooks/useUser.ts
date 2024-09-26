export const useUser = async (userId: string) => {
  const res = await fetch(`http://3.114.106.137/api/users/${userId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })

  const json = await res.json()

  return json
}
