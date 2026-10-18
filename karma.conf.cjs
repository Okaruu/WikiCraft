module.exports = function (config) {
 config.set({
   frameworks: ['jasmine'],
   files: [
     'src/test/setupTests.js',
     'src/test/**/*.spec.jsx',
     { pattern: 'public/**/*', included: false, served: true, watched: false }
   ],
   proxies: {
     '/imagenes/': '/base/public/imagenes/',
     '/audios/': '/base/public/audios/'
   },
   preprocessors: {
     'src/test/setupTests.js': ['webpack'],
     'src/test/**/*.spec.jsx': ['webpack']
   },
   webpack: {
     mode: 'development',
     module: {
       rules: [
         {
           test: /\.m?jsx?$/,
           resolve: { fullySpecified: false },
         },
         {
           test: /\.jsx?$/,
           exclude: [/node_modules/, /src[\\/]test[\\/]/],
           use: {
             loader: 'babel-loader',
             options: { plugins: ['istanbul'] },
           },
         },
         {
           test: /\.jsx?$/,
           include: /src[\\/]test[\\/]/,
           use: { loader: 'babel-loader' },
         },
         {
           test: /\.css$/,
           use: ['style-loader', 'css-loader'],
         },
       ],
     },
     resolve: {
       extensions: ['.js', '.jsx'],
     },
   },
   reporters: ['progress', 'kjhtml', 'coverage'],
   coverageReporter: {
     dir: 'coverage/',
     reporters: [
       { type: 'html', subdir: 'html' },   
       { type: 'text-summary' },           
     ],
   },
   browsers: ['ChromeHeadless'],
   singleRun: true,
   restartOnFileChange: true,
   plugins: [
     'karma-jasmine',
     'karma-webpack',
     'karma-chrome-launcher',
     'karma-coverage',
     'karma-jasmine-html-reporter'
   ]
 });
};
