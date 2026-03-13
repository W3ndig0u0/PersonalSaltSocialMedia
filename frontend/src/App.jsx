import { useEffect, useState } from 'react';
import Register from './pages/register';
import { getAllUsers } from './service/api';

function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const data = await getAllUsers();
        setUsers(data);
      } catch (error) {
        console.error("No users found:", error);
      }
    };

    loadUsers();
  }, []);

  return (
    <div>
      {users.length > 0 ? (
        <ul>
          {users.map((user) => (
            <li key={user.id}>
              <strong>username:</strong> {user.username}
            </li>
          ))}
        </ul>
      ) : (
        <p>No users found.</p>
      )}
      <Register />
    </div>
  );
}

export default App;
