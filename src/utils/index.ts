export const isUserAuthorized = (userRole: string, allowedRoles: string[]) => {
    return allowedRoles.includes(userRole);
};
