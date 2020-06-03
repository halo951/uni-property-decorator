export const $internalHooks = [
    "data",
    "beforeCreate",
    "created",
    "beforeMount",
    "mounted",
    "beforeDestroy",
    "destroyed",
    "beforeUpdate",
    "updated",
    "activated",
    "deactivated",
    "render",
    "errorCaptured",
    "serverPrefetch" // 2.6
];
/**
 * uni data 属性装饰器
 * @usage `@Data() data1:any;` or `@Data(111) data:number;` 按照 @Prop 的格式定义对象,然后 在 @Data 参数中写入初始值
 * @description 解决 @Prop 初始值注入需要另外在 data(){} 定义属性字段问题.
 * 主要应用场景是uni-app编译为小程序版本.
 * @author Halo
 * @Date 2020年6月3日 04:35:11
 * @param value [可空] 写入data的初始值,由于
 */
export const Data = function (value) {
    return function (target, key) {
        if (!target["__init__"])
            target["__init__"] = {};
        if ($internalHooks.indexOf(key) !== -1)
            return; // skip by lock key.
        target["__init__"][key] = value || target[key] || null;
        if (target.data && typeof target.data === "function") {
            let origin = target.data();
            target.data = function () {
                return { ...target["__init__"], ...origin };
            };
        }
        else {
            target.data = function () {
                return target["__init__"];
            };
        }
    };
};
/**
 * uni data 属性装饰器 - 默认属性扩展
 * @usage 作为 vue class 类装饰器使用,注意:要写在 @Component 装饰器后.
 * @description 用于将成员变量值作为默认值写入data. 生效时机为 class被vue实例化,且加载为组件前.
 *
 * @param constructor vue class 这里没有引入 `vue-property-decorator` 进行限定,所以使用时要稍微注意
 */
export const DataInit = function (constructor) {
    let target = new constructor();
    /** 检查 */
    if (typeof target.data !== "function")
        return;
    let data = target.data() || {};
    for (let k in data) {
        if (data[k] === null && target[k])
            data[k] = target[k];
    }
    constructor.prototype.data = function () {
        return data;
    };
};
