//next.config.js
import path from 'path';
import { fileURLToPath } from 'url';
import withVideos from 'next-videos';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**@type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // swcMinify: true,

  sassOptions: {
    includePaths: [path.join(__dirname, 'src/styles')],
    prependData:`
    @use "variables" as *;
    `,
  },

  
};

export default withVideos(nextConfig, {
  assetsPrefix: '/media/videos',
  output: 'standalone'
});
