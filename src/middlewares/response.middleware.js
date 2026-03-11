/*
    Response Wrapper Middleware

    Tüm yanıtları { success: true, data: ... } gibi standart bir formata sarar.
*/

const responseWrapper = (req, res, next) => {
    res.sendResponse = (data, message = 'Success', statusCode = 200) => {
        return res.status(statusCode).json({
            success: true,
            message,
            data
        });
    };
    next();
};

module.exports = responseWrapper;