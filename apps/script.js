module.exports = function(app, logger, router) {
    logger.info('module script vm');
    var vm = require('vm');
    var log = "";
    var script = "";
    var fs = require('fs');
    var path = require('path');

    router.get('/list', function(req, res) {
	var filelist=[];
	fs.readdirSync(__dirname + '/../uploads').forEach(function(filename) {
        if (!/\.js$/.test(filename)) {
            return;
        }
        filelist.push(filename);

    });
        res.json({
            script: filelist
        });
    });

    router.get('/log', function(req, res) {
        res.json({
            log: 'hooray! welcome to our api!'
        });
    });

    router.post('/run', function(req, res) {
	var filename = req.body.filename;
        //var runscript = vm.runInThisContext('localVar = 1;',
        //    'myfile.vm');
	var script = "var app = require(__dirname + '/../uploads/"+ filename +"); app[0]();"
        eval(script);
	
        res.json({
            message: 'run script api!'
        });
    });

    app.use('/script', router);

}
