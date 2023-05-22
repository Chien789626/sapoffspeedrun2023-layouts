"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const nodecg_1 = require("./util/nodecg");
(0, nodecg_1.get)().log.info('Extension code working!');
// Access the bundle configuration with types.
const config = (0, nodecg_1.get)().bundleConfig;
// Accessing normal types.
const exampleType = { exampleProperty: 'exampleString' };
