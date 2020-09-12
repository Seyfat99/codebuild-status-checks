import { Source, EventAction, FilterGroup, Project, BuildSpec } from '@aws-cdk/aws-codebuild';
import { Construct, Stack, StackProps } from "@aws-cdk/core";

interface GitHubStatusChecksProps extends StackProps {
    repoOwner: string;
    repoName: string;
    projectName: string;
    buildSpecFilename: string;
}

export class GitHubStatusChecks extends Stack {
    constructor(scope: Construct, id: string, props: GitHubStatusChecksProps) {
        super(scope, id, props);

        const gitHubSource = Source.gitHub({
            owner: props.repoOwner,
            repo: props.repoName,
            reportBuildStatus: true,
            webhook: true,
            webhookFilters: [
                FilterGroup.inEventOf(EventAction.PULL_REQUEST_CREATED),
                FilterGroup.inEventOf(EventAction.PULL_REQUEST_UPDATED)
            ],
        });

        const project = new Project(this, 'GithubStatusChecks', {
            source: gitHubSource,
            projectName: props.projectName,
            badge: true,
            buildSpec: BuildSpec.fromSourceFilename(props.buildSpecFilename),
        });
    }
}