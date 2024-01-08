import path from 'node:path';
const _dirname = path.resolve();
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
export default require;
