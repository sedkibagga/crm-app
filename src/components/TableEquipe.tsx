import { FC } from "react";

export type EquipesType = { 
    id_equipe:string,
    secteur : string , 
    lieu : string , 
    nom : string , 
    id_chefEquipe : string , 
    onDelete: (id_equipe: string) => void;
}

const TableEquipes: FC<EquipesType> = ({ secteur, lieu, nom, id_chefEquipe, id_equipe, onDelete }) => {
    const handleDelete = () => {
        if (window.confirm('Are you sure you want to delete this equipe?')) {
          onDelete(id_equipe); 
        }
    };
    return (
        <table className="table">
        <thead>
            <tr>
            <th className="col-2" scope="col">nom</th>
            <th className="col-2" scope="col">secteur</th>
            <th className="col-2" scope="col">lieu</th>
            
            <th className="col-2" scope="col">Chef Equipe</th>
            <th className="col-2" scope="col">Actions</th>
            </tr>
        </thead>
        <tbody>
                <tr>
                <td>{nom}</td>
                <td>{secteur}</td>
                <td>{lieu}</td>
                
                <td>{id_chefEquipe}</td>
                <td><button className="btn btn-danger" onClick={handleDelete}>Delete</button></td>
            </tr>
        </tbody>
        </table>
    );
};

export default TableEquipes;
