'use strict';

const logger = require('../utils/logger');

const about = {
  index(request, response) {
    logger.info('about rendering');
    const viewData = {
      title: 'About Playlist 1',
      contactName: 'Rolinda Strijker',
      contactAddress: 'test 4a'
    };
    response.render('about', viewData);
  },
};

module.exports = about;
