'use strict';

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _aws = require('serverless/lib/plugins/aws');

var _aws2 = _interopRequireDefault(_aws);

var _validate = require('serverless/lib/plugins/aws/lib/validate');

var _validate2 = _interopRequireDefault(_validate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Inspect = function Inspect(serverless, options) {
  var _this = this;

  _classCallCheck(this, Inspect);

  this.serverless = serverless;
  this.options = options;
  this.provider = 'aws';
  this.sdk = new _aws2.default(serverless);

  this.commands = {
    inspect: {
      usage: 'Display information about the service',
      lifecycleEvents: ['inspect']
    }
  };

  Object.assign(this, _validate2.default);

  this.hooks = {
    'inspect:inspect': function inspectInspect() {
      return _this.validate(serverless).then(function () {
        var stackName = _this.sdk.getStackName(options.stage);

        return _this.sdk.request('CloudFormation', 'describeStacks', { StackName: stackName }, _this.options.stage, _this.options.region).then(function (output) {
          console.log(JSON.stringify({ Stacks: output.Stacks }, null, 2));
        });
      });
    }
  };
};

module.exports = Inspect;