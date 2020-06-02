/**
 * uni data 属性装饰器
 * @usage `@Data() data1:any;` or `@Data(111) data:number;` 按照 @Prop 的格式定义对象,然后 在 @Data 参数中写入初始值
 * @description 解决 @Prop 初始值注入需要另外在 data(){} 定义属性字段问题.
 * 主要应用场景是uni-app编译为小程序版本.
 * @author Halo
 * @Date 2020年6月3日 04:35:11
 * @param value [可空] 写入data的初始值,由于
 */
export declare const Data: (value?: any) => (target: any, key: string) => void;
/**
 * uni data 属性装饰器 - 默认属性扩展
 * @usage 作为 vue class 类装饰器使用,注意:要写在 @Component 装饰器后.
 * @description 用于将成员变量值作为默认值写入data. 生效时机为 class被vue实例化,且加载为组件前.
 *
 * @param constructor vue class 这里没有引入 `vue-property-decorator` 进行限定,所以使用时要稍微注意
 */
export declare const DataInit: <T extends new (...args: any[]) => any>(constructor: T) => void;
