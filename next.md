# NextJS 学习笔记

## -1. 前端基础渲染模式

CSR、SSR、同构、SSG、ISG



### 客户端渲染（CSR）

常见的前端框架像 `React` 、`Vue` 等都是 `CSR` ，将网页的渲染过程从服务器端移至客户端浏览器执行，整个项目打包结果均为静态文件，且通常只有一个 html 文件，该文档只包含基本的骨架结构，通过浏览器下载和执行 `JavaScript` 代码，通过与服务器进行数据交互，动态地生成和更新页面的内容。

但 `CSR` 也有一些问题：

- SEO

- 在组件树首次渲染完之前，页面上无法展示任何内容，且低端设备上 JS 执行效率低，白屏时间长。
- 数据请求必须等到所属组件开始渲染才能发出去，弱网环境下数据返回慢，loading 时间长。



### 服务端渲染（SSR）

早期解决方案像 `PHP` 、`JSP` 等就是服务端渲染，将网页的渲染过程完全或部分地在服务器端执行，当用户访问一个网页时，服务器会根据请求动态生成完整的HTML文档，包括页面的内容和结构，然后将生成的HTML发送给客户端浏览器进行显示。

早期这种技术有一些局限性：

- 较少的动态交互性：由于页面的渲染过程在服务器端完成，客户端浏览器接收到的HTML文档是静态的，限制了一些动态交互功能。
- 对服务器的压力较大：由于每次请求都需要服务器进行渲染和生成HTML文档，对服务器的计算资源和性能要求较高。

针对此提出了动静分离与前后端分层，也即之前提到的 `CSR` ，自此进入了 `CSR` 的黄金时代。但随着技术的不断精进，这些问题好像也不那么棘手了，反而 `CSR` 的问题更让人难以接受，故 `SSR` 有东山再起之势。



### 同构渲染

首屏 SSR，其他界面 CSR，可以在保留了 CSR 几乎所有优点的同时，解决首页白屏的问题，但还是无法解决 SEO 的问题。我之前写小项目的时候用过这种方案，但不知道这就是同构渲染，同时还要在首页 SSR 的同时在后台加载 CSR 项目，比较麻烦。



### NextJS 中的渲染模式

还在看





## 0. 创建 demo

构建 `nextjs` 项目 `npx create-next-app`

从 `package.jaon` 中可以看到，启动命令是 `npm run dev` ，而 `npm run start` 则是生产环境的运行。因为 `react` 打包之后生成的全是静态文件，所以不需要有额外的生产环境命令。若要让 `nextjs` 也生成纯静态文件，则需要在 `package.json` 中额外加一条 `script` ：`"export": "next export",` ，但一定要确保网站是全静态且页面全部是可预生成的。



## 1. 目录结构

Next 13 更新了目录结构，由原来的 pages 目录模式变为了 app 目录模式，由于我是从 13 开始学习的，故不讨论两者的优劣，直接使用 app 目录模式。



### 约定页面相关内容

约定了每一个页面都需要有一个单独的目录，目录下约定了一些文件，均不需要手动引用，next 会按照约定读取：

- `page.tsx` - 页面组件，类似 index.tsx。有 page.tsx 才能表明该路由是一个页面。
- `layout.tsx` - 布局组件，切换路由时保留状态，不重新渲染。
- `template.tsx` - 模版组件，和 `layout` 类似，但切换路由时会重新渲染，不保留状态。
- `loading.tsx` - 加载组件，就是使用 `Suspense` 组件包裹 `Page` 组件，在 `Page` 组件渲染返回内容之前显示加载组件。
- `error.tsx` - 错误文件，页面渲染异常的时候显示的组件。
- `not-found.tsx` - 页面 404 组件，只在 `app` 目录下第一级目录生效，存在时只有根 `layout` 生效。

一个常规的包含二级路由的目录结构如下：

```tree
app
├── MlTest
│   ├── M2Test
│   │   └── page.tsx
│   ├── layout.tsx
│   ├── template.tsx
│   ├── loading.tsx
│   └── error.tsx
├── page.tsx
├── layout.tsx
├── template.tsx
├── loading.tsx
├── error.tsx
└── not-found.tsx
```

此时进入 `/`、`/MlTest/M2Test` 均可看到相应界面，而 `/MlTest` 则会返回 404 页面，也即 app 下的 not-found.tsx 组件。



### 平行路由和插槽功能











## n. td 项目

