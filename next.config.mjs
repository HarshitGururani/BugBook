/** @type {import('next').NextConfig} */
const utAppId =
  process.env.NEXT_PUBLIC_UPLOADTHING_APP_ID ?? process.env.UPLOADTHING_APP_ID;

const nextConfig = {
  experimental: {
    staleTimes: {
      dynamic: 30,
    },
  },
  serverExternalPackages: ["@node-rs/argon2"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "utfs.io",
        pathname: "/a/**",
      },
      {
        protocol: "https",
        hostname: "utfs.io",
        pathname: "/f/**",
      },
      {
        protocol: "https",
        hostname: "*.ufs.sh",
        pathname: "/f/**",
      },
      ...(utAppId
        ? [
            {
              protocol: "https",
              hostname: `${utAppId}.ufs.sh`,
              pathname: "/f/**",
            },
          ]
        : []),
    ],
  },
  rewrites: () => {
    return [
      {
        source: "/hashtag/:tag",
        destination: "/search?q=%23:tag",
      },
    ];
  },
};

export default nextConfig;
