var gulp             = require('gulp'),
	source		     = require('vinyl-source-stream'),
	buffer		     = require('vinyl-buffer'),
	browserify	     = require('browserify'),
	watchify         = require('watchify'),
	babelify         = require('babelify'),
	parcelify        = require('parcelify'),
	brfs             = require('brfs'),
	gulpLoadPlugins  = require('gulp-load-plugins');
	glob             = require('glob'),
	rimraf           = require("rimraf");

// Automatically load any gulp plugins in your package.json
var $ = gulpLoadPlugins();

// External dependencies you do not want to rebundle while developing,
// but include in your application deployment
var dependencies = [
	'react',
	'flux'
];

var WEB_SERVER_PORT = 8888;

function browserifyTask (options) {

	// Bundle the application with browserify
	var appBundler = browserify({
		entries: [options.src],						// Application entry point; browserify finds and bundles all dependencies from there
		transform: [babelify/*, brfs*/],			// Convert React .jsx -> vanilla .js and enable ES6
													// Need brfs to inline fs.realpathSync calls in `cartodb-api`, but due to
													// https://github.com/substack/brfs/issues/39 it doesn't work. Therefore,
													// we have to manually rewrite those lines in `cartodb-api` to hardcode the `require` paths.
		debug: options.development,					// Gives us sourcemapping
		cache: {}, packageCache: {}, fullPaths: options.development // watchify requirements
	});

	// Use parcelify to pull in CSS from any node_module that specifies "style" and "transform" keys in package.json.
	// @panorama components specify these keys.
	parcelify(appBundler, {
		bundles: {
			style: './build/modules.css'
		}
	});

	// We set our dependencies as externals on our app bundler when developing.
	// You might consider doing this for production also and load two javascript
	// files (main.js and vendors.js), as vendors.js will probably not change and
	// takes full advantage of caching
	appBundler.external(options.development ? dependencies : []);

	// The bundling process
	function createBundle() {

		var start = Date.now();
		console.log('Building APP bundle');
		if (options.development) {
			lintTask(options);
			appBundler.bundle()
				.on('error', $.util.log)
				.pipe(source('main.js'))
				.pipe(gulp.dest(options.dest))
				.pipe($.livereload())
				.pipe($.notify({
					'onLast': true,
					'message': function () { return 'APP bundle built in ' + (Date.now() - start) + 'ms'; }
				}));
		} else {
			appBundler.bundle()
				.on('error', $.util.log)
				.pipe(source('main.js'))
				.pipe(buffer())
				.pipe($.uglify())	// this is failing with a JS_Parse_Error, can't figure out why
				.pipe(gulp.dest(options.dest))
				.pipe($.notify({
					'onLast': true,
					'message': function () { return 'APP bundle built in ' + (Date.now() - start) + 'ms'; }
				}));
		}

	};

	// Fire up Watchify when developing
	if (options.development) {
		appBundler = watchify(appBundler);
		appBundler.on('update', createBundle);
	}

	createBundle();

	// We create a separate bundle for our dependencies as they
	// should not rebundle on file changes. This only happens when
	// we develop. When deploying the dependencies will be included
	// in the application bundle
	if (options.development) {

		var vendorsBundler = browserify({
			debug: true,
			require: dependencies
		});

		// Run the vendor bundle
		var start = new Date();
		console.log('Building VENDORS bundle');
		vendorsBundler.bundle()
			.on('error', $.util.log)
			.pipe(source('vendors.js'))
			.pipe(gulp.dest(options.dest))
			.pipe($.notify({
				'onLast': true,
				'title': 'VENDORS bundle',
				'message': function () { return 'built in ' + (Date.now() - start) + 'ms'; },
				'notifier': function () {}
			}));

	} else {

		browserify({ require: '' })
			.bundle()
			.pipe(source('vendors.js'))
			.pipe(gulp.dest(options.dest));

	}

}

function cssTask(options) {
	if (options.development) {
		var run = function () {
			var start = new Date();
			console.log('Building CSS bundle');
			gulp.src(options.src)
				.pipe($.sass())
				.pipe(gulp.dest(options.dest))
				.pipe($.notify({
					'onLast': true,
					'title': 'CSS bundle',
					'message': function () { return 'built in ' + (Date.now() - start) + 'ms'; },
					'notifier': function () {}
				}));
		};
		run();
		gulp.watch(options.watchfiles, run);
	} else {
		gulp.src(options.src)
			.pipe($.sass())
			.pipe($.cssmin())
			.pipe(gulp.dest(options.dest));
	}
}

function copyTask(options) {
	return gulp.src(options.src)
		.pipe($.copy(options.dest, {
			"prefix": options.pathDepth || 1
		}));
}

function lintTask(options) {
	console.log('ESLinting...');
	return gulp.src(options.lintsrc)
		.pipe($.eslint())
		.pipe($.eslint.format())
		.pipe($.eslint.failAfterError())	// Exit on lint error with code (1).
		.pipe($.notify({
			'onLast': true,
			'title': 'Lint task',
			'message': function () { return 'Linted.'; },
			'notifier': function () {}
		}));
}

function webserverTask(options) {
	options = options || {}
	var port = options.port || WEB_SERVER_PORT;

	return $.connect.server({
		root: './build/',
		port: port,
		livereload: false
	});
}

function staticFolder() {
	return gulp.src("static/**")
	.pipe($.copy("build/"));
}

function staticDistFolder() {
	return gulp.src("static/**")
	.pipe($.copy("./dist"));
}

// Local development workflow:
// build component and test on local server (localhost:8888)
// with watcher to pick up changes and rebuild
gulp.task('default', function () {

	rimraf("./build/**", function() {

		copyTask({
			"src"               : "./src/*.html",
			"dest"              : "./build"
		});

		copyTask({
			// "src"               : "../panorama/dist/*.css*",
			"src"               : "./node_modules/@panorama/toolkit/dist/*.css*",
			"dest"              : "./build",
			"pathDepth"         : 4
		});

		browserifyTask({
			"development" : true,
			"lintsrc"           : './src/**/*.js*',
			"src"				: './src/main.jsx',
			"dest"				: './build'
		});

		cssTask({
			"development" : true,
			"src"				: './scss/*.scss',
			"watchfiles"		: './scss/**/*.scss',
			"dest"				: './build'
		});

		webserverTask();

		staticFolder();

	});

});

// NOTE: not yet fully set up, due to an uglify failure.
// see browserifyTask for more info.
gulp.task('dist', function () {

	rimraf("./dist/**", function() {

		copyTask({
			"src"               : "./src/*.html",
			"dest"              : "./dist"
		});

		copyTask({
			// "src"               : "../panorama/dist/*.css*",
			"src"               : "./node_modules/@panorama/toolkit/dist/*.css*",
			"dest"              : "./dist",
			"pathDepth"         : 4
		});

		browserifyTask({
			"development" : false,
			"src"				: './src/main.jsx',
			"dest"				: './dist'
		});

		cssTask({
			"development" : false,
			"src"				: './scss/*.scss',
			"dest"				: './dist'
		});

		staticDistFolder()

	});

});
