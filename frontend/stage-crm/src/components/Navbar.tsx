import Logout from '@/pages/LogoutPage';
import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <a className="navbar-brand">Khallasli</a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" id="dropdownMenu1" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Admin
              </a>
              <ul className="dropdown-menu" aria-labelledby="dropdownMenu1">
                <li><a className="dropdown-item" href="/dashboard/users">Users</a></li>
                <li><hr className="dropdown-divider" /></li>
                <li><a className="dropdown-item" href="/dashboard/equipes">Equipes</a></li>
                <li><hr className="dropdown-divider" /></li>
                <li><a className="dropdown-item" href="/dashboard/pointDeVentes">Points de vente</a></li>
              </ul>
            </li>

            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" id="dropdownMenu2" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Sédentaire
              </a>
              <ul className="dropdown-menu" aria-labelledby="dropdownMenu2">
                <li><a className="dropdown-item" href="/dashboard/rendezVous">Rendez-vous</a></li>
                <li><hr className="dropdown-divider" /></li>
                <li><a className="dropdown-item" href="/dashboard/pointDeVentes">Points de vente</a></li>
              </ul>
            </li>

            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" id="dropdownMenu3" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Chef d'Equipe
              </a>
              <ul className="dropdown-menu" aria-labelledby="dropdownMenu3">
                <li><a className="dropdown-item" href="/dashboard/membre">Ajouter membre</a></li>
                <li><hr className="dropdown-divider" /></li>
                <li><a className="dropdown-item" href="/dashboard/pointDeVentes">Points de vente</a></li>
              </ul>
            </li>

          </ul>
          <div className="d-flex">
            <Logout/>
          </div>
        </div>
      </div>
    </nav>
  );
}
