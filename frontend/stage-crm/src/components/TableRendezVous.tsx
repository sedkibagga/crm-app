import { FC } from "react";

export type RendezVousType = { 
    id:string,
    nom_prenom : string , 
    date : string , 
    id_commercial : string,
    heure: string,
    localisation:string,
    num_tel: string,
    statut: string
}

const TableRendezVous: FC<RendezVousType> = ({ id, nom_prenom, date, localisation, id_commercial, heure, num_tel, statut}) => {

    return (
        <table className="table">
            <thead>
                <tr>
                    <th className="col-2" scope="col">nom_prenom</th>
                    <th className="col-2" scope="col">date</th>
                    <th className="col-2">Heure</th>
                    <th className="col-2">localisation</th>
                    <th className="col-2">Numéro téléphone</th>
                    <th className="col-2" scope="col">Commercial</th>
                    <th className="col-2">Statut</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>{nom_prenom}</td>
                    <td>{date}</td>
                    <td>{heure}</td>
                    <td>{localisation}</td>
                    <td>{num_tel}</td>
                    <td>{id_commercial}</td>
                    <td>{statut}</td>
                </tr>
            </tbody>
        </table>
    );
};

export default TableRendezVous;
