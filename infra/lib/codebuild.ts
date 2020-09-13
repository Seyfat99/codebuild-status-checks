import { Source, EventAction, FilterGroup, Project, BuildSpec, ComputeType, LinuxBuildImage } from '@aws-cdk/aws-codebuild';
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

        const installPhase = {
            "runtime-versions": {
                golang: 1.14,
            },
            commands: [
                "curl -sSfL https://raw.githubusercontent.com/golangci/golangci-lint/master/install.sh | sh -s v1.31.0",
                "./bin/golangci-lint --version"
            ],
        }

        const buildEnvironment = {
            buildImage: LinuxBuildImage.AMAZON_LINUX_2_3,
            computeType: ComputeType.SMALL,
        }

        new Project(this, 'GithubStatusChecksTest', {
            source: gitHubSource,
            projectName: `${props.projectName}-test`,
            badge: true,
            buildSpec: BuildSpec.fromObject({
                version: '0.2',
                phases: {
                    install: installPhase,
                    build: {
                        commands: [
                            "cd go",
                            "go test -cover -v ./cmd/... ./internal... --timeout=3m ./..."
                        ],
                    },
                },
            }),
            environment: buildEnvironment
        });

        new Project(this, 'GithubStatusChecksLint', {
            source: gitHubSource,
            projectName: `${props.projectName}-lint`,
            badge: true,
            buildSpec: BuildSpec.fromObject({
                version: '0.2',
                phases: {
                    install: installPhase,
                    build: {
                        commands: [
                            "cd go",
                            "../bin/golangci-lint run --timeout=3m ./cmd/... ./internal/..."
                        ],
                    },
                },
            }),
            environment: buildEnvironment
        });
    }
}