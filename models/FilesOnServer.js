var fs = require("fs"),
    formidable = require("formidable"),
    UPLOAD_DIR = "./public/files/";

function FilesOnServer() {
}
module.exports = FilesOnServer;

FilesOnServer.uploadFolder = "/files/"

FilesOnServer.prototype.upload = function (req, callback) {
    var form = new formidable.IncomingForm();
    form.uploadDir = UPLOAD_DIR;

    form.parse(req, function (err, fields, files) {
        if (err) {
            console.log('parse error: ' + err);
        } else {
            try {
                console.log("parsing done");
                var types = files.upload.name.split('.');
                var date = new Date();
                var ms = Date.parse(date);

                var fileName = ms + "." + String(types[types.length - 1]);
                var filePath = UPLOAD_DIR + fileName;
                fs.renameSync(files.upload.path, filePath);

                callback(fileName);
            } catch (error) {
                console.log('error: ' + error);
            }
        }
    });
}

FilesOnServer.prototype.delete = function (path, callback) {
    var realPath = "./public" + path;

    try {
        fs.unlink(realPath, callback());
    } catch (error) {
        console.log('error: ' + error);
        callback(error);
    }
}

FilesOnServer.prototype.download = function (path, name, res, callback) {
    var realPath = "./public" + path;

    try {
        res.download(realPath, name);
    } catch (error) {
        var err = error;
    }
    if(err) {
        callback(err);
    }
}

