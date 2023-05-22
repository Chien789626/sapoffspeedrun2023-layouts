/* eslint-disable max-len */
import { get as nodecg } from './nodecg';
import type { RunDataActiveRun } from '@sapoffspeedrun2023-layouts/types/schemas/speedcontrol';

/**
 * This is where you can declare all your replicant to import easily into other files,
 * and to make sure they have any correct settings on startup.
 */

export const runDataActiveRunReplicant = nodecg().Replicant<RunDataActiveRun>(
  'runDataActiveRun',
  'nodecg-speedcontrol'
);
