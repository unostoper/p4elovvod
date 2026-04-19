export const getAdminToken = () => sessionStorage.getItem("admin_token");
export const setAdminToken = (t: string) => sessionStorage.setItem("admin_token", t);
export const clearAdminToken = () => sessionStorage.removeItem("admin_token");
export const isAdmin = () => Boolean(getAdminToken());
