const env = process.env.NODE_ENV || "dev";

const config = function() {
  switch(env) {
    case "dev":
      console.log("Iniciando a API em ambiente de DESENVOLVIMENTO");
      return {
        dbUrl: "mongodb+srv://admin:admin@clusterapi-bmp3p.mongodb.net/test?retryWrites=true&w=majority",
        jwtPassword: "MvrdoN02383596035",
        jwtExpiresIn: "1d"
      };
    case "hmg":
      console.log("Iniciando a API em ambiente de HOMOLOGAÇÃO");
      return {
        dbUrl: "mongodb+srv://admin:admin@clusterapi-bmp3p.mongodb.net/test?retryWrites=true&w=majority",
        jwtPassword: "MvrdoN02383596035",
        jwtExpiresIn: "1d"
      };
    case "prod":
      console.log("Iniciando a API em ambiente de PRODUÇÃO");
      return {
        dbUrl: "mongodb+srv://admin:admin@clusterapi-bmp3p.mongodb.net/test?retryWrites=true&w=majority",
        jwtPassword: "MvrdoN02383596035",
        jwtExpiresIn: "7d"
      };
  }
}

module.exports = config();