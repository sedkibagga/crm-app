'use client';

import Navbar from "@/components/Navbar";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { createUser as createUserApi } from "@/apis/apis"; // Import createUser function

const AddUsers = () => {
  const router = useRouter();
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [num_tel, setNumTel] = useState("");

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleNomChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNom(event.target.value);
  };

  const handlePrenomChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPrenom(event.target.value);
  };

  const handleRoleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setRole(event.target.value);
  };

  const handleNumTelChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNumTel(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const numTelAsNumber = parseInt(num_tel, 10);
      if (isNaN(numTelAsNumber) || !num_tel) {
        alert("Please enter a valid phone number.");
        return;
      }

      await createUserApi(nom, prenom, email, password, role, numTelAsNumber);

      alert("User Created");
      router.push('/dashboard/users');
    } catch (error) {
      console.error("There was an error creating the user!", error);
    }
  };

  return (
    <div>
      <Navbar />
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div className="card" style={{ width: "750px", marginTop: "20px" }}>
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="exampleInputNom" className="form-label">Nom</label>
                <input
                  value={nom}
                  type="text"
                  className="form-control"
                  id="exampleInputNom"
                  onChange={handleNomChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="exampleInputPrenom" className="form-label">Prénom</label>
                <input
                  value={prenom}
                  type="text"
                  className="form-control"
                  id="exampleInputPrenom"
                  onChange={handlePrenomChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                <input
                  value={email}
                  type="email"
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  onChange={handleEmailChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                <input
                  value={password}
                  type="password"
                  className="form-control"
                  id="exampleInputPassword1"
                  onChange={handlePasswordChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="exampleInputRole" className="form-label">Role</label>
                <select value={role} onChange={handleRoleChange} className="form-select" aria-label="Default select example">
                  <option value="">Choisir le rôle</option>
                  <option value="sedentaire">Sédentaire</option>
                  <option value="chef_equipe">Chef d'équipe</option>
                  <option value="commercial">Commercial</option>
                </select>
              </div>
              <div className="mb-3">
                <label htmlFor="exampleInputNumTel" className="form-label">Numéro Téléphone</label>
                <input
                  value={num_tel}
                  type="text"
                  className="form-control"
                  id="exampleInputNumTel"
                  onChange={handleNumTelChange}
                />
              </div>
              <button type="submit" className="btn btn-primary">Submit</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddUsers;
