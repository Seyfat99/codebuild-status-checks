#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { GitHubStatusChecks } from '../lib/codebuild';

const app = new cdk.App();
new GitHubStatusChecks(app, 'GitHubStatusChecks');
