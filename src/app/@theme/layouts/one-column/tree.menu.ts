export interface FoodNode {
  name: string;
  link?:string;
  icon?:string;
  children?: FoodNode[];
}

export interface ExampleFlatNode {
  expandable: boolean;
  name: string;
  level: number;
}

export const TREE_DATA_CLIENT: FoodNode[] = [
  {
    name: 'Rendez-vous',
    icon:'schedule',
    children: [
      {name: 'Prise de rendez-vous',link:'/pages/client/prise_rendez_vous',icon:'assignment_add'},
      {name: 'Historiques',link:'/pages/client/historique_rendez_vous',icon:'history'}],
  },
  {
    name: 'Paiement',
    icon:'payments',
    children: [
      {name: 'Prestations',link:'/pages/client/prestation',icon:'assignment_add'},
    ]
  },
  {
    name: 'Gestions des preferences',
    icon:'refresh',
    children: [
      {
        name: 'Service',
        link:'/pages/client/preference_service',icon:'assignment_add'
      },
      {
        name: 'Employe',
        link:'/pages/client/preference_employe',icon:'history'
      },
    ],
  },
];

  export const TREE_DATA_EMPLOYE: FoodNode[] = [
  {
    name: 'Rendez-vous',
    icon:'schedule',
    children: [{name: 'Suivi des taches',link:'/pages/employe/liste_rendez_vous',icon:'assignment_add'}]
  },
  {
    name: 'Profil',
    link:'/pages/employe/profil',
    icon:'manage_account',
    // icon:'work',
    // children: [
    //   {name: 'Profil',link:'/pages/manager',icon:'manage_account'},
    //   {name: 'Horaire de travail',link:'/pages/manager',icon:'timer'},
    // ],
  },

  {
    name: 'Suivi',
    icon:'preview',
    children: [
      {name: 'tâches et commision',link:'/pages/employe/suivi',icon:'task'}
    ]
  },
];

export const TREE_DATA_MANAGER: FoodNode[] = [
  {
    name: 'Gestion',
    icon:'schedule',
    children: [{name: 'Personnels',link:'/pages/manager/personnel',icon:'manage_accounts'},
     {name: 'Services',link:'/pages/manager/service',icon:'shop'},
     {name: 'Depenses',link:'/pages/manager/depense',icon:'payments'}
    ],

  },
  {
    name: 'Statistiques',
    icon:'query_stats',
    link: '/pages/manager/statistique'
    // children: [
    //   {
    //     name: 'stat1',
    //     children: [{name: 'Broccoli',link:'/pages/manager'}, {name: 'Brussels sprouts',link:'/pages/manager'}],
    //   },
    //   {
    //     name: 'stat2',
    //     children: [{name: 'Pumpkins'}, {name: 'Carrots'}],
    //   },
    // ],
  },

];
