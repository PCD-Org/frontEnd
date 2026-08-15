const tokens = {
  access: null,
  refresh: null,
};

export const tokenStore = {
  getAccessToken: () => tokens.access,
  getRefreshToken: () => tokens.refresh,
  setTokens: ({ access, refresh }) => {
    tokens.access = access ?? null;
    tokens.refresh = refresh ?? null;
  },
  clear: () => {
    tokens.access = null;
    tokens.refresh = null;
  },
};
