# NextJS

## 0

构建 `nextjs` 项目 `npx create-next-app`

从 `package.jaon` 中可以看到，启动命令是 `npm run dev` ，而 `npm run start` 则是生产环境的运行。因为 react 打包之后生成的全是静态文件，所以不需要有额外的生产环境命令。若要让 `nextjs` 也生成纯静态文件，则需要在 `package.json` 中额外加一条 `script` ：`"export": "next export",` ，但一定要确保网站是全静态且页面全部是可预生成的。