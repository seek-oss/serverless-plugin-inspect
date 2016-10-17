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
          const stack = {
            name: this.sdk.getStackName(options.stage)
          };

          console.log(JSON.stringify({ stack }));
        });
      }
    };
  }
}

module.exports = Inspect;
