module.exports = {
    settings: {
        parser: {
            enabled: true,
            multipart: true,
            formidable: {
                maxFileSize: 2 * 1024 * 1024 * 1024 // Defaults to 2GB
            }
        }
    },
};