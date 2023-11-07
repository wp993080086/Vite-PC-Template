<div align=center>
  
![vite](https://img.shields.io/badge/2.9.5-vite-orange)
![typeScript](https://img.shields.io/badge/4.4.0-typeScript-lightgrey)
![vue](https://img.shields.io/badge/3.2.33-vue-brightgreen)
  
</div>
<div align=center>

![axios](https://img.shields.io/badge/0.26.1-axios-ff69b4)
![vue-router](https://img.shields.io/badge/4.0.14-vue%20router-blueviolet)
![pinia](https://img.shields.io/badge/2.0.13-pinia-yellow)
![element-plus](https://img.shields.io/badge/2.1.11-element--plus-409EFF)
![nprogress](https://img.shields.io/badge/0.2.0-nprogress-red)
![sass](https://img.shields.io/badge/1.50.1-sass-orange)

</div>

# ⚡️ 简介

一个开箱即用，基于 `vite 4` + `vue 3` + `typeScript 5` + `element Plus` + `pinia` + `vue-router 4` 的PC端项目模板。

# 🚀 开发

1. 安装

```
npm install
```

2. 运行

```
npm run serve
```

> 如果不需要使用jsx/tsx，请做如下操作。

- 删除`tsconfig.json`文件里的 `"plugins": [{"name": "typescript-plugin-css-modules"}]`
- 删除`vite.config.ts`文件里的 `requireModuleExtension: true`

> 否则，请在根目录创建.vscode文件夹，并创建settings.json文件，并写入如下代码

```
{
  "typescript.tsdk": "node_modules/typescript/lib",
  "typescript.enablePromptUseWorkspaceTsdk": true
}
```

# 📦️ 多环境打包

- 测试环境打包

```
npm run build_test
```

- 生产环境打包

```
npm run build
```

# 🔧 代码检查修复

- 格式检查

```
npm run lint
```

- 自动修复

```
npm run lint-fix
```

# 📚 目录

```
│  .env.development
│  .env.production
│  .env.test
│  .eslintignore
│  .eslintrc.js
│  .gitignore
│  .lintstagedrc.json
│  .prettierignore
│  .prettierrc.js
│  favicon.ico
│  index.html
│  package-lock.json
│  package.json
│  README.md
│  tsconfig.json
│  vite.config.ts
├─.husky
│  │  pre-commit
│  │
│  └─
│    .gitignore
│    husky.sh
│
├─mock
├─public
│      favicon.ico
│
└─src
    │  App.vue
    │  main.ts
    │
    ├─assets
    │  ├─font
    │  ├─icon
    │  ├─images
    │  │      404.png
    │  │      logo.png
    │  │
    │  └─styles
    │          colors.css
    │          reset.css
    │
    ├─components
    │  │  HelloWorld.vue
    │  │
    │  ├─dialog
    │  └─svgIcon
    ├─constants
    │      index.ts
    │
    ├─layouts
    │  ├─header
    │  │      index.vue
    │  │
    │  └─menu
    │          index.vue
    │          menu-item.vue
    │
    ├─pages
    │  ├─base
    │  │  │  not-found.vue
    │  │  │
    │  │  └─login
    │  │          index.vue
    │  │
    │  └─home
    │          index.vue
    │
    ├─router
    │  │  index.ts
    │  │
    │  └─routers
    │          base.ts
    │
    ├─servers
    │  │  request.ts
    │  │
    │  └─api
    │      ├─files
    │      │      index.ts
    │      │
    │      └─login
    │              index.ts
    │
    ├─static
    │  ├─audio
    │  └─video
    ├─store
    │  │  index.ts
    │  │
    │  └─modules
    │      ├─menu
    │      │      index.ts
    │      │
    │      └─user
    │              index.ts
    │
    ├─types
    │  │  common.d.ts
    │  │  declare.d.ts
    │  │  shim.d.ts
    │  │  source.d.ts
    │  │
    │  ├─servers
    │  │      files.d.ts
    │  │      login.d.ts
    │  │
    │  └─store
    │          menu.d.ts
    │          user.d.ts
    │
    └─utils
            cookie.ts
            index.ts
            loading.ts
            storage.ts
            toast.ts
            token.ts
```
