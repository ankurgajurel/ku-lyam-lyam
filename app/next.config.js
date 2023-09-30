/** @type {import('next').NextConfig} */

module.exports = {
    distDir: 'build',
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'images.pexels.com',
            },
        ],
    },
}
