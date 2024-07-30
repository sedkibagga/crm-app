"use client";

import { createEquipe, createRendezVous, fetchUsersApi } from "@/apis/apis";
import Navbar from "@/components/Navbar";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const AddRendezVous = () => {
    const [nom_prenom, setNomPrenom] = useState("");
    const [date, setdate] = useState("");
    const [localisation, setlocalisation] = useState("");
    const [id_commercial, setCommercial] = useState("");
    const [heure, setHeure] = useState("");
    const [num_tel, setNumTel] = useState("");
    const [commercials, setCommercials] = useState<any[]>([]);
    const router = useRouter()

    const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setdate(e.target.value);
    };
    
    const handleLocalisationChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setlocalisation(event.target.value);
    };
    
    const handleNomPrenomChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNomPrenom(event.target.value);
    };
    
    const handleCommercialChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setCommercial(event.target.value);
    };

    const handleHeureChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setHeure(event.target.value);
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
            await createRendezVous(nom_prenom, date, localisation, heure, numTelAsNumber, id_commercial);
            alert("Rendez Vous Created");
            router.push('/dashboard/rendezVous');
        } catch (error) {
          console.error("There was an error creating the equipe!", error);
        }
      };

      useEffect(() => {
        const fetchCommercials = async () => {
            try {
                const users = await fetchUsersApi();
                const commercials = users.filter((user: any) => user.role === "commercial");
                setCommercials(commercials);
            } catch (error) {
                console.error("Error fetching chefs d'équipe:", error);
            }
        };
        fetchCommercials();
    }, []);

    return (
        <div>
            <Navbar/>
            <div style={{ display: "flex", justifyContent: "center" }}>
        <div className="card" style={{ width: "750px", marginTop: "20px" }}>
          <div className="card-body">
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="exampleInputNom" className="form-label">Nom Prenom</label>
                    <input
                    value={nom_prenom}
                    type="text"
                    className="form-control"
                    id="exampleInputNom"
                    onChange={handleNomPrenomChange}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPrenom" className="form-label">localisation</label>
                    <input
                    value={localisation}
                    type="text"
                    className="form-control"
                    id="exampleInputPrenom"
                    onChange={handleLocalisationChange}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="date" className="form-label">date</label>
                    <input
                    value={date}
                    type="date"
                    className="form-control"
                    id="date"
                    aria-describedby="date"
                    onChange={handleDateChange}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="date" className="form-label">heure</label>
                    <input
                    value={heure}
                    type="text"
                    className="form-control"
                    id="heure"
                    aria-describedby="heure"
                    onChange={handleHeureChange}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="date" className="form-label">Numéro téléphone</label>
                    <input
                    value={num_tel}
                    type="text"
                    className="form-control"
                    id="num_tel"
                    aria-describedby="num_tel"
                    onChange={handleNumTelChange}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="commercial" className="form-label">Commercial</label>
                        <select value={id_commercial} onChange={handleCommercialChange} className="form-select" id="commercial">
                            <option value="">Select Commercial</option>
                                {commercials.map((commercial) => (
                                    <option key={commercial.id} value={commercial.id}>
                                        {commercial.nom} {commercial.prenom}
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
    
export default AddRendezVous;