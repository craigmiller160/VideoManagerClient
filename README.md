# Video Manger Client

This is the client application for Video Manager.

## Building

NOTE: This still depends on NodeJS v16.x.

Make sure that the version number in the package.json and deployment.yml files are unique, or else the image won't be built properly.

First, run `yarn build` to build the code.

Then, run `yarn prepDeploy` to prepare the artifact.

Lastly, run `kube-deploy` (from k8s deployment app).