const {
  withNativeFederation,
  shareAll,
} = require("@angular-architects/native-federation/config");

const getRemoteUrl = (remoteName) => {
  const env = process.env.NODE_ENV || "development";
  if (env === "production") {
    const urls = {
      "mf-auth":
        process.env.MF_AUTH_URL ||
        "https://teste-tecnico-teddy-mf-auth.vercel.app/remoteEntry.json",
      "mf-clientes":
        process.env.MF_CLIENTES_URL ||
        "https://teste-tecnico-teddy-mf-clientes.vercel.app/remoteEntry.json",
    };
    return urls[remoteName];
  }
  const urls = {
    "mf-auth": "http://localhost:4202/remoteEntry.json",
    "mf-clientes": "http://localhost:4201/remoteEntry.json",
  };
  return urls[remoteName];
};

module.exports = withNativeFederation({
  name: "shell",

  remotes: {
    "mf-auth": getRemoteUrl("mf-auth"),
    "mf-clientes": getRemoteUrl("mf-clientes"),
  },

  shared: {
    ...shareAll({
      singleton: true,
      strictVersion: true,
      requiredVersion: "auto",
    }),
  },

  skip: [
    "rxjs/ajax",
    "rxjs/fetch",
    "rxjs/testing",
    "rxjs/webSocket",
    // Add further packages you don't need at runtime
  ],

  // Please read our FAQ about sharing libs:
  // https://shorturl.at/jmzH0
});
