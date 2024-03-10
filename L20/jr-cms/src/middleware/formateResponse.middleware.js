// 目的是为了对response进行格式化处理，统一返回格式
module.exports = (req, res, next) => {
    res.formatResponse = (data, statusCode = 200, customObject = {}) => {
        const dataKey = statusCode === 400 ? 'data' : 'error';
        
        const responseData = {
            status: statusCode,
            [dataKey]: data,
            ...customObject
        }
        return res.status(statusCode).json(responseData);
    };
    next();
}