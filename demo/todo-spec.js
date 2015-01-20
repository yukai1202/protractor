// spec.js

var fs = require('fs');
Utils = {

    /**
     * @name screenShotDirectory
     * @description The directory where screenshots will be created
     * @type {String}
     */
    screenShotDirectory: 'test/results/',

    /**
     * @name writeScreenShot
     * @description Write a screenshot string to file.
     * @param {String} data The base64-encoded string to write to file
     * @param {String} filename The name of the file to create (do not specify directory)
     */
    writeScreenShot: function (data, filename) {
        var stream = fs.createWriteStream(this.screenShotDirectory + filename);

        stream.write(new Buffer(data, 'base64'));
        stream.end();
    }

};


describe('angularjs homepage', function() {


	beforeEach(function() {
	    browser.get('http://juliemr.github.io/protractor-demo/');
	});
    

  it('should add one and two', function() {
    element(by.model('first')).sendKeys(1);
    element(by.model('second')).sendKeys(2);
    element(by.id('gobutton')).click();
	expect(element(by.binding('latest')).getText()).toEqual('5'); // This is wrong!
  });

  it('should test', function() {
    element(by.model('first')).sendKeys(3);
    element(by.model('second')).sendKeys(1);
    element(by.id('gobutton')).click();
	expect(element(by.binding('latest')).getText()).toEqual('9'); // This is wrong!
  });

  afterEach(function() {

  		var spec = jasmine.getEnv().currentSpec;
  		var specName = spec.description.split(' ');

  		if(spec.results().passed()) return;

    	//var passed = jasmine.getEnv().currentSpec.results().passed();
	    //console.log("===================>"+passed);
	  	//if (!passed) {
	  		browser.takeScreenshot().then(function(png) {

			    var stream = fs.createWriteStream("test/results/"+ specName +".png");

			    stream.write(new Buffer(png, 'base64'));
			    stream.end();
		  
	  		});

	  	//};

    });

});