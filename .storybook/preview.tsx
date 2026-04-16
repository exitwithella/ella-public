import './storybook.css'
import './ella.css'
import type { Preview } from '@storybook/react-vite'

const preview: Preview = {
  parameters: {
    layout: 'fullscreen',
  },
  globalTypes: {
    theme: {
      description: 'ELLA theme',
      toolbar: {
        title: 'Theme',
        items: [
          { value: 'sandstone', title: 'Sandstone (default)' },
          { value: 'white', title: 'White' },
          { value: 'mint', title: 'Mint' },
          { value: 'goldenrod', title: 'Goldenrod' },
          { value: 'ash', title: 'Ash' },
          { value: 'forest', title: 'Forest (dark)' },
          { value: 'tannery', title: 'Tannery (dark)' },
          { value: 'leather', title: 'Leather (dark)' },
          { value: 'ocean', title: 'Ocean (dark)' },
          { value: 'brand-black', title: 'Brand Black (dark)' },
        ],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: {
    theme: 'sandstone',
  },
  decorators: [
    (Story, context) => {
      const theme = context.globals.theme || 'sandstone'
      return (
        <div data-theme={theme} className="bg-theme-bg text-theme-text min-h-screen">
          <Story />
        </div>
      )
    },
  ],
}
export default preview
