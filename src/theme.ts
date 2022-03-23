import { extendTheme, type ThemeConfig } from "@chakra-ui/react";

const config: ThemeConfig = {
  initialColorMode: "light",
  useSystemColorMode: false,
};

export const theme = extendTheme({
  config,
  components: {
    Button: {
      baseStyle: {
        _focus: {
          boxShadow: "none",
        },
      },
    },
  },
});
