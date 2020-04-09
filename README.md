# 小米商城
## 项目简介
> 本项目是基于原生JavaScript等前端技术实现的仿小米电商网站。本项目使用的前端代码设计技术栈有jQuery、SCSS、Gulp构建工具、Require.JS模块化开发，后台构造技术包括PHP、MySQL。
> <br />
> #### 项目使用的开源框架
> @BullFei [xiaomiproject](https://github.com/BullFei/xiaomiproject.git)<br />
> 【注】引用部分包括HTML，CSS，images，JSON，即静态部分文件（引用的所有文件见下图）
> <br />
> ![Image](https://img-blog.csdnimg.cn/202004091400591.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0xvcmllbm4=,size_16,color_FFFFFF,t_70)


## 项目使用说明
1. 下载该代码
2. 确认本机是否安装Apache服务器。若未安装可下载PHPnow集成包

> PHPnow集成安装包下载地址： http://servkit.org/download <br />
> PHPnow安装教程：https://jingyan.baidu.com/article/ad310e80ea8acb1849f49eb8.html

3. 通过 http://localhost:80 加载项目(80为apache默认端口号)
4. 首次使用登陆/注册功能需先在本地apache服务器上搭建数据库，过程如下：
```sql
CREATE DATABASE `xiaomi`;
CREATE TABLE `xiaomi`.`users` (
`id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY ,
`username` VARCHAR( 50 ) NOT NULL ,
`password` VARCHAR( 50 ) NOT NULL ,
`ctime` BIGINT( 20 ) NOT NULL
) ENGINE = MYISAM CHARACTER SET utf8 COLLATE utf8_unicode_ci;
```
<br />

## 项目功能
> #### （建议使用chrome浏览器查看）
> 首页： http://localhost:80/<br/>
> 商品列表(首页→手机→查看全部)：http://localhost:80/list.html<br/>
> 商品详情(列表页→点击相应商品)：http://localhost:80/goodsDesc.html?product_id=10000150<br/>
> 我的购物车：http://localhost:80/shopCart.html<br/>
> 登陆页面：http://localhost:80/login.html<br/>
> 注册页面：http://localhost:80/register.html
