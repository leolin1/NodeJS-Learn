// helmet, morgan, winston, rate-limit, swagger //需要的模块

// 引入express模块
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const v1Router = require('./routes');
const config = require('./config');
const getLogger = require('./common/logger');
const morgan = require('./common/morgan');
const formatResponseMiddleware = require('./middleware/formateResponse.middleware');
const notFoundMiddleware = require('./middleware/notFound.middleware');
const unknownErrorMiddleware = require('./middleware/errorMiddleware/unknownError.middleware.js');
const { connect } = require('mongoose');
const connectToDb = require('./common/utils/db');
const logger = getLogger(__filename);

const app = express(); 

app.use(express.json()); 

app.use(helmet());

app.use(cors());

app.use(formatResponseMiddleware); 

app.use(morgan);

app.use('/v1',v1Router);

app.use(notFoundMiddleware);

app.use(unknownErrorMiddleware);


connectToDb().then(() => {
    app.listen(config.PORT, () => {
        logger.info(`Server is LISTENNING on port ${config.PORT}`);
    });
});


