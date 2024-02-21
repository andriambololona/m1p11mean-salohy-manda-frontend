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

  api_host:'http://localhost:3000',

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
  create_service_uri:"/api/service/manager/create",
  add_upload_abmform_uri:""
};
