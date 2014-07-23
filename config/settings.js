module.exports = {
  app: {
    title: 'Scaling NodeJS',
    description: 'Scaling NodeJS up to multicore and multinode',
    keywords: ''
  },
  port: process.env.PORT || 3000,
  templateEngine: 'swig',
  sessionSecret: 'ABC123___!',
  sessionCollection: 'sessions',
  dbPath: process.env.MONGOHQ_URL || process.env.MONGOLAB_URI || 'mongodb://localhost/demo'
};
