export const ROLES = {
  ADMIN: "admin",
  EDITOR: "editor",
};

const RESOURCES = ["media", "news", "activities", "research"];
const ACTIONS = ["read", "create", "update", "delete"];

export const ALL_PERMISSIONS = RESOURCES.flatMap((resource) =>
  ACTIONS.map((action) => `${resource}.${action}`)
);

export const PERMISSIONS = Object.fromEntries(
  RESOURCES.map((resource) => [
    resource,
    Object.fromEntries(
      ACTIONS.map((action) => [`${resource}.${action}`, `${resource}.${action}`])
    ),
  ])
);

const rolePermissions = {
  [ROLES.ADMIN]: ALL_PERMISSIONS,
  [ROLES.EDITOR]: RESOURCES.flatMap((resource) =>
    ["read", "create", "update"].map((action) => `${resource}.${action}`)
  ),
};

export function getPermissionsForRole(role) {
  return role ? rolePermissions[role] || [] : [];
}

export function hasPermission(role, permission) {
  if (!role || !permission) return false;
  if (role === ROLES.ADMIN) return true;
  return rolePermissions[role]?.includes(permission) ?? false;
}
