"use client";

import { getAllRendezVous } from "@/apis/apis";
import Navbar from "@/components/Navbar";
import TableRendezVous from "@/components/TableRendezVous";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const RendezVous = () => {
    const [rendezVous, setRendezVous] = useState<any[]>([])
    const router = useRouter()

    const fetchRendezVous = async () => {
        try{
            const data = await getAllRendezVous()
            setRendezVous(data)
            console.log(data)
        } catch (error) {
            console.log(error)
        }
    }

    const handleClick = () => {
        router.push('/dashboard/rendezVous/addRendezVous');
    }

    useEffect(() => {
        fetchRendezVous();
      }, []);

    return (
        <div>
            <Navbar/>
            <div className="container mt-4">
                
                <div className="row">
                    {
                        rendezVous.map(rv => (
                            <TableRendezVous key={rv.id} id={rv.id} id_commercial={rv.commercial.nom + " " + rv.commercial.prenom} nom_prenom={rv.Nom_Prenom} date={rv.date} heure={rv.heure} statut={rv.statut} localisation={rv.localisation} num_tel={rv.num_tel} />
                        ))
                    }
                </div>
                <button className="btn btn-primary" onClick={handleClick}>Add rendez vous</button>
            </div>
        </div>
    );
}
 
export default RendezVous;