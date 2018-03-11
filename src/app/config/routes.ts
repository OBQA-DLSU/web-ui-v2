//Metadata
export interface RouteInfo {
  path: string;
  title: string;
  type: string;
  icontype: string;
  collapse?: string;
  children?: ChildrenItems[];
}

export interface ChildrenItems {
  path: string;
  title: string;
  ab: string;
  type?: string;
}

//Menu Items
const ADMIN: RouteInfo[] = [
  {
    path: '/admin/dashboard',
    title: 'Dashboard',
    type: 'link',
    icontype: 'dashboard'
  }
];

const COORDINATOR: RouteInfo[] = [
  {
    path: '/coordinator/dashboard',
    title: 'Dashboard',
    type: 'link',
    icontype: 'dashboard'
  }
];

const INSTRUCTOR: RouteInfo[] = [
  {
    path: '/instructor/dashboard',
    title: 'Dashboard',
    type: 'link',
    icontype: 'dashboard'
  }
];

const STUDENT: RouteInfo[] = [
  {
    path: '/student/dashboard',
    title: 'Dashboard',
    type: 'link',
    icontype: 'dashboard'
  }
];

const GUEST: RouteInfo[] = [
  {
    path: '/guest/dashboard',
    title: 'Dashboard',
    type: 'link',
    icontype: 'dashboard'
  }
]

export const ROUTES = {
  ADMIN: ADMIN,
  COORDINATOR: COORDINATOR,
  INSTRUCTOR: INSTRUCTOR,
  STUDENT: STUDENT,
  GUEST: GUEST
}
