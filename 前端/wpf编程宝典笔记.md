附:
    XML 基本规则
    1. - XML 的属性值须加引号
    2. 在 XML 中，有 5 个预定义的实体引用：
        - &lt;       < 小于
        - &gt;       > 大于
        - &amp;      & and
        - %apos;     ' 单引号
        - &quot;     " 双引号
    3. 注释 <!-- comment -->
    4. XML 对大小写敏感
    5. 前缀可以解决命名冲突, <h:table> </h:table> 和 <HTML:TABLE> </HTML:TABLE>
    6. XML Namespace (xmlns) 属性, 我们为 <table> 标签添加了一个 xmlns 属性，这样就为前缀(h:table 的h)赋予了一个与某个命名空间相关联的限定名称。
        xmlns:namespace-prefix="namespaceURI"
        xmlns="http://www.w3.org/TR/html4/"   -- 默认命名空间
        
        
1. XAML 语法
    1. 简单规则
        - XAML 中所有的元素都被映射为一个.Net 类的实例
        - 所有XAML 元素可以嵌套
        - 通过特性(attribute)设置每个类的属性(property), 也可用特殊语法使用嵌套标签(tag)
        
    2. 文档基本框架
    
        <Window x:Class="WindowsApplicatioin1.Window1"
            xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation" --是 WPF 核心命名空间, 它包含所有WPF类, 用于构建用户界面的控件
            xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"   --是XAML命名空间,它包含各种XAML实用特性,这个名称空间被映射为 x, 表示可以通过在元素名称之前放置一个空间前缀来使用这个名称空间如 <x:ElementName>
            Title="Window1" Height="300" Width="200">
            
            <Grid>  --Grid 元素中可以防止所有控件
            </Grid>
            
        </Window> -- Window 代表整个窗体, 是一个顶级的Window元素.    