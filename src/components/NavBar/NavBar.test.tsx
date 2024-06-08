import { NavBar } from './NavBar';

import { renderWithProviders } from '@/test/renderWithProviders';

describe('NavBar', () => {
  test('renders', () => {
    const component = renderWithProviders(<NavBar />);
    expect(component.asFragment()).toMatchInlineSnapshot(`
      <DocumentFragment>
        <nav
          class="fixed z-10 flex w-full items-center justify-between bg-primary p-4 "
        >
          <div
            class="flex items-center"
          >
            <a
              class="text-xl font-bold"
              href="/"
            >
              Vlickr
            </a>
            <img
              alt=""
              class="ml-2 h-5"
              src="/logo.svg"
            />
          </div>
        </nav>
      </DocumentFragment>
    `);
  });
});
