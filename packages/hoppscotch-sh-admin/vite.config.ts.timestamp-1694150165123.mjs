// vite.config.ts
import { defineConfig } from "file:///Users/zliu/Documents/hoppscotch/node_modules/.pnpm/registry.npmmirror.com+vite@3.2.7_@types+node@18.17.14_sass@1.66.1/node_modules/vite/dist/node/index.js";
import vue from "file:///Users/zliu/Documents/hoppscotch/node_modules/.pnpm/registry.npmmirror.com+@vitejs+plugin-vue@3.2.0_vite@3.2.7_vue@3.3.4/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import { FileSystemIconLoader } from "file:///Users/zliu/Documents/hoppscotch/node_modules/.pnpm/registry.npmmirror.com+unplugin-icons@0.14.15_@vue+compiler-sfc@3.3.4/node_modules/unplugin-icons/dist/loaders.mjs";
import Icons from "file:///Users/zliu/Documents/hoppscotch/node_modules/.pnpm/registry.npmmirror.com+unplugin-icons@0.14.15_@vue+compiler-sfc@3.3.4/node_modules/unplugin-icons/dist/vite.mjs";
import Unfonts from "file:///Users/zliu/Documents/hoppscotch/node_modules/.pnpm/registry.npmmirror.com+unplugin-fonts@1.0.3_vite@3.2.7/node_modules/unplugin-fonts/dist/vite.mjs";
import IconResolver from "file:///Users/zliu/Documents/hoppscotch/node_modules/.pnpm/registry.npmmirror.com+unplugin-icons@0.14.15_@vue+compiler-sfc@3.3.4/node_modules/unplugin-icons/dist/resolver.mjs";
import Components from "file:///Users/zliu/Documents/hoppscotch/node_modules/.pnpm/registry.npmmirror.com+unplugin-vue-components@0.21.2_vite@3.2.7_vue@3.3.4/node_modules/unplugin-vue-components/dist/vite.mjs";
import WindiCSS from "file:///Users/zliu/Documents/hoppscotch/node_modules/.pnpm/registry.npmmirror.com+vite-plugin-windicss@1.9.1_vite@3.2.7/node_modules/vite-plugin-windicss/dist/index.mjs";
import Pages from "file:///Users/zliu/Documents/hoppscotch/node_modules/.pnpm/registry.npmmirror.com+vite-plugin-pages@0.26.0_@vue+compiler-sfc@3.3.4_vite@3.2.7/node_modules/vite-plugin-pages/dist/index.mjs";
import Layouts from "file:///Users/zliu/Documents/hoppscotch/node_modules/.pnpm/registry.npmmirror.com+vite-plugin-vue-layouts@0.7.0_vite@3.2.7_vue-router@4.2.4_vue@3.3.4/node_modules/vite-plugin-vue-layouts/dist/index.mjs";
import VueI18n from "file:///Users/zliu/Documents/hoppscotch/node_modules/.pnpm/registry.npmmirror.com+@intlify+vite-plugin-vue-i18n@7.0.0_vite@3.2.7_vue-i18n@9.3.0/node_modules/@intlify/vite-plugin-vue-i18n/lib/index.mjs";
import path from "path";
import ImportMetaEnv from "file:///Users/zliu/Documents/hoppscotch/node_modules/.pnpm/registry.npmmirror.com+@import-meta-env+unplugin@0.4.9_@import-meta-env+cli@0.6.5_dotenv@16.3.1/node_modules/@import-meta-env/unplugin/dist/index.js";
var __vite_injected_original_dirname = "/Users/zliu/Documents/hoppscotch/packages/hoppscotch-sh-admin";
var vite_config_default = defineConfig({
  envPrefix: process.env.HOPP_ALLOW_RUNTIME_ENV ? "VITE_BUILDTIME_" : "VITE_",
  envDir: path.resolve(__vite_injected_original_dirname, "../.."),
  server: {
    port: 3100
  },
  resolve: {
    alias: {
      "~": path.resolve(__vite_injected_original_dirname, "../hoppscotch-sh-admin/src"),
      "@modules": path.resolve(__vite_injected_original_dirname, "../hoppscotch-sh-admin/src/modules")
    }
  },
  plugins: [
    vue(),
    Pages({
      dirs: "./src/pages",
      routeStyle: "nuxt"
    }),
    Layouts({
      defaultLayout: "default",
      layoutsDirs: "src/layouts"
    }),
    VueI18n({
      runtimeOnly: false,
      compositionOnly: true,
      include: [path.resolve(__vite_injected_original_dirname, "locales")]
    }),
    WindiCSS({
      root: path.resolve(__vite_injected_original_dirname)
    }),
    Components({
      dts: "./src/components.d.ts",
      dirs: ["./src/components"],
      directoryAsNamespace: true,
      resolvers: [
        IconResolver({
          prefix: "icon",
          customCollections: ["auth"]
        }),
        (compName) => {
          if (compName.startsWith("Hopp"))
            return { name: compName, from: "@hoppscotch/ui" };
          else
            return void 0;
        }
      ],
      types: [
        {
          from: "vue-tippy",
          names: ["Tippy"]
        }
      ]
    }),
    Icons({
      compiler: "vue3",
      customCollections: {
        auth: FileSystemIconLoader("../hoppscotch-sh-admin/assets/icons/auth")
      }
    }),
    Unfonts({
      fontsource: {
        families: [
          {
            name: "Inter Variable",
            variables: ["variable-full"]
          },
          {
            name: "Material Symbols Rounded Variable",
            variables: ["variable-full"]
          },
          {
            name: "Roboto Mono Variable",
            variables: ["variable-full"]
          }
        ]
      }
    }),
    process.env.HOPP_ALLOW_RUNTIME_ENV ? ImportMetaEnv.vite({
      example: "../../.env.example",
      env: "../../.env"
    }) : []
  ]
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMvemxpdS9Eb2N1bWVudHMvaG9wcHNjb3RjaC9wYWNrYWdlcy9ob3Bwc2NvdGNoLXNoLWFkbWluXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvVXNlcnMvemxpdS9Eb2N1bWVudHMvaG9wcHNjb3RjaC9wYWNrYWdlcy9ob3Bwc2NvdGNoLXNoLWFkbWluL3ZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9Vc2Vycy96bGl1L0RvY3VtZW50cy9ob3Bwc2NvdGNoL3BhY2thZ2VzL2hvcHBzY290Y2gtc2gtYWRtaW4vdml0ZS5jb25maWcudHNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJztcbmltcG9ydCB2dWUgZnJvbSAnQHZpdGVqcy9wbHVnaW4tdnVlJztcbmltcG9ydCB7IEZpbGVTeXN0ZW1JY29uTG9hZGVyIH0gZnJvbSAndW5wbHVnaW4taWNvbnMvbG9hZGVycyc7XG5pbXBvcnQgSWNvbnMgZnJvbSAndW5wbHVnaW4taWNvbnMvdml0ZSc7XG5pbXBvcnQgVW5mb250cyBmcm9tIFwidW5wbHVnaW4tZm9udHMvdml0ZVwiO1xuaW1wb3J0IEljb25SZXNvbHZlciBmcm9tICd1bnBsdWdpbi1pY29ucy9yZXNvbHZlcic7XG5pbXBvcnQgQ29tcG9uZW50cyBmcm9tICd1bnBsdWdpbi12dWUtY29tcG9uZW50cy92aXRlJztcbmltcG9ydCBXaW5kaUNTUyBmcm9tICd2aXRlLXBsdWdpbi13aW5kaWNzcyc7XG5pbXBvcnQgUGFnZXMgZnJvbSAndml0ZS1wbHVnaW4tcGFnZXMnO1xuaW1wb3J0IExheW91dHMgZnJvbSAndml0ZS1wbHVnaW4tdnVlLWxheW91dHMnO1xuaW1wb3J0IFZ1ZUkxOG4gZnJvbSAnQGludGxpZnkvdml0ZS1wbHVnaW4tdnVlLWkxOG4nO1xuaW1wb3J0IHBhdGggZnJvbSAncGF0aCc7XG5pbXBvcnQgSW1wb3J0TWV0YUVudiBmcm9tIFwiQGltcG9ydC1tZXRhLWVudi91bnBsdWdpblwiXG5cbi8vIGh0dHBzOi8vdml0ZWpzLmRldi9jb25maWcvXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xuICBlbnZQcmVmaXg6XG4gICAgcHJvY2Vzcy5lbnYuSE9QUF9BTExPV19SVU5USU1FX0VOVlxuICAgICAgPyBcIlZJVEVfQlVJTERUSU1FX1wiXG4gICAgICA6IFwiVklURV9cIixcbiAgZW52RGlyOiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCBcIi4uLy4uXCIpLFxuICBzZXJ2ZXI6IHtcbiAgICBwb3J0OiAzMTAwLFxuICB9LFxuICByZXNvbHZlOiB7XG4gICAgYWxpYXM6IHtcbiAgICAgICd+JzogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgJy4uL2hvcHBzY290Y2gtc2gtYWRtaW4vc3JjJyksXG4gICAgICAnQG1vZHVsZXMnOiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAnLi4vaG9wcHNjb3RjaC1zaC1hZG1pbi9zcmMvbW9kdWxlcycpLFxuICAgIH0sXG4gIH0sXG4gIHBsdWdpbnM6IFtcbiAgICB2dWUoKSxcbiAgICBQYWdlcyh7XG4gICAgICBkaXJzOiAnLi9zcmMvcGFnZXMnLFxuICAgICAgcm91dGVTdHlsZTogJ251eHQnLFxuICAgIH0pLFxuICAgIExheW91dHMoe1xuICAgICAgZGVmYXVsdExheW91dDogJ2RlZmF1bHQnLFxuICAgICAgbGF5b3V0c0RpcnM6ICdzcmMvbGF5b3V0cycsXG4gICAgfSksXG4gICAgVnVlSTE4bih7XG4gICAgICBydW50aW1lT25seTogZmFsc2UsXG4gICAgICBjb21wb3NpdGlvbk9ubHk6IHRydWUsXG4gICAgICBpbmNsdWRlOiBbcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgJ2xvY2FsZXMnKV0sXG4gICAgfSksXG4gICAgV2luZGlDU1Moe1xuICAgICAgcm9vdDogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSksXG4gICAgfSksXG4gICAgQ29tcG9uZW50cyh7XG4gICAgICBkdHM6ICcuL3NyYy9jb21wb25lbnRzLmQudHMnLFxuICAgICAgZGlyczogWycuL3NyYy9jb21wb25lbnRzJ10sXG4gICAgICBkaXJlY3RvcnlBc05hbWVzcGFjZTogdHJ1ZSxcbiAgICAgIHJlc29sdmVyczogW1xuICAgICAgICBJY29uUmVzb2x2ZXIoe1xuICAgICAgICAgIHByZWZpeDogJ2ljb24nLFxuICAgICAgICAgIGN1c3RvbUNvbGxlY3Rpb25zOiBbJ2F1dGgnXSxcbiAgICAgICAgfSksXG4gICAgICAgIChjb21wTmFtZTogc3RyaW5nKSA9PiB7XG4gICAgICAgICAgaWYgKGNvbXBOYW1lLnN0YXJ0c1dpdGgoJ0hvcHAnKSlcbiAgICAgICAgICAgIHJldHVybiB7IG5hbWU6IGNvbXBOYW1lLCBmcm9tOiAnQGhvcHBzY290Y2gvdWknIH07XG4gICAgICAgICAgZWxzZSByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgICB9LFxuICAgICAgXSxcbiAgICAgIHR5cGVzOiBbXG4gICAgICAgIHtcbiAgICAgICAgICBmcm9tOiAndnVlLXRpcHB5JyxcbiAgICAgICAgICBuYW1lczogWydUaXBweSddLFxuICAgICAgICB9LFxuICAgICAgXSxcbiAgICB9KSxcbiAgICBJY29ucyh7XG4gICAgICBjb21waWxlcjogJ3Z1ZTMnLFxuICAgICAgY3VzdG9tQ29sbGVjdGlvbnM6IHtcbiAgICAgICAgYXV0aDogRmlsZVN5c3RlbUljb25Mb2FkZXIoJy4uL2hvcHBzY290Y2gtc2gtYWRtaW4vYXNzZXRzL2ljb25zL2F1dGgnKSxcbiAgICAgIH0sXG4gICAgfSksXG4gICAgVW5mb250cyh7XG4gICAgICBmb250c291cmNlOiB7XG4gICAgICAgIGZhbWlsaWVzOiBbXG4gICAgICAgICAge1xuICAgICAgICAgICAgbmFtZTogXCJJbnRlciBWYXJpYWJsZVwiLFxuICAgICAgICAgICAgdmFyaWFibGVzOiBbXCJ2YXJpYWJsZS1mdWxsXCJdLFxuICAgICAgICAgIH0sXG4gICAgICAgICAge1xuICAgICAgICAgICAgbmFtZTogXCJNYXRlcmlhbCBTeW1ib2xzIFJvdW5kZWQgVmFyaWFibGVcIixcbiAgICAgICAgICAgIHZhcmlhYmxlczogW1widmFyaWFibGUtZnVsbFwiXSxcbiAgICAgICAgICB9LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIG5hbWU6IFwiUm9ib3RvIE1vbm8gVmFyaWFibGVcIixcbiAgICAgICAgICAgIHZhcmlhYmxlczogW1widmFyaWFibGUtZnVsbFwiXSxcbiAgICAgICAgICB9LFxuICAgICAgICBdLFxuICAgICAgfVxuICAgIH0pLFxuICAgIHByb2Nlc3MuZW52LkhPUFBfQUxMT1dfUlVOVElNRV9FTlZcbiAgICAgID8gIEltcG9ydE1ldGFFbnYudml0ZSh7XG4gICAgICAgICAgZXhhbXBsZTogXCIuLi8uLi8uZW52LmV4YW1wbGVcIixcbiAgICAgICAgICBlbnY6IFwiLi4vLi4vLmVudlwiLFxuICAgICAgICB9KVxuICAgICAgOiBbXSxcbiAgXSxcbn0pO1xuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUF5VyxTQUFTLG9CQUFvQjtBQUN0WSxPQUFPLFNBQVM7QUFDaEIsU0FBUyw0QkFBNEI7QUFDckMsT0FBTyxXQUFXO0FBQ2xCLE9BQU8sYUFBYTtBQUNwQixPQUFPLGtCQUFrQjtBQUN6QixPQUFPLGdCQUFnQjtBQUN2QixPQUFPLGNBQWM7QUFDckIsT0FBTyxXQUFXO0FBQ2xCLE9BQU8sYUFBYTtBQUNwQixPQUFPLGFBQWE7QUFDcEIsT0FBTyxVQUFVO0FBQ2pCLE9BQU8sbUJBQW1CO0FBWjFCLElBQU0sbUNBQW1DO0FBZXpDLElBQU8sc0JBQVEsYUFBYTtBQUFBLEVBQzFCLFdBQ0UsUUFBUSxJQUFJLHlCQUNSLG9CQUNBO0FBQUEsRUFDTixRQUFRLEtBQUssUUFBUSxrQ0FBVyxPQUFPO0FBQUEsRUFDdkMsUUFBUTtBQUFBLElBQ04sTUFBTTtBQUFBLEVBQ1I7QUFBQSxFQUNBLFNBQVM7QUFBQSxJQUNQLE9BQU87QUFBQSxNQUNMLEtBQUssS0FBSyxRQUFRLGtDQUFXLDRCQUE0QjtBQUFBLE1BQ3pELFlBQVksS0FBSyxRQUFRLGtDQUFXLG9DQUFvQztBQUFBLElBQzFFO0FBQUEsRUFDRjtBQUFBLEVBQ0EsU0FBUztBQUFBLElBQ1AsSUFBSTtBQUFBLElBQ0osTUFBTTtBQUFBLE1BQ0osTUFBTTtBQUFBLE1BQ04sWUFBWTtBQUFBLElBQ2QsQ0FBQztBQUFBLElBQ0QsUUFBUTtBQUFBLE1BQ04sZUFBZTtBQUFBLE1BQ2YsYUFBYTtBQUFBLElBQ2YsQ0FBQztBQUFBLElBQ0QsUUFBUTtBQUFBLE1BQ04sYUFBYTtBQUFBLE1BQ2IsaUJBQWlCO0FBQUEsTUFDakIsU0FBUyxDQUFDLEtBQUssUUFBUSxrQ0FBVyxTQUFTLENBQUM7QUFBQSxJQUM5QyxDQUFDO0FBQUEsSUFDRCxTQUFTO0FBQUEsTUFDUCxNQUFNLEtBQUssUUFBUSxnQ0FBUztBQUFBLElBQzlCLENBQUM7QUFBQSxJQUNELFdBQVc7QUFBQSxNQUNULEtBQUs7QUFBQSxNQUNMLE1BQU0sQ0FBQyxrQkFBa0I7QUFBQSxNQUN6QixzQkFBc0I7QUFBQSxNQUN0QixXQUFXO0FBQUEsUUFDVCxhQUFhO0FBQUEsVUFDWCxRQUFRO0FBQUEsVUFDUixtQkFBbUIsQ0FBQyxNQUFNO0FBQUEsUUFDNUIsQ0FBQztBQUFBLFFBQ0QsQ0FBQyxhQUFxQjtBQUNwQixjQUFJLFNBQVMsV0FBVyxNQUFNO0FBQzVCLG1CQUFPLEVBQUUsTUFBTSxVQUFVLE1BQU0saUJBQWlCO0FBQUE7QUFDN0MsbUJBQU87QUFBQSxRQUNkO0FBQUEsTUFDRjtBQUFBLE1BQ0EsT0FBTztBQUFBLFFBQ0w7QUFBQSxVQUNFLE1BQU07QUFBQSxVQUNOLE9BQU8sQ0FBQyxPQUFPO0FBQUEsUUFDakI7QUFBQSxNQUNGO0FBQUEsSUFDRixDQUFDO0FBQUEsSUFDRCxNQUFNO0FBQUEsTUFDSixVQUFVO0FBQUEsTUFDVixtQkFBbUI7QUFBQSxRQUNqQixNQUFNLHFCQUFxQiwwQ0FBMEM7QUFBQSxNQUN2RTtBQUFBLElBQ0YsQ0FBQztBQUFBLElBQ0QsUUFBUTtBQUFBLE1BQ04sWUFBWTtBQUFBLFFBQ1YsVUFBVTtBQUFBLFVBQ1I7QUFBQSxZQUNFLE1BQU07QUFBQSxZQUNOLFdBQVcsQ0FBQyxlQUFlO0FBQUEsVUFDN0I7QUFBQSxVQUNBO0FBQUEsWUFDRSxNQUFNO0FBQUEsWUFDTixXQUFXLENBQUMsZUFBZTtBQUFBLFVBQzdCO0FBQUEsVUFDQTtBQUFBLFlBQ0UsTUFBTTtBQUFBLFlBQ04sV0FBVyxDQUFDLGVBQWU7QUFBQSxVQUM3QjtBQUFBLFFBQ0Y7QUFBQSxNQUNGO0FBQUEsSUFDRixDQUFDO0FBQUEsSUFDRCxRQUFRLElBQUkseUJBQ1AsY0FBYyxLQUFLO0FBQUEsTUFDbEIsU0FBUztBQUFBLE1BQ1QsS0FBSztBQUFBLElBQ1AsQ0FBQyxJQUNELENBQUM7QUFBQSxFQUNQO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
