const getDatabaseUrl = (nodeEnv) => {
  return (
    {
      development: "postgres://postgres:postgres@localhost:5432/node-react-file-upload_development",
      test: "postgres://postgres:postgres@localhost:5432/node-react-file-upload_test",
      e2e: "postgres://postgres:postgres@localhost:5432/node-react-file-upload_e2e",
    }[nodeEnv] || process.env.DATABASE_URL
  );
};

module.exports = getDatabaseUrl;
