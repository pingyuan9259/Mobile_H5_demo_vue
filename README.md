# product-simple

> vue2 + vue-router2.0 + vuex2 + axios

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

## API（URL）

#### 我的账户（充值页面）

1. 需要app的cookie

```
h-dev.xinshengdaxue.com/myAccount
```

#### 我的支付记录（包涵充值，买会员，买课程）

1. 需要app的cookie

```
h-dev.xinshengdaxue.com/myPayLog
```

#### 买会员页面(该页面涵盖了买会员的交易记录)，续费会员也在该页面

1. 需要app的cookie

```
h-dev.xinshengdaxue.com/buyMemberPage
```

#### 课程详情(购买前)

1. 不需要app的cookie，给了也可以
2. 该页面可以分享到朋友圈

```
h-dev.xinshengdaxue.com/courseDetail?courseId=2
```

#### 课程详情(购买后)

1. 需要APP的cookie
2. 该页面不能分享到朋友圈

```
h-dev.xinshengdaxue.com/courseDetail2?courseId=2
```


