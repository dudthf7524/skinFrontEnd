module.exports = {
    apps: [
      {
        name: "backend",
        script: "dist/app.js",  // ts-node 말고 dist의 JS 실행
        instances: 1,
        autorestart: true,
        watch: false,
        env: {
          NODE_ENV: "production"
        }
      }
    ]
  }
  