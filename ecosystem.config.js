module.exports = {
  apps: [
    {
      name: 'Contacto front',
      script: 'npm run start',
    },
  ],

  deploy: {
    production: {
      user: 'comunatrib',
      // SSH host
      host: '10.22.244.173',
      // GIT remote/branch
      ref: 'origin/main',
      // GIT remote
      repo: 'git@github.com:DA-DELY-PLUZ/ContactForm.git',
      // Fetch all branches or fast
      fetch: 'all',
      path: '/home/comunatrib/contact',
      'pre-deploy-local': '',
      'post-deploy':
        'source ~/.nvm/nvm.sh && npm install && npm run build && pm2 reload ecosystem.config.js --env production',
      'pre-setup': '',
      'ssh-options': 'FordwardAgent=yes',
    },
  },
};
