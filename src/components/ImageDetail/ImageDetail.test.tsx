import { act, fireEvent, screen } from '@testing-library/react';
import { ImageDetail } from './ImageDetail';
import type { ImageDetailProps } from './types';
import { mockFlickrImageDetail } from '@/test/mocks';
import { getStubProps, stubComponent } from '@/test/stubComponent';
import { ImageSrcSetProps } from '../ImageSrcSet';
import { AnimateHeightProps } from 'react-animate-height';
import { renderWithProviders } from '@/test/renderWithProviders';

const mocks = vi.hoisted(() => ({
  ImageSrcSet: vi.fn(),
  LoaderOverlaid: vi.fn(),
  AnimateHeight: vi.fn(),
  Link: vi.fn(),
}));
vi.mock('../ImageSrcSet', () => ({ ImageSrcSet: mocks.ImageSrcSet }));
vi.mock('../LoaderOverlaid/LoaderOverlaid', () => ({
  LoaderOverlaid: mocks.LoaderOverlaid,
}));

vi.mock('react-animate-height', () => ({
  default: mocks.AnimateHeight,
}));

describe('ImageDetail', () => {
  test('renders with loader', () => {
    stubComponent({ name: 'LoaderOverlaid', mocks });
    stubComponent({
      name: 'AnimateHeight',
      mocks,
      shouldRenderChildren: true,
      ignorePropKeys: '*',
    });
    stubComponent({ name: 'ImageSrcSet', mocks, ignorePropKeys: '*' });
    const component = render();
    expect(component.asFragment()).toMatchInlineSnapshot(`
      <DocumentFragment>
        <div
          class="m-auto max-w-4xl flex-col items-center text-base"
        >
          <figure
            class="w-full rounded-lg bg-muted p-4 shadow-lg"
          >
            <div
              class="relative text-primary"
            >
              <LoaderOverlaid />
              <AnimateHeight>
                <ImageSrcSet />
              </AnimateHeight>
            </div>
            <figcaption
              class="mt-4"
            >
              <dl
                class="grid grid-cols-[min-content_1fr] gap-x-4"
              >
                <dt
                  class="min-w-[100px]"
                >
                  Title:
                </dt>
                <dd
                  class="grow"
                >
                  title
                </dd>
                <dt>
                  Posted on:
                </dt>
                <dd
                  class="overflow-hidden text-ellipsis"
                >
                  Mon Jan 01 2024
                </dd>
                <dt>
                  Owner:
                </dt>
                <dd>
                  username
                </dd>
                <dt>
                  Views:
                </dt>
                <dd>
                  0
                </dd>
                <dt>
                  Description:
                </dt>
                <dd
                  class="overflow-hidden text-ellipsis"
                >
                  description
                </dd>
              </dl>
            </figcaption>
          </figure>
        </div>
      </DocumentFragment>
    `);
  });

  test('handles page change', () => {
    const onPageChange = vi.fn();
    stubComponent<ImageSrcSetProps, typeof mocks>({
      el: 'img',
      name: 'ImageSrcSet',
      mocks,
    });
    render({
      onPageChange,
      pagination: {
        prevPhoto: {
          id: 'prev',
          url: '/prev',
        },
        nextPhoto: {
          id: 'next',
          url: '/next',
        },
      },
    });
    act(() => {
      const next = screen.getByText(/next page/i);
      const prev = screen.getByText(/previous page/i);
      fireEvent.click(next);

      expect(onPageChange).toHaveBeenCalledWith('next');

      fireEvent.click(prev);
      expect(onPageChange).toHaveBeenCalledWith('prev');
    });
  });

  test('sets the image height to 400', () => {
    const onPageChange = vi.fn();
    stubComponent({
      name: 'LoaderOverlaid',
      mocks,
    });
    stubComponent<ImageSrcSetProps, typeof mocks>({
      el: 'img',
      name: 'ImageSrcSet',
      mocks,
      proxyEventHandlers: {
        onLoad: ['onLoad', vi.fn(), { renderedSize: [100, 400] }],
      },
    });
    stubComponent({
      name: 'AnimateHeight',
      mocks,
      shouldRenderChildren: true,
    });
    render({
      onPageChange,
      pagination: {
        prevPhoto: {
          id: 'prev',
          url: '/prev',
        },
        nextPhoto: {
          id: 'next',
          url: '/next',
        },
      },
    });
    expect(screen.getByTestId('LoaderOverlaid')).toBeVisible();
    act(() => {
      fireEvent.load(screen.getByTestId('ImageSrcSet'));
    });
    expect(getStubProps<AnimateHeightProps>('AnimateHeight')).toEqual({
      height: 400,
      duration: 300,
    });
    expect(screen.queryByTestId('LoaderOverlaid')).toBeFalsy();
  });
});

function render(props?: Partial<ImageDetailProps>) {
  return renderWithProviders(<ImageDetail {...getProps(props)} />);
}

function getProps(props?: Partial<ImageDetailProps>) {
  return { photo: mockFlickrImageDetail(), onPageChange: vi.fn(), ...props };
}
