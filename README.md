# Video Manger Client

This is the client application for Video Manager.

## Building

Make sure that the version number in the package.json and deployment.yml files are unique, or else the image won't be built properly.

First, run `yarn dist` to build the artifact.

Then, run `sh deploy.sh` to deploy the artifact to Kubernetes.