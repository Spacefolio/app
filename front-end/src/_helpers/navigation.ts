export const CheckCurrentPage = (location: any, checkUri: string) => {
  const urlChecker = new RegExp(`^${checkUri}`);
  return urlChecker.test(location.pathname) == true;
};
