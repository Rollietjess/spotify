'use strict';

const uuid = require('uuid');
const logger = require('../utils/logger');

const viewsong = {
  index(request, response) {
    const songId = request.params.id;
    logger.debug('viewsong id = ', songId);
    const viewData = {
      title: 'viewsong'
    };
    response.render('viewsong', viewData);
  },
};

module.exports = viewsong;