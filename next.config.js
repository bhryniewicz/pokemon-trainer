module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "raw.githubusercontent.com",
        port: "",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "3000",  
        pathname: "/uploads/**", 
      },
    ],
  },
};
