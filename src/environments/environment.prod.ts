/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
export const environment = {
  production: true,
  auth_strategy_name: 'jwt',
  client_id: 'a2934fa2-6f7e-4ac9-8210-681814ac86c4',
  favorisClient: 'pages/favoris',

  // api_host:'https://salon-beaute-backend.onrender.com',
  api_host:'http://localhost:8080',

  generate_token_uri: '/api/user/token',
  refresh_token_uri:'/api/auth/refreshtoken',
  register_uri:'/api/user/test/addUser',
  logout_uri: "/api/user/logout",
  login_uri: '/api/auth/signin',
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
  /* Rendez-vous */
  getRendezVous: "/api/rendezVous/",
  deleteRendezVous: "/api/rendezVous/",
  createRendezVous: "/api/rendezVous/",
  create_rendezVous_uri: "/api/rendezVous/",
  updateRendezVous: "/api/rendezVous/",
  createPrestationFromRendezVous: "/api/rendezVous/create-prestation",
  /* ----------- */
};