[link](https://www.youtube.com/watch?v=NgayZAuTgwM)

`npx create-next-app` 初始化



### 添加 prisma

`npm i prisma --save-dev`

`npx prisma init --datasource-provider sqlite` 使用 `prisma`

修改 `todolist/prisma/schema.prisma` 以添加新的 `model`

`npx prisma migrate dev --name init `

根据[这篇文档](https://www.prisma.io/docs/guides/other/troubleshooting-orm/help-articles/nextjs-prisma-client-dev-practices)，在 src 下新建 `db.ts`，写入以下文件：

```ts
import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const prisma = globalForPrisma.prisma ?? new PrismaClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
```

目的是为了使 next 热更新的时候忽略掉 prisma



### 客户端

目录结构如下：

```tree
src
├── app
│   ├── new
│   │   └── page.tsx
│   ├── favicon.ico
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components
│   └── TodoItem
│       └── index.tsx
└── db.ts
```

在 `src/app/page.tsx` 中添加路由跳转链接：

```tsx
<Link href="/new">New</Link>
```

此时，点击 “New” 的时候，并没有进行整页刷新，而是像常规的 React 一样仅进行客户端路由的跳转。



### 服务端渲染

如果想要动态获取 todo 项，在通常的 react 项目中需要额外发送 ajax/fetch 请求，但是在 next 中，可以用服务端组件实现这一功能，只要使用 app router，就不需要其他额外操作。

只需要将 `export default function Home() {}` 改成 `export default async function Home() {}`，即可在里面通过 `await` 访问到服务端所有数据。例如：

```jsx
const todos = await prisma.todo.findMany()
```

这时，实际上 todos 就是从数据库里读取的了。

而这个过程发生在服务器上，服务器生成了所有 HTML 并将其发送到客户端。

但此时数据库中没有任何数据。

在组件中添加下述代码：

```jsx
await prisma.todo.create({
  data: {
    title: "test",
    complete: false
  }
})
```

如果这段代码写在组件内部，则每次渲染组件的时候都会往数据库中添加一条数据，会发现每次刷新页面，都会多出一条数据。此时再把这段逻辑删掉，页面上数据不会增加了，但之前的数据还在，因为数据库中已经添加过数据了，而这一切都写在 react 组件内部，但事件却发生在服务端。



### 添加数据

添加数据的逻辑应该写在 `src/app/new/page.tsx` 下，

在里面定义一个添加数据的函数：

```tsx
async function createTodo(data: FormData) {
  "use server"
  
  console.log(data)
}
```

其中，这个函数要处理用户提交的表单，所以我们希望它只在服务端运行，这时就需要在函数内部声明一下：`use server`。

但此时页面会报错：

```
./src/app/new/page.tsx
Error: 
  x To use Server Actions, please enable the feature flag in your Next.js config. Read more: https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions#convention
```

因为这个功能现在还是实验性的，所以要更改一下 `next.config.js` 配置项：

```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
  }
}

module.exports = nextConfig
```

此时，直接 `<form action={createTodo}` 即可将 `createTodo` 函数绑定到用户提交的表单上，点击 `Create` 即可调用该函数。

其中，`createTodo` 内部的 `console.log` 并不会在浏览器控制台打印任何东西，因为它是一个纯粹的服务端函数，只会在服务端运行，`console.log` 只会在启动 `next` 项目的终端打印。



### 出问题了

在 `/new` 页面添加完成之后，返回主页，此时 `list` 并不会更新，刷新之后才会展示最新的 `list`。

奇怪的是，这个 `bug` 并不是每次都会出现，每次添加都有概率展示最新的 `list`，而且似乎也没有什么规律。

博主的视频里是每次都可以展示最新 `list` 的，但是我把他代码拉下来之后仍然有同样的错误。

在 `next` 的控制台中可以看到这样的错误：

![image-20230726下午95257402](https://blog-oss.kbm.ink/135257.png)

```
failed to get redirect response TypeError: fetch failed
    at Object.fetch (/Users/modao/Documents/pers/nextjsl/todolist/node_modules/next/dist/compiled/undici/index.js:1:26669) {
  cause: RequestContentLengthMismatchError: Request body length does not match content-length header
      at write (/Users/modao/Documents/pers/nextjsl/todolist/node_modules/next/dist/compiled/undici/index.js:1:67105)
      at _resume (/Users/modao/Documents/pers/nextjsl/todolist/node_modules/next/dist/compiled/undici/index.js:1:66726)
      at resume (/Users/modao/Documents/pers/nextjsl/todolist/node_modules/next/dist/compiled/undici/index.js:1:65413)
      at connect (/Users/modao/Documents/pers/nextjsl/todolist/node_modules/next/dist/compiled/undici/index.js:1:65301) {
    code: 'UND_ERR_REQ_CONTENT_LENGTH_MISMATCH'
  }
}
```

看起来好像是 `fetch` 的时候出现了错误？

把报错信息放到 `google` 中搜了一下，结果五花八门，我尝试加各种关键词，但都没有什么有用的信息。我意识到我根本不知道这个错误是从哪一环报出来的，是 `next` 还是 `prisma` ？亦或者是我的 `sqlite` 有问题？我甚至不知道 `prisma` 是怎么调的数据库，这个项目中我陌生的领域太多了，导致出现错误我都无法定位，只能像只耗子一样乱撞。

所以，到此为止了，过阵子找个新的项目练手，或者拿着官方文档硬啃。

很烦





























> 参考资料：
>
> [SSR 与当年的 JSP、PHP 有什么区别？](https://segmentfault.com/a/1190000037793694)
>
> [鱼和熊掌兼得：Next.js 混合渲染](https://segmentfault.com/a/1190000039111126)
>
> [Next.js之前端渲染模式](https://juejin.cn/post/7160279477690466335)
>
> [Next.js 13 的 app 目录模式功能梳理](https://juejin.cn/post/7221162775074734135)
>
> [Learn Next.js 13 With This One Project](https://www.youtube.com/watch?v=NgayZAuTgwM)