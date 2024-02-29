/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  auth_strategy_name: 'jwt',
  favorisClient: 'pages/favoris',

  //api_host:'https://salon-beaute-backend.onrender.com',
  api_host:'http://localhost:3000',

  register_uri:'/api/auth/signup',
  generate_token_uri: '/api/user/token',
  refresh_token_uri:'/api/auth/refreshtoken',
  logout_uri: "/api/user/logout",
  login_uri: '/api/auth/signin',
  getTempsTravailMoyen : '/api/user/tempsTravail',
  getAllPersonnel_uri:'/api/user/manager/allPersonnel',
  getAllersonnelEmploye_uri:'/api/user/client/allPersonnelEmploye',
  update_status:'/api/user/manager/update_status',
  upload_moneygram_facture: "/api/moneygram/recu/upload",
  getAllService_uri:"/api/service/manager/allService",
  getAllServiceNotPaginate_uri:"/api/service/manager/getAll",
  create_service_uri:"/api/service/manager/create",
  update_service_uri:"/api/service/manager/updateService",
  delete_service_uri:"/api/service/manager/deleteService",
  add_upload_abmform_uri:"",
  update_preference_uri:"/api/user/preference",
  createCompte_uri:"/api/user/compte",
  profile_uri: "/api/user/profile",
  horaireTravail_uri: "/api/user/horaireTravail",
  /* Rendez-vous */
  getRendezVous: "/api/rendezVous/",
  deleteRendezVous: "/api/rendezVous",
  create_rendezVous_uri: "/api/rendezVous/",
  updateRendezVous: "/api/rendezVous/",
  createPrestationFromRendezVous: "/api/rendezVous/create-prestation",

  /* ----------- */
  /* Prestation */
  chiffreAffaireJour_uri: "/api/prestation/chiffre_affaire",
  chiffreAffaireMois_uri: "/api/prestation/chiffre_affaire",
  benefice_uri: "/api/prestation/benefice",
  paiement_uri:"/api/prestation/paiement",
  finAllPrestation_uri:"/api/prestation",

  /* ----------- */
  /* Depense */
  addDepense_uri:"/api/depense",
  getAllDepense_uri:"/api/depense",
  /* Service */
  add_promotion_uri: "/api/service/promotion",
  find_service_uri: "/api/service",
  /* ----------- */

};
