export default {
    props: {
        headerHeight: {
            type: Number,
            default() {
                return 80
            }
        },
        headerScroll: {
            type: Boolean,
            default() {
                return false
            }
        },
        headerBackground: {
            type: String,
            default() {
                return '#fafafa'
            }
        },
        boxHeight: {
            type: Number,
            default() {
                return 80
            }
        },

        // 数据
        listData: {
            type: Array,
            default() {
                return []
            }
        },
        // 分页
        isPage: {
            type: Boolean,
            default: false
        },
        isLoadMore: {
            type: Boolean,
            default: false
        },
        loadingType: {
            type: String,
            default() {
                return 'loading'
            }
        },
        imgSrc: {
            type: String,
            default() {
                return '/static/no-data.png'
            }
        }
    }
}
