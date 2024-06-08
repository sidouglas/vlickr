import { baseName } from './utils';
import { vi } from 'vitest';
import path from 'path';

type Mocks = Record<string, ReturnType<typeof vi.fn>>;

export async function unStubComponent<
  Props extends Record<string, unknown>,
  BaseName extends string,
>(modulePath: BaseName, mocks: Mocks) {
  const baseDir = getCallerDir();
  // Resolve the absolute path of the module based on the base directory
  const componentPath = path.resolve(baseDir, modulePath);

  const imported = await vi.importActual<Record<string, (p: Props) => JSX.Element>>(componentPath);

  if (!imported) throw new Error('Module not found');

  const moduleName = baseName(modulePath);

  const importedComponent = imported[moduleName];

  if (importedComponent && typeof importedComponent === 'function') {
    mocks[moduleName].mockImplementation((props: Props) => importedComponent(props));
  } else {
    throw new Error(`Imported module "${moduleName}" is not a valid component`);
  }
}

// Custom function to get the caller's directory// Custom function to get the caller's directory
function getCallerDir() {
  // Save the original Error.prepareStackTrace
  const origPrepareStackTrace = Error.prepareStackTrace;
  try {
    // Override Error.prepareStackTrace to get the stack array
    Error.prepareStackTrace = (_, stack) => stack;
    const { stack } = new Error();

    // Restore the original Error.prepareStackTrace
    Error.prepareStackTrace = origPrepareStackTrace;
    // this is the name of this file - unStubComponent.ts
    const self = baseName(__filename);

    if (Array.isArray(stack)) {
      // Get the current file's name (CommonJS)

      for (const callSite of stack) {
        const fileName = callSite?.getFileName();

        if (!fileName) continue;

        // If this file is not self - then it must be the caller
        if (!fileName.endsWith(self)) {
          return path.dirname(fileName);
        }
      }
    }

    throw new Error('Unable to determine caller directory');
  } finally {
    // Ensure the original Error.prepareStackTrace is always restored
    Error.prepareStackTrace = origPrepareStackTrace;
  }
}
