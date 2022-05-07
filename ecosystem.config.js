module.exports = [
  {
    name: "tavern-renderer",
    script: "dist/index",
    log_date_format: "YYYY-MM-DD HH:mm:ss Z",
    env: {
      FORCE_COLOR: "1",
      NODE_ENV: "production",
    },
  },
];
