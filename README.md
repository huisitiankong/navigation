自己写的一个非常简单的导航页，引用了很多大佬的思路集合而成的。所有的信息均是通过json来传递数据，无需安装网站系统，无法被黑客攻击，需要添加和修改什么内容，只需要更新json文件即可，非常方便和实用。后续进行了大大小小的改进，可以点击右边的链接查看最新的版本。

## 架构说明
基于vue、jq和layui制作，集合了网址导航、天气、百度热词、美图，以及多种实用工具。基于本地的网址储存功能，摒弃了目前主流的流氓导航，回归自然生态，主要是做给自己用的，现在也贡献给大家一起使用。

## 安装教程
复制到自己的服务器即可使用，如果需要在本地使用，需要把JSON文件的数据，放到页面的data里。

## 使用说明
** 因为vue已经不支持IE了，经过测试，不支持所有的IE浏览器**

## 更新说明
1.由于之前引用的外部框架较少，因此没有太在意，随着引入外部框架的增多，需要按顺序将其渲染在页面上，因此使用了postscribe框架，该框架专门解决异步写入JS所带来的问题

2.由于使用locastorage进行本地储存，为避免重复点击背景图造成localStorage内存溢出，因此在有背景图的情况下隐藏“开启背景图”按钮

3.解决初始化渲染出现花括号的问题（添加v-clock属性在标签里），并添加网站运行时间与自动计时。
