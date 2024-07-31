import { FC } from "react";

export type getUsers = {
  nom: string;
  prenom: string;
  email: string;
  Num: number;
  id: string;
  onDelete: (id: string) => void;
};

const Table: FC<getUsers> = ({ nom, prenom, email, Num, id, onDelete }) => {

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      onDelete(id); 
    }
  };

  return (
    <table className="table">
      <thead>
        <tr>
          <th className="col-2" scope="col">Nom</th>
          <th className="col-2" scope="col">Prenom</th>
          <th className="col-2" scope="col">Email</th>
          <th className="col-2" scope="col">Num</th>
          <th className="col-2" scope="col">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{nom}</td>
          <td>{prenom}</td>
          <td>{email}</td>
          <td>{Num}</td>
          <td><button className="btn btn-danger" onClick={handleDelete}>Delete</button></td>
        </tr>
      </tbody>
    </table>
  );
};

export default Table;
