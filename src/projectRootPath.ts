import { fileURLToPath } from 'node:url';

const projectRootPath = fileURLToPath(new URL('../', import.meta.url));

export default projectRootPath;
