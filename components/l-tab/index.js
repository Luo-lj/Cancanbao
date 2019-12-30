// pages/g-tab-pane/index.js
Component({
    relations: {
        '../l-tabs/index': {
            type: 'parent'
        }
    },
    properties: {
        tab: {
            type: String
        },
        key: String
    },
    data: {
        tabPaneStyle: ''
    },
    methods: {
        calcSelfStyle(index) {
            const style = `left:${index * 750}rpx;`;
            this.setData({
                tabPaneStyle: style
            });
        },
        getCurrentStyle() {
            return new Promise((resolve, reject) => {
                const query = this.createSelectorQuery();
                query.select('.tab-pane')
                    .boundingClientRect()
                    .exec((res) => {
                    resolve(res && res[0]);
                });
            });
        }
    }
});
