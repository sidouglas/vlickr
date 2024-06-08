import { fireEvent } from '@testing-library/react';
import { ImageSrcSet } from './ImageSrcSet';
import type { ImageSrcSetProps } from './types';
import { screen } from '@testing-library/dom';
import { useStore } from '@/store';
import { act } from 'react';
import { renderWithProviders } from '@/test/renderWithProviders';
import { getStubProps, stubComponent } from '@/test/stubComponent';

const mocks = vi.hoisted(() => ({
  Image: vi.fn(),
  useQuery: vi.fn(),
}));

vi.mock('./Image', () => ({ Image: mocks.Image }));
vi.mock('@/api/useQueryImageSizes', () => ({ useQueryImageSizes: mocks.useQuery }));

const getProps = (props?: Partial<ImageSrcSetProps>): ImageSrcSetProps => ({
  id: 'id',
  maxWidth: 500,
  ...props,
});
describe('ImageSrcSet', () => {
  test('renders with correct aspect ratio', async () => {
    mocks.useQuery.mockReturnValue({
      data: {
        sizes: {
          size: [
            { source: 'https://source1', width: 100, height: 50 },
            { source: 'https://source2', width: 200, height: 100 },
            { source: 'https://source3', width: 300, height: 300 },
          ],
        },
      },
    });

    const event = {
      currentTarget: {
        currentSrc: 'new-1600-900-image',
        naturalHeight: 900,
        naturalWidth: 1600,
      },
    };
    stubComponent({
      el: 'img',
      mocks,
      name: 'Image',
      proxyEventHandlers: { onLoad: ['onLoad', event] },
    });
    const onLoad = vi.fn();
    render({ onLoad });

    act(() => void fireEvent.load(screen.getByRole('img')));
    expect(onLoad).toHaveBeenCalled();
    expect(getStubProps<{ srcSet: string }>('Image', 'srcSet')).toEqual(
      'https://source1 100w, https://source2 200w, https://source3 300w'
    );
    expect(getStubProps<{ style: { aspectRatio: string } }>('Image', 'style')).toEqual({
      aspectRatio: '16/9',
    });
  });

  test('sets error message when image fails to load', async () => {
    mocks.useQuery.mockReturnValue({ error: 'error' });
    render();
    expect(useStore.getState().error).toEqual(
      'Sorry, something went wrong and we could not load the image.'
    );
  });
});

const render = (props?: Partial<ImageSrcSetProps>) => {
  return renderWithProviders(<ImageSrcSet {...getProps(props)} />);
};
