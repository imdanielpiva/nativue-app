const LoaderTargetPlugin = require('webpack/lib/LoaderTargetPlugin');

function nativescriptTarget(compiler) {
    var options = this;
    var webpackLib = "webpack/lib";

    var NsNodeGlobalsPlugin = require("./lib/NsNodeGlobalsPlugin");
    // Custom template plugin
    var NsJsonpTemplatePlugin = require("./lib/NsJsonpTemplatePlugin");

    var FunctionModulePlugin = require(webpackLib + "/FunctionModulePlugin");
    var NodeSourcePlugin = require(webpackLib + "/node/NodeSourcePlugin");
    var LoaderTargetPlugin = require(webpackLib + "/LoaderTargetPlugin");

    compiler.apply(
        new NsNodeGlobalsPlugin(),
        new NsJsonpTemplatePlugin(options.output),
        new FunctionModulePlugin(options.output),
        new NodeSourcePlugin(options.node),
        new LoaderTargetPlugin("web")
    );
}

module.exports = function (compiler) {
  nativescriptTarget.bind(this)({
    apply (...plugins) {
      plugins = plugins.filter(p => p.constructor.name !== 'LoaderTargetPlugin');
      plugins.push(new LoaderTargetPlugin('nativescript'));
      compiler.apply(...plugins);
    },
  });
};
