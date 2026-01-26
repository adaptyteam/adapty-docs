## Usage

### Basic Usage
```jsx
import ZoomImage from '@site/src/components/ZoomImage';

<ZoomImage id="create-paywall.gif" />
```

### With Custom Width
```jsx
<ZoomImage id="create-paywall.gif" width="500px" />
```

### With Alt Text and Custom Styles
```jsx
<ZoomImage 
  id="create-paywall.gif" 
  alt="Create paywall demonstration"
  width="800px"
  style={{ borderRadius: '8px' }}
/>
```

## Props

- `id` (string, required): The filename of the image (e.g., "create-paywall.gif")
- `width` (string, optional): Image width. Defaults to "700px"
- `alt` (string, optional): Alt text for accessibility
- `style` (object, optional): Additional CSS styles to apply
- `...props`: Any other props will be passed to the img element


