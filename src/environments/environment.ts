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
  //logout_strategy_name: 'jwt_logout',

  client_id: 'a2934fa2-6f7e-4ac9-8210-681814ac86c4',
  favorisClient: 'pages/favoris',
  //api_host:'http://192.168.143.99:51943',
  api_host:'http://localhost:3000',
  // api_host:'http://192.168.210.103:50943',
  //api_host:'http://192.168.210.104:61177',
  register_uri:'/api/auth/signup',
  generate_token_uri: '/api/user/token',
  logout_uri: "/api/user/logout",
  login_uri: '/api/auth/signin',


  upload_moneygram_facture: "/api/moneygram/recu/upload",
  add_upload_abmform_uri:""
};
