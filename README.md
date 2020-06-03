## uni app typescript 装饰器扩展

### desc

- 主要用来解决使用 typescript 语法开发 uni-app 时,装饰器兼容问题.

- 暂时只能支持到 \$data , props 属性得按着 vue 的规范来, 即 小程序的 properties 需要用 @Prop() 和 @Model() 替代.

### 扩展

1. 增加 `@Data` 装饰器 替换 `@Prop` 装饰器. 解决编译小程序情况下初始值写入问题
2. 增加 `@DataInit` 装饰器,用于将成员变量初始值写入 data

### usage

```
import { Vue, Component, Prop } from "vue-property-decorator";
import { Data, DataInit } from "uni-property-decorator"; // 引入扩展库

// example - 1 在vue基础上,仅使用 @Data写法

@Component
export default class Example1 extends Vue {
    @Data(123)
    param1:number; // out: 111

    @Data(456)
    param2:any; // out: 456

    @Data()
    param3:any; // out: null

    onLoad() {
        console.log(this.param1, this.param2, this.param3);
    }
}


// example - 2 使用 @Data , @DataInit 配合的写法

@Component
@DataInit // 注意,这里 @DataInit 一定要写到 @Component 后面,否则 会触发vue的报错
export default class Example2 extends Vue {


    @Data()
    param1:number = 111; // out: 111

    @Data(456)
    param2:any; // out: 456

    @Data(123)
    param3:any = 456; // out: 123

    @Data()
    param4:any; // out: null

    onLoad() {
        console.log(this.param1, this.param2, this.param3, this.param4);
    }

}

// example - 3 使用 vue 原生写法

@Component
export default class Example1 extends Vue {

    @Prop()
    param:any = {};

    data() {
       return { // 使用原生写法的话,data里面值不重要,因为会被 @Prop属性初始值覆盖.但是这个变量一定要定义,否则无法触发Proxy的变更
           param: null
       };
    }

}


```

### 注意

1. 使用 `@Data` 装饰器且未定义初始值时,变量写入 data 的值为`null`.
2. 只使用 `@Data` 装饰器时,变量初始值需要作为参数传入 装饰器中。如果写作 成员变量值形式,需要加上类装饰器`@DataInit`,否则会导致初始值无法写入 `data` 中
3. 建议给 `data` 变量定义的值为原始数据类型,不要默认给`function`.
