"use client";

import { createEquipe, fetchUsersApi } from "@/apis/apis";
import Navbar from "@/components/Navbar";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const addEquipe = () => {
    const [nom, setNom] = useState("");
    const [secteur, setSecteur] = useState("");
    const [lieu, setLieu] = useState("");
    const [id_chefEquipe, setChefEquipe] = useState("");
    const [chefsEquipe, setChefsEquipe] = useState<any[]>([]);
    const router = useRouter()

    const handleSecteurChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSecteur(e.target.value);
    };
    
    const handleLieuChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setLieu(event.target.value);
    };
    
    const handleNomChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNom(event.target.value);
    };
    
    const handleChefEquipeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setChefEquipe(event.target.value);
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            await createEquipe(nom, secteur, lieu, id_chefEquipe);
            alert("Equipe Created");
            router.push('/dashboard/equipes');
        } catch (error) {
          console.error("There was an error creating the equipe!", error);
        }
      };

      useEffect(() => {
        const fetchChefsEquipe = async () => {
            try {
                const users = await fetchUsersApi();
                const chefs = users.filter((user: any) => user.role === "chef_equipe");
                setChefsEquipe(chefs);
            } catch (error) {
                console.error("Error fetching chefs d'équipe:", error);
            }
        };
        fetchChefsEquipe();
    }, []);

    return (
        <div>
            <Navbar/>
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
                    <label htmlFor="exampleInputPrenom" className="form-label">Lieu</label>
                    <input
                    value={lieu}
                    type="text"
                    className="form-control"
                    id="exampleInputPrenom"
                    onChange={handleLieuChange}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Secteur</label>
                    <input
                    value={secteur}
                    type="text"
                    className="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    onChange={handleSecteurChange}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="chefEquipe" className="form-label">Chef Equipe</label>
                        <select value={id_chefEquipe} onChange={handleChefEquipeChange} className="form-select" id="chefEquipe">
                            <option value="">Select Chef Equipe</option>
                                {chefsEquipe.map((chef) => (
                                    <option key={chef.id} value={chef.id}>
                                        {chef.nom} {chef.prenom}
                                    </option>
                                ))}
                        </select>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
            </div>
        </div>
        </div>
    );
    }
    
export default addEquipe;