import { ImageGrid } from './ImageGrid';
import { useStore } from '@/store';
import type { ImageGridProps } from './types';

import { mockFlickrImage } from '@/test/mocks';
import { renderWithProviders } from '@/test/renderWithProviders';

const getProps = (props?: ImageGridProps): ImageGridProps => ({
  className: 'className',
  ...props,
});

describe('ImageGrid', () => {
  test('renders when nothing found', () => {
    useStore.setState({ searchTerm: 'Apples' });
    const component = render();
    expect(component.asFragment()).toMatchInlineSnapshot(`
      <DocumentFragment>
        <div
          class="text-center text-lg className"
        >
          No photos found for Apples.
        </div>
      </DocumentFragment>
    `);
  });

  test('renders when loading', () => {
    useStore.setState({ isLoading: true });
    const component = render();
    expect(component.asFragment()).toMatchInlineSnapshot(`<DocumentFragment />`);
  });

  test('renders when photos found', () => {
    useStore.setState({
      searchTerm: 'foo',
      isLoading: false,
      photos: [mockFlickrImage({ id: '12345' })],
    });
    const component = render();
    expect(component.asFragment()).toMatchInlineSnapshot(`
      <DocumentFragment>
        <div
          class="relative grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 className"
        >
          <div
            class="overflow-hidden rounded-lg bg-primary-accent transition-transform duration-100 hover:scale-105"
          >
            <a
              href="/photo/12345"
              role="link"
            >
              <img
                alt=""
                class="h-48 w-full object-cover"
                loading="lazy"
                src="url"
              />
            </a>
            <div
              class="p-4"
            >
              <h2
                class="line-clamp-2 text-lg font-bold leading-tight"
                title="title"
              >
                title
              </h2>
              <p
                class="text-sm"
              >
                by owner
              </p>
            </div>
          </div>
        </div>
      </DocumentFragment>
    `);
  });
});

function render(props?: Partial<ImageGridProps>) {
  return renderWithProviders(<ImageGrid {...getProps(props)} />);
}
