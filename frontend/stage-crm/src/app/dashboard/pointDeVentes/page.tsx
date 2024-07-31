"use client";

import { getAllPointDeVentes } from "@/apis/apis";
import Navbar from "@/components/Navbar";
import TablePV from "@/components/TablePV";
import { useEffect, useState } from "react";


const PointDeVentes = () => {
    const [pvs, setPVs] = useState<any[]>([]);

    const fetchPV = async () => {
        try{
            const data = await getAllPointDeVentes()
            setPVs(data)
            console.log(data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchPV();
      }, []);

    return (
        <div>
            <Navbar/>
            <div className="container mt-4">
                <div className="row">
                    {pvs.map(pv => (
                        <TablePV key={pv.id} secteur_activite={pv.secteur_activite} localisation={pv.localisation} nom={pv.nom} prenom={pv.prenom} num_tel={pv.num_tel} decision={pv.decision} />
                    ))}
                </div>
            </div>
        </div>
    );
}
 
export default PointDeVentes;