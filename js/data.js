/* =========================================================
   DONNÉES DU SITE — c'est ici qu'on modifie le contenu.
   ---------------------------------------------------------
   - direction : contact principal de la holding
   - entreprises : une entrée par société du groupe
       statut : "ouvert" ou "bientot"
       icone  : bateau | hotel | bouclier | maison | voiture | cocktail | outils | avion | licorne | balance
   Les entreprises ci-dessous sont des EXEMPLES à remplacer.
   ========================================================= */

window.ISLAND_DATA = {
  direction: {
    nom: "Direction Island Holding",
    role: "Siège · Cayo Perico",
    responsable: "À compléter",
    telephone: "555-0100",
    horaires: "Sur rendez-vous"
  },

  entreprises: [
    {
      nom: "Perico Marine",
      secteur: "Transport",
      statut: "ouvert",
      icone: "bateau",
      description: "Liaisons maritimes entre l'île et Los Santos, transport de passagers et de marchandises.",
      services: ["Navettes île ↔ continent", "Fret et livraisons", "Location de bateaux"],
      responsable: "À compléter",
      telephone: "555-0101",
      horaires: "Tous les jours"
    },
    {
      nom: "Lagoon Resort",
      secteur: "Hôtellerie",
      statut: "ouvert",
      icone: "hotel",
      description: "Hébergement, événements privés et restauration face au lagon.",
      services: ["Réservation de séjours", "Soirées privées", "Restaurant & bar"],
      responsable: "À compléter",
      telephone: "555-0102",
      horaires: "18h – 4h"
    },
    {
      nom: "Unicorn",
      secteur: "Divertissement",
      statut: "ouvert",
      icone: "licorne",
      description: "La boîte de nuit du groupe : musique, ambiance et soirées jusqu'au bout de la nuit.",
      services: ["Soirées & DJ", "Carré VIP et réservations", "Privatisation pour événements"],
      responsable: "Tony",
      telephone: "555-0105",
      horaires: "Le soir"
    },
    {
      nom: "Island Cabinet",
      secteur: "Juridique",
      statut: "ouvert",
      icone: "balance",
      description: "Le cabinet d'avocats du groupe : conseil, défense et accompagnement juridique des particuliers comme des entreprises.",
      services: ["Défense pénale", "Conseil juridique", "Contrats et droit des entreprises"],
      responsable: "Max Carter",
      telephone: "555-0106",
      horaires: "Sur rendez-vous"
    },
    {
      nom: "Island Sécurité",
      secteur: "Sécurité",
      statut: "ouvert",
      icone: "bouclier",
      description: "Protection de biens, d'événements et de personnes, sur l'île comme en ville.",
      services: ["Sécurité événementielle", "Gardiennage", "Escorte"],
      responsable: "À compléter",
      telephone: "555-0103",
      horaires: "24h/24"
    },
    {
      nom: "Perico Immobilier",
      secteur: "Immobilier",
      statut: "bientot",
      icone: "maison",
      description: "Vente et location de propriétés, bureaux et entrepôts.",
      services: ["Vente & location", "Gestion de biens", "Estimation"],
      responsable: "À compléter",
      telephone: "555-0104",
      horaires: "Prochainement"
    }
  ]
};
