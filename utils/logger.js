const { createLogger, transports, format } = require("winston");

const logger = createLogger({
  level: "info",
  format: format.combine(
    format.timestamp(),
    format.printf(({ timestamp, level, message }) => {
      return `${timestamp}[${level.toUpperCase()}]:${message}`;
    })
  ),
  transports: [
    new transports.Console(),
    new transports.File({ filename: `app.log` }),
  ],
});

logger.stream = {
  write: (message) => {
    logger.info(message.trim());
  },
};

module.exports = logger;
