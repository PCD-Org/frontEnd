export const ROLES = {
  SUPERADMIN: "superadmin",
  ADMIN: "admin",
  EDITOR: "editor",
};

const RESOURCES = ["media", "news", "activities", "research", "impact-statistics", "inquiries"];
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
  [ROLES.SUPERADMIN]: ALL_PERMISSIONS,
  [ROLES.ADMIN]: ALL_PERMISSIONS,
  [ROLES.EDITOR]: RESOURCES.flatMap((resource) =>
    ["read", "create", "update"].map((action) => `${resource}.${action}`)
  ),
};

export function getPermissionsForRole(role) {
  if (!role) return ALL_PERMISSIONS;
  const normalized = String(role).toLowerCase();
  if (normalized === "admin" || normalized === "superadmin") return ALL_PERMISSIONS;
  return rolePermissions[normalized] || rolePermissions[role] || ALL_PERMISSIONS;
}

export function hasPermission(role, permission) {
  if (!permission) return true;
  if (!role) return true;
  const normalized = String(role).toLowerCase();
  if (normalized === "admin" || normalized === "superadmin") return true;
  return (
    rolePermissions[normalized]?.includes(permission) ??
    rolePermissions[role]?.includes(permission) ??
    true
  );
}

