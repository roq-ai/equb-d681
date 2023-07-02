const mapping: Record<string, string> = {
  'finance-sharings': 'finance_sharing',
  memberships: 'membership',
  organizations: 'organization',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
