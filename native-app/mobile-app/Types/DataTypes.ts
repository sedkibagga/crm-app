

export type loginUserType = {
    email: string,
    password: string
}

export type getPointDeVente = {
    id : string,
    nom: string,
    prenom: string,
    secteur_activite: string,
    num_tel: number,
    localisation: string,
    decision: string
}

export type ajoute_point_de_vente = {
    nom: string
    prenom: string
    secteur_activite: string
    num_tel: number
    localisation: string
    decision: string
}

export type getRendezVous = {
    id : string,
    Nom_Prenom: string,
    date: Date,
    localisation: string,
    num_tel: number,
    heure: string,
    statut?: string
}

export type UpdateRendezVous = {
    Nom_Prenom?: string,
    date?: Date,
    localisation?: string,
    num_tel?: number,
    heure?: string,
    statut?: string
}

export type updatePointDeVente = {
    nom?: string
    prenom?: string
    secteur_activite?: string
    num_tel?: number
    localisation?: string
    decision?: string
}