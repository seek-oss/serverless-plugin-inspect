'use strict';

import Promise from 'bluebird';
import SDK from 'serverless/lib/plugins/aws';
import validate from 'serverless/lib/plugins/aws/lib/validate';

class Inspect {
  constructor(serverless, options) {
    this.serverless = serverless;
    this.options = options;
    this.provider = 'aws';
    this.sdk = new SDK(serverless);

    this.commands = {
      inspect: {
        usage: 'Display information about the service',
        lifecycleEvents: [
          'inspect'
        ]
      }
    };

    Object.assign(this, validate);

    this.hooks = {
      'inspect:inspect': () => {
        return this.validate(serverless).then(() => {
          const stackName = this.sdk.getStackName(options.stage);

          return this.sdk.request('CloudFormation',
                                  'describeStacks',
                                  { StackName: stackName },
                                  this.options.stage,
                                  this.options.region)
                     .then(output => {
                       console.log(JSON.stringify({ Stacks: output.Stacks }, null, 2));
                     });
        });
      }
    };
  }
}

module.exports = Inspect;
