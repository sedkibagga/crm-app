import { FC } from "react";

export type PVTypes = {
    secteur_activite : string , 
    localisation : string , 
    nom : string , 
    prenom : string , 
    num_tel : string , 
    decision: string
}

const TablePV: FC<PVTypes> = ({ secteur_activite, localisation, nom, prenom , num_tel, decision }) => {
    return (
        <table className="table">
            <thead>
                <tr>
                <th className="col-2" scope="col">nom</th>
                <th className="col-2" scope="col">Prenom</th>
                <th className="col-2" scope="col">secteur d'activite</th>
                <th className="col-2" scope="col">localisation</th>
                <th className="col-2" scope="col">Numéro téléphone</th>
                <th className="col-2" scope="col">Décision</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>{nom}</td>
                    <td>{prenom}</td>
                    <td>{secteur_activite}</td>
                    <td>{localisation}</td>
                    <td>{num_tel}</td>
                    <td>{decision}</td>
                </tr>
            </tbody>
        </table>
    );
};

export default TablePV;
