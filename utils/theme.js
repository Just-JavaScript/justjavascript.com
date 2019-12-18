export default {
  useColorSchemeMediaQuery: true,
  useCustomProperties: true,
  colors: {
    text: 'hsl(0, 0%, 10%)',
    background: 'hsl(0, 0%, 100%)',
    primary: '#F8E71C',
    secondary: '#FF1E88',
    modes: {
      dark: {
        text: 'hsl(0, 0%, 100%)',
        background: 'hsl(0, 0%, 5%)',
        primary: '#F8E71C',
        secondary: '#FF1E88',
      },
    },
  },
  fonts: {
    body: '"ff-meta-serif-web-pro", serif',
    heading: '"ff-meta-headline-web-pro", sans-serif',
  },
  buttons: {
    primary: {
      color: 'background',
      bg: 'text',
      borderRadius: 0,
      fontWeight: 'bold',
      fontFamily: 'heading',
      '&:hover': {
        bg: 'text',
      },
      ':before': {
        content: '""',
        position: 'absolute',
        width: '10px',
        pt: '36px',
        bg: 'primary',
        ml: '-21px',
        mt: '-2px',
      },
      ':focus': {
        outline: '2px solid',
        outlineOffset: '1px',
        outlineColor: 'primary',
      },
    },
  },
  forms: {
    input: {
      borderRadius: 0,
      border: '2px solid',
      borderColor: 'text',
      ':focus': {
        outline: '2px solid',
        outlineOffset: '1px',
        outlineColor: 'primary',
      },
    },
  },
  styles: {
    root: {
      py: [4, 5],
      px: 3,
      mx: 'auto',
      maxWidth: 832,
      color: 'text',
      bg: 'background',
    },
    a: {
      outlineColor: 'primary',
      textDecoration: 'underline',
    },
  },
}
