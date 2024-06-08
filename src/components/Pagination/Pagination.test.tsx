import { Pagination } from './Pagination';
import type { PaginationProps } from './types';
import { renderWithProviders } from '@/test/renderWithProviders';
import { stubComponent } from '@/test/stubComponent';
import { act, fireEvent, screen } from '@testing-library/react';
import { Route, Routes } from 'react-router-dom';
const mocks = vi.hoisted(() => ({
  ButtonWithArrow: vi.fn(),
}));

vi.mock('../ButtonWithArrow/ButtonWithArrow', () => ({ ButtonWithArrow: mocks.ButtonWithArrow }));

const getProps = (props?: Partial<PaginationProps>): PaginationProps => ({
  currentPage: 1,
  totalPages: 10,
  nextPageUrl: 'next-page-url',
  prevPageUrl: 'prev-page-url',
  ...props,
});

describe('Pagination', () => {
  test('renders', () => {
    stubComponent({ name: 'ButtonWithArrow', mocks });
    const { asFragment } = render();
    expect(asFragment()).toMatchInlineSnapshot(`
      <DocumentFragment>
        <div
          class="m-auto flex items-center justify-center gap-3 pt-4"
        >
          <a
            class="inline-flex size-8 items-center justify-center rounded border"
            href="/prev-page-url"
            rel="prev"
          >
            <ButtonWithArrow />
          </a>
          <p
            class="text-sm"
          >
            1
            <span
              class="mx-1"
            >
              /
            </span>
            10
          </p>
          <a
            class="inline-flex size-8 items-center justify-center rounded border"
            href="/next-page-url"
            rel="next"
          >
            <ButtonWithArrow
              direction="right"
            />
          </a>
        </div>
      </DocumentFragment>
    `);
  });

  test('navigates to next page', () => {
    renderWithRoutes();
    const links = screen.getAllByRole('link') as HTMLAnchorElement[];
    act(() => {
      fireEvent.click(links[1]);
    });
    expect(screen.getByText('next page')).toBeInTheDocument();
  });

  test('navigates to prev page', () => {
    renderWithRoutes();
    const links = screen.getAllByRole('link') as HTMLAnchorElement[];
    act(() => {
      fireEvent.click(links[0]);
    });
    expect(screen.getByText('prev page')).toBeInTheDocument();
  });
});

function render(props?: Partial<PaginationProps>) {
  return renderWithProviders(<Pagination {...getProps(props)} />);
}

function renderWithRoutes(props?: Partial<PaginationProps>) {
  return renderWithProviders(
    <Routes>
      <Route index element={<Pagination {...getProps(props)} />} />
      <Route path="/prev-page-url" element={<div>prev page</div>} />
      <Route path="/next-page-url" element={<div>next page</div>} />
    </Routes>
  );
}
