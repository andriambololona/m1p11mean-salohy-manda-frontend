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
    name: 'Gestions des preferences',
    icon:'refresh',
    children: [
      {
        name: 'Green',
        children: [{name: 'Broccoli',link:'/pages/manager'}, {name: 'Brussels sprouts',link:'/pages/manager'}],
      },
      {
        name: 'Orange',
        children: [{name: 'Pumpkins'}, {name: 'Carrots'}],
      },
    ],
  },
];

  export const TREE_DATA_EMPLOYE: FoodNode[] = [
  {
    name: 'Rendez-vous',
    icon:'schedule',
    children: [{name: 'Listes',link:'/pages/client',icon:'assignment_add'}]
  },
  {
    name: 'Gestion',
    icon:'work',
    children: [
      {name: 'Profil',link:'/pages/manager',icon:'manage_account'},
      {name: 'Horaire de travail',link:'/pages/manager',icon:'timer'},
    ],
  },

  {
    name: 'Suivi',
    icon:'preview',
    children: [
      {name: 'tâches',link:'/pages/manager',icon:'task'}, {name: 'Commission',link:'/pages/manager',icon:'payments'},
    ]
  },
];

export const TREE_DATA_MANAGER: FoodNode[] = [
  {
    name: 'Gestion',
    icon:'schedule',
    children: [{name: 'Personnels',link:'/pages/manager/personnel',icon:'manage_accounts'},
     {name: 'Services',link:'/pages/manager/service',icon:'browse_activity'}],
  },
  {
    name: 'Statistiques',
    icon:'query_stats',
    children: [
      {
        name: 'stat1',
        children: [{name: 'Broccoli',link:'/pages/manager'}, {name: 'Brussels sprouts',link:'/pages/manager'}],
      },
      {
        name: 'stat2',
        children: [{name: 'Pumpkins'}, {name: 'Carrots'}],
      },
    ],
  },

];
