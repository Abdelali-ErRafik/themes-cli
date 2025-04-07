module.exports = {
  apps: [
    {
      name: 'theme-marketmall', // Application name
      port: 3000, // Port to run on
      exec_mode: 'cluster', // Cluster mode (for scaling)
      instances: '1', // Max instances to run
      script: './.output/server/index.mjs', // Path to the entry point .mjs file
      interpreter: 'node', // Explicitly use Node.js interpreter
      watch: false, // Disable watching, or set to true if you need it
    },
  ],
};
