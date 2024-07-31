'use client'
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Table from "@/components/Table";
import { useRouter } from "next/navigation";
import { useSidebar } from "@/ContextPage/UserContext";
import { fetchUsersApi, deleteUserApi } from "@/apis/apis";

interface User {
  id: string;
  nom: string;
  prenom: string;
  email: string;
  num_tel: number;
}

export default function Users() {
  const [users, setUsers] = useState<User[]>([]);
  const { isOpen, setIsOpen } = useSidebar(); 
  const router = useRouter();

  const fetchUsers = async () => {
    try {
      const data = await fetchUsersApi();
      setUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const deleteUser = async (id: string) => {
    try {
      await deleteUserApi(id);
      fetchUsers();
    } catch (error) {
      console.error('There was an error deleting the user:', error);
    }
  };

  useEffect(() => {
    console.log("isOpen:", isOpen);
    fetchUsers();
  }, [isOpen]);

  const handleClick = () => {
    router.push('/dashboard/users/addUsers');
  };

  return (
    <div>
      <Navbar />
      <div className="container mt-4">
        <div className="row">
          {users.map(user => (
            <Table
              key={user.id}
              nom={user.nom}
              prenom={user.prenom}
              email={user.email}
              Num={user.num_tel}
              id={user.id}
              onDelete={deleteUser}
            />
          ))}
        </div>
        <button className="btn btn-primary" onClick={handleClick}>Add user</button>
      </div>
    </div>
  );
}
