/**
 *创建分享报告标签
 */
export const Tab = [
    { id: 1, name: "从空白处创建" },
    { id: 2, name: "使用模板创建" },
]
/**
 *添加移除图表标签
 */
export const Charts = [
    { id: 1, name: "添加图表" },
    { id: 2, name: "移除模块" },
]
/**
 *看板选择标签
 */
export const Look = {
    default: "公共看板",
    option: [
        { id: 0, name: "公共看板" },
        { id: 1, name: "个人看板" },
    ]
}
/**
 *实时新闻选择标签
 */
export const Realtimenews = {
    default: "实时新闻",
    option: [
        { id: 0, name: "实时新闻" },
        { id: 1, name: "精选新闻" },
    ]
}
/**
 *下载页面字段标签
 */
export const DownloadTitle = [
    {
        id: 0, name: "基础字段",
    },
    { id: 1, name: "媒体字段" },
    { id: 1, name: "自媒体字段" },
    { id: 1, name: "其它字段" },
    { id: 1, name: "自选字段" },

]
/**
 * 下载组件基础字段
 */
export const DBasicfield = [
    { value: 0, label: "新闻编号", en: "articleId" },
    { value: 1, label: "新闻标题", en: "title" },
    { value: 2, label: "新闻标题(英)", en: "titleForeign" },
    { value: 3, label: "新闻链接", en: "webURL" },
    { value: 4, label: "作者", en: "author" },
    { value: 5, label: "新闻版位", en: "pageName" },
    { value: 6, label: "发布日期", en: "releaseDate" },
    { value: 7, label: "正/中/负", en: "negative" },
    { value: 8, label: "原创/转载", en: "original" },
    { value: 9, label: "标签", en: "tagName" },
    { value: 10, label: "标签(英)", en: "tagNameForeign" },
    { value: 11, label: "分类名称", en: "categoryName" },
    { value: 12, label: "分类名称(英)", en: "categoryNameForeign" },
    { value: 13, label: "分类层级", en: "levelName" },
    { value: 14, label: "分类层级(英)", en: "levelNameForeign" },
    { value: 15, label: "转载出处", en: "SourceMedia" },
    { value: 16, label: "转载量", en: "subNewsTotal" },
]
/**
 * 下载组件媒体字段
 */
export const DMediaLabel = [
    { value: 17, label: "媒体名称", en: "sourceName" },
    { value: 18, label: "媒体英文名称", en: "sourceNameForeign" },
    { value: 19, label: "媒体类型", en: "sourceRank" },
    { value: 20, label: "媒体性质", en: "sourceNature" },
    { value: 21, label: "媒体等级", en: "sourceRank" },
    { value: 22, label: "媒体所属行业", en: "sourceCategory" },
    { value: 23, label: "媒体pv", en: "PV" },
    { value: 24, label: "媒体uv", en: "UV" },
    { value: 25, label: "发行量", en: "circulation" },
    { value: 26, label: "刊例价", en: "price" },
    { value: 27, label: "媒体所在国家", en: "Country" },
    { value: 28, label: "媒体所在省份", en: "Province" },
    { value: 29, label: "许可证", en: "siteLicense" },
    { value: 30, label: "公司名称", en: "companyName" },
    { value: 31, label: "是否自媒体", en: "IsWeMedia" },
    { value: 32, label: "公司性质", en: "companyType" },
]
/**
 * 下载组件自媒体字段
 */
export const DWemediaLabel = [
    { value: 33, label: "粉丝量", en: "fans" },
    { value: 34, label: "性别", en: "gender" },
    { value: 35, label: "认证类型", en: "verRank" },
    { value: 36, label: "点赞量", en: "likeCount" },
    { value: 37, label: "评论量", en: "commentCount" },
    { value: 38, label: "收藏量", en: "collectionCount" },
    { value: 39, label: "阅读量", en: "readCount" },
    { value: 40, label: "转发量", en: "forwardCount" },
]
/**
 * 下载组件其它字段
 */
export const DOtherLabel = [
    { value: 41, label: "平台链接", en: "miceURL" },
    { value: 42, label: "报道字数", en: "wordCount" },
    { value: 43, label: "是否精要", en: "highlight" },
    { value: 44, label: "摘要", en: "summary" },
    { value: 45, label: "英文摘要", en: "summaryForeign" },
    { value: 46, label: "关键词及命中次数", en: "categorySettingID" },

]
/**
 * 新闻列表设置标签
 */
export const Sensitivelabel = [
    { id: 0, name: "设为敏感" },
    { id: 1, name: "设为非敏感" },
    { id: 2, name: "删除新闻" },
]
/**
 * 筛选组件媒体类型标签
 */
export const MediaTypeLabel = [
    { value: 0, label: "网络" },
    { value: 1, label: "微信" },
    { value: 2, label: "微博" },
    { value: 3, label: "App" },
    { value: 4, label: "报刊" },
    { value: 5, label: "论坛" },
    { value: 6, label: "视频" },
]
/**
 * 筛选组件情感属性标签
 */
export const EmotionLabel = [
    { id: 0, name: "全部" },
    { id: 1, name: "敏感" },
    { id: 2, name: "非敏感" },
]
/**
 * 筛选组件相似新闻标签
 */
export const SimilarNewsLabel = [
    { id: 0, name: "合并" },
    { id: 1, name: "不合并" },
]
/**
 * 筛选组件传播类型标签
 */
export const CommunicationTypeLabel = [
    { id: 0, name: "全部" },
    { id: 1, name: "转载" },
    { id: 2, name: "原创" },
]
/**
 * 排序组件标签
 */
export const sortLabel = {
    default: "排序",
    option: [
        { id: 0, name: "最新在前" },
        { id: 1, name: "最相关在前" },
    ]
}
/**
 * 视图组件选项标签
 */
export const ViewLabel = [
    { id: 0, img: "/img/view_tab2.svg" },
    { id: 1, img: "/img/view_tab3.svg" },
    { id: 2, img: "/img/view_tab1.svg" },
]
/**
 * 添加图表组件图表类型标签
 */
export const ChartTypeLabel = [
    { value: 0, label: "新闻趋势分析" },
    { value: 1, label: "媒体类型分析" },
    { value: 2, label: "媒体热度分析" },
    { value: 3, label: "情感分析" },
    { value: 4, label: "地区分析" },
    { value: 5, label: "热门云词分析" },
]

/**
 * 图表组件年月日功能标签
 */
export const ChartYmdLabel = [
    { id: 0, name: "日" },
    { id: 1, name: "月" },
    { id: 2, name: "年" },
]
/**
 * 图表组件切换视图功能标签
 */
export const ChartViewLabel = [
    { id: 0, img: "/img/LineViewIcon.svg" },
    { id: 1, img: "/img/TreeViewIcon.svg" },
    { id: 2, img: "/img/CircleViewIcon.svg" },
]