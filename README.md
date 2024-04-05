* serverless-plugin-inspect

> ⚠️ This plugin is no longer maintained. You are advised to fork this repository rather than relying on the unmaintained npm package.

Get AWS stack info in JSON

Run:

```sh
sls inspect
```

Returns:

```json
{
  "Stacks": [
    {
      "StackId": "...",
      "StackName": "...",
      "Description": "...",
      "Parameters": [],
      "CreationTime": "...",
      "LastUpdatedTime": "...",
      "StackStatus": "...",
      "DisableRollback": false,
      "NotificationARNs": [],
      "Capabilities": [
        "CAPABILITY_IAM"
      ],
      "Outputs": [
        {
          "OutputKey": "...",
          "OutputValue": "...",
          "Description": "..."
        },
        {
          "OutputKey": "...",
          "OutputValue": "...",
          "Description": "..."
        },
        {
          "OutputKey": "...",
          "OutputValue": "..."
        }
      ],
      "Tags": [
        {
          "Key": "...",
          "Value": "..."
        }
      ]
    }
  ]
}
```
