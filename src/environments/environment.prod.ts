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

 //api_host:'http://localhost:51943',
  //api_host:'http://192.168.210.103:50943',
  //api_host:'http://192.168.210.2:51943',
  //api_host:'http://localhost:51943',
  //api_host:'http://192.168.210.103:51943',//Dev
  //api_host:'http://192.168.210.104:61177',
  api_host:'http://localhost:3000',
  //api_host:'https://accescash-backend', //Prod
  //api_host:'http://192.168.210.2:56140',
  generate_token_uri: '/api/user/token',
  register_uri:'/api/user/test/addUser',
  logout_uri: "/api/user/logout",
  login_uri: '/api/auth/signin',

  upload_moneygram_facture: "/api/moneygram/recu/upload",
  add_upload_abmform_uri:""
};
