"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.runDataActiveRunReplicant = void 0;
/* eslint-disable max-len */
const nodecg_1 = require("./nodecg");
/**
 * This is where you can declare all your replicant to import easily into other files,
 * and to make sure they have any correct settings on startup.
 */
exports.runDataActiveRunReplicant = (0, nodecg_1.get)().Replicant('runDataActiveRun', 'nodecg-speedcontrol');
