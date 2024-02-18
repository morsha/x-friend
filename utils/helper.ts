const getTokenFromAuthHeader = (authHeader: string | null) => {
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return null;
  }

  return authHeader.split(" ")[1];
};

export { getTokenFromAuthHeader };
