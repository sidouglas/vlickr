import { render } from '@testing-library/react';
import { SkeletonLine } from './SkeletonLine';

describe('SkeletonLine', () => {
  test('renders', () => {
    const component = render(<SkeletonLine />);
    expect(component.asFragment()).toMatchInlineSnapshot(`
      <DocumentFragment>
        <div
          class="mt-2 flex flex-col gap-2"
        >
          <div
            class="h-4 w-full animate-pulse rounded-md bg-base"
          />
        </div>
      </DocumentFragment>
    `);
  });
  test('renders children', () => {
    const component = render(<SkeletonLine>test</SkeletonLine>);
    expect(component.asFragment()).toMatchInlineSnapshot(`
      <DocumentFragment>
        test
      </DocumentFragment>
    `);
  });
});
