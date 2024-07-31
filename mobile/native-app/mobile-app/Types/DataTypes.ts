

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
export type updateProfile = {
    nom?: string
    prenom?: string
    email?: string
   
  }

  export type updatePassword = {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export type UserType = {
    id : string,
    nom : string,
    prenom : string,
    email : string,
    password : string,
    role : string , 
    num_tel : number
}
export type getAllComments = {
    id_comment  : string,
    comment : string,
    name : string ,
    user : UserType
}

export type ajouteComment = {
    comment : string ,
    name : string 
}

export type modifierComment = {
    comment : string
}


  

