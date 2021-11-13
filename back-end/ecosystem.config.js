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
      host : '100.25.236.222',
      key  : '~/.ssh/spacefolio-back-end.pem',
      ref  : 'origin/main',
      repo : 'git@github.com:Spacefolio/app.git',
      path : '~/Spacefolio',
      'pre-deploy-local': '',
      'post-deploy' : 'cd ~/Spacefolio/current/back-end && npm install && cd ~/Spacefolio/current/front-end && npm install && npm run build && yes | sudo cp -rf dist/* /var/www/html/ && cd ~/Spacefolio/current/back-end && pm2 reload ecosystem.config.js --env production',
      'pre-setup': ''
    }
  }
};