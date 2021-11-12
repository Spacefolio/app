module.exports = {
  apps : [{
    name: "spacefolio-back-end",
    script: './dist/app.js',
    watch: './dist/app.js',
    env: {
      NODE_ENV: "development"
    },
    env_production: {
      NODE_ENV: "production"
    }
  }],

  deploy : {
    production : {
      user : 'ubuntu',
      host : 'ec2-54-159-188-168.compute-1.amazonaws.com',
      key  : '~/.ssh/spacefolio-back-end.pem',
      ref  : 'origin/main',
      repo : 'git@github.com:Spacefolio/app.git',
      path : '~/Spacefolio',
      'pre-deploy-local': '',
      'post-deploy' : 'cd ~/Spacefolio/current/back-end && npm install && cd ~/Spacefolio/current/front-end && npm install && npm run build && pm2 reload ecosystem.config.js --env production',
      'pre-setup': ''
    }
  }
};