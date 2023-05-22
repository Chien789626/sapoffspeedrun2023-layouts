import type { ExampleType } from '@sapoffspeedrun2023-layouts/types';
import type { Configschema } from '@sapoffspeedrun2023-layouts/types/schemas/configschema';
import { get as nodecg } from './util/nodecg';

nodecg().log.info('Extension code working!');

// Access the bundle configuration with types.
const config = nodecg().bundleConfig as Configschema;

// Accessing normal types.
const exampleType: ExampleType = { exampleProperty: 'exampleString' };
