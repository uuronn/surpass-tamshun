export const useUser = async(userId: string) => {
    const res = await fetch(`http://localhost/api/users/${userId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      const json = await res.json()

      return json
}