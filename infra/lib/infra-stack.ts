// import * as cdk from '@aws-cdk/core';
// import * as codebuild from '@aws-cdk/aws-codebuild';

// import { Construct, SecretValue, Stack, StackProps, Fn } from "@aws-cdk/core";

// export class InfraStack extends cdk.Stack {
//   constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
//     super(scope, id, props);

//     const gitHubSource = codebuild.Source.gitHub({
//       owner: 'Seyfat99',
//       repo: 'codebuild-status-checks',
//       webhook: true, // optional, default: true if `webhookFilters` were provided, false otherwise
//       webhookFilters: [
//           codebuild.FilterGroup.inEventOf(codebuild.EventAction.PULL_REQUEST_CREATED),
//           codebuild.FilterGroup.inEventOf(codebuild.EventAction.PULL_REQUEST_UPDATED)
//       ],
//   });

//   const porject = new codebuild.Project(this, 'GithubStatusChecks', {
//       source: gitHubSource,
//   });
//   }
// }
