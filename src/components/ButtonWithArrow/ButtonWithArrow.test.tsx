import { render } from '@testing-library/react';
import { ButtonWithArrow } from './ButtonWithArrow';
import type { ButtonWithArrowProps } from './types';
import { screen } from '@testing-library/dom';

describe('ButtonWithArrow', () => {
  const getProps = (props?: Partial<ButtonWithArrowProps>): ButtonWithArrowProps => ({
    direction: 'left',
    size: 3,
    ...props,
  });

  test('renders ButtonWithArrow', () => {
    const { asFragment, container, rerender } = render(<ButtonWithArrow {...getProps()} />);
    expect(asFragment()).toMatchInlineSnapshot(`
      <DocumentFragment>
        <span
          class="sr-only"
        >
          Previous Page
        </span>
        <svg
          class="size-3"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            clip-rule="evenodd"
            d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
            fill-rule="evenodd"
          />
        </svg>
      </DocumentFragment>
    `);
    rerender(<ButtonWithArrow {...getProps({ direction: 'right', size: 5 })} />);
    expect(screen.getByText(/next page/i)).toBeInTheDocument();
    const svg = container.querySelector('svg');

    expect(svg).toHaveClass('rotate-180');
    expect(svg).toHaveClass('size-5');
    expect(svg).not.toHaveClass('size-3');
  });
});
