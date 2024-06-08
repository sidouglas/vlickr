import { act, createEvent, fireEvent, render, screen } from '@testing-library/react';
import { SearchInput } from './SearchInput';

import { SearchInputProps } from './types';

const getProps = (props: Partial<SearchInputProps> = {}): SearchInputProps => ({
  onChange: vi.fn(),
  ...props,
});

describe('SearchInput', () => {
  it('renders', () => {
    const { asFragment } = render(<SearchInput {...getProps()} />);
    expect(asFragment()).toMatchInlineSnapshot(`
      <DocumentFragment>
        <input
          class="rounded-l-lg bg-primary-accent text-base placeholder:text-base"
          placeholder="Search photos..."
          type="text"
          value=""
        />
      </DocumentFragment>
    `);
  });

  it('calls onChange', () => {
    const props = getProps();
    const value = 'Foo';
    render(<SearchInput {...props} />);
    const input = screen.getByPlaceholderText<HTMLInputElement>('Search photos...');
    const changeEvent = createEvent.change(input, { target: { value } });
    changeEvent.preventDefault = vi.fn();
    act(() => {
      fireEvent(input, changeEvent);
    });
    expect(input).toHaveValue(value);
    expect(changeEvent.preventDefault).toHaveBeenCalled();
    expect(props.onChange).not.toHaveBeenCalled();

    vi.advanceTimersByTime(500);
    expect(props.onChange).toHaveBeenCalledWith(value);
  });
});
