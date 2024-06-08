import { render } from '@testing-library/react';
import { LoaderOverlaid } from './LoaderOverlaid';

describe('LoaderOverlaid', () => {
  test('renders', () => {
    const component = render(<LoaderOverlaid />);
    expect(component.asFragment()).toMatchInlineSnapshot(`
    <DocumentFragment>
      <div
        class="absolute inset-0 z-10 flex items-center justify-center text-secondary/50"
      >
        <div
          class="inline-block size-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white"
          role="status"
        >
          <span
            class="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
          >
            Loading...
          </span>
        </div>
      </div>
    </DocumentFragment>
  `);
  });
});
