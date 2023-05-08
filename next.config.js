/** @type {import('next').NextConfig} */

module.exports = {
    images: {
      domains: ["cdn.onlinewebfonts.com", "www.vhv.rs", "clipartcraft.com", "th.bing.com"],
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'cdn.onlinewebfonts.com',
          port: '',
        //   pathname: 'svg/img_415633',
        },
        {
            protocol: 'https',
            hostname: 'www.vhv.rs',
            port: '',
          //   pathname: 'svg/img_415633',
        },
        {
            protocol: 'https',
            hostname: 'clipartcraft.com',
            port: '',
          //   pathname: 'svg/img_415633',
        },
        {
            protocol: 'https',
            hostname: 'th.bing.com',
            port: '',
          //   pathname: 'svg/img_415633',
        },
      ],
    },
  }
