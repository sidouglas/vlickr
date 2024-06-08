import { stubComponent, unStubComponent } from '@/test/stubComponent';
import { NavBarSearch } from './NavBarSearch';
import { renderWithProviders } from '@/test/renderWithProviders';
import { fireEvent, screen } from '@testing-library/react';
import { useStore } from '@/store';
import { act } from 'react';

const mocks = vi.hoisted(() => ({
  SearchForm: vi.fn(),
}));

const navigateMock = vi.fn();

vi.mock('../SearchForm', () => ({ SearchForm: mocks.SearchForm }));
vi.mock('react-router-dom', async () => {
  const originalModule = await vi.importActual('react-router-dom');
  return {
    ...originalModule,
    useNavigate: () => navigateMock,
  };
});

describe('NavBarSearch', () => {
  test('renders', () => {
    stubComponent({ name: 'SearchForm', mocks, ignorePropKeys: '*' });
    const component = render();
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
          <SearchForm />
        </nav>
      </DocumentFragment>
    `);
  });

  test('sets search term when SearchForm changes', () => {
    useStore.setState({
      pagination: {
        nextPageUrl: '',
        page: 100,
        pages: 100,
        perpage: 100,
        prevPageUrl: '',
        total: 100,
      },
    });

    const value = 'test-value';
    stubComponent({
      el: 'input',
      name: 'SearchForm',
      mocks,
      proxyEventHandlers: {
        handleOnChange: ['change', value],
      },
    });
    const { getByTestId } = render();
    const searchInput = getByTestId('SearchForm');

    fireEvent.change(searchInput, { target: { value } });
    const storeState = useStore.getState();
    expect(storeState.searchTerm).toEqual('test-value');
    expect(storeState.pagination?.page).toEqual(1);
    expect(navigateMock).toHaveBeenCalledWith('/');
  });

  test('handles submit', async () => {
    await unStubComponent('../SearchForm', mocks);
    render(<NavBarSearch />);
    const input = screen.getByRole('textbox');
    expect(navigateMock).not.toHaveBeenCalled();
    act(() => {
      fireEvent.submit(input, { target: { value: 'new search item' } });
    });
    const storeState = useStore.getState();
    expect(storeState.searchTerm).toEqual('new search item');
    expect(storeState.pagination?.page).toEqual(1);
    expect(navigateMock).toHaveBeenCalledWith('/');
  });
});

function render(ui = <NavBarSearch />) {
  return renderWithProviders(ui);
}
