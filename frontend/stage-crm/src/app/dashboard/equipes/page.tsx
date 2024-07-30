"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import { getAllEquipes, deleteEquipeApi } from "@/apis/apis";
import TableEquipes from "@/components/TableEquipe";
import { useRouter } from "next/navigation";


const Equipes = () => {
  const [equipes, setEquipes] = useState<any[]>([]);
  const router = useRouter();

  const fetchEquipes = async () => {
    try {
      const data = await getAllEquipes();
      setEquipes(data);
      console.log(data)
    } catch (error) {
      console.error('Error fetching equipes:', error);
    }
  };

  const deleteEquipe = async (id: string) => {
    try {
      await deleteEquipeApi(id);
      fetchEquipes();
    } catch (error) {
      console.error('There was an error deleting the Equipe:', error);
    }
  };

  const handleClick = () => {
    router.push('/dashboard/equipes/addEquipes');
  };

  useEffect(() => {
    fetchEquipes();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="container mt-4">
        <div className="row">
          {equipes.map (equipe => (
            <TableEquipes key={equipe.id_equipe} id_equipe={equipe.id_equipe} nom={equipe.nom} secteur={equipe.secteur} lieu={equipe.lieu}  id_chefEquipe={equipe.chefEquipe.nom + " " + equipe.chefEquipe.prenom} onDelete={deleteEquipe}/>
          ))}
        </div>
        <button className="btn btn-primary" onClick={handleClick}>Add equipe</button>
      </div>
    </div>
  );
};

export default Equipes;
