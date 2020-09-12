import * as codebuild from '@aws-cdk/aws-codebuild';

import { Construct, SecretValue, Stack, StackProps, Fn } from "@aws-cdk/core";


export class GitHubStatusChecks extends Stack {
    constructor(scope: Construct, id: string, props?: StackProps) {
        super(scope, id, props);

        const gitHubSource = codebuild.Source.gitHub({
            owner: 'Seyfat99',
            repo: 'codebuild-status-checks',
            reportBuildStatus: true,
            webhook: true, // optional, default: true if `webhookFilters` were provided, false otherwise
            webhookFilters: [
                codebuild.FilterGroup.inEventOf(codebuild.EventAction.PULL_REQUEST_CREATED),
                codebuild.FilterGroup.inEventOf(codebuild.EventAction.PULL_REQUEST_UPDATED)
            ],
        });

        const project = new codebuild.Project(this, 'GithubStatusChecks', {
            source: gitHubSource,
            projectName: "status-checker",
            buildSpec: codebuild.BuildSpec.fromObject({
                version: '0.2',
                phases: {
                    build: {
                        commands: [
                            'make lint',
                        ],
                    },
                },
            }),
            badge: true,
            
        });
    }
}