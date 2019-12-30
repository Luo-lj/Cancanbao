"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Event = require('../utils/events.js');
Component({
    relations: {
        '../l-tab/index': {
            type: 'child',
            linked() {
                this.reSetTabs();
            },
        }
    },
    externalClasses: ['tab-header-class'],
    properties: {
        activeKey: {
            type: String,
            observer(newVal) {
                this.resetStyle();
                this.scrollToActive();
            }
        },
        position: {
            type: String,
            value: 'fixed'
        },
        animated: {
            type: Boolean,
            value: true
        },
        scroll: {
            type: Boolean,
            value: false
        },
        secondStyle: {
            type: Boolean,
            value: false
        },
        paneHeight: String
    },
    data: {
        _tabs: [],
        _sliderStyle: '',
        _tabContentStyle: '',
        _scrollLeft: 0
    },
    ready() {
        this.initListener();
        this.reSetTabs();
    },
    detached() {
        this.removeListener();
    },
    methods: {
        initListener() {
            // 重新计算 style
            Event.addEventListener('g-tabs__resetStyle', () => {
                this.resetStyle();
            }, this);
            // 初始化
            Event.addEventListener('g-tabs__init', () => {
                this.initTabs()
                    .then(() => {
                    return this.saveInitTabItems();
                }).then(() => {
                    this.resetStyle();
                    this.scrollToActive();
                });
            });
        },
        removeListener() {
            Event.removeSingleEventListener('g-tabs__resetStyle', () => {
                this.resetStyle();
            }, this);
        },
        reSetTabs() {
            this.initTabs()
                .then(() => {
                return this.saveInitTabItems();
            }).then(() => {
                this.resetStyle();
                this.scrollToActive();
            });
        },
        /**
         * 获取所有关系 tab pane 节点
         *
         * @returns
         */
        getTabPanes() {
            return this.getRelationNodes('../l-tab/index');
        },
        /**
         * 初始化
         *
         */
        initTabs() {
            return new Promise((resolve) => {
                const tabs = this.getTabPanes()
                    .map((node, index) => {
                    node.calcSelfStyle(index);
                    return node.properties;
                });
                this.setData({
                    _tabs: tabs
                }, () => {
                    return resolve(true);
                });
            });
        },
        // 记录最初每个 tab 的位置
        saveInitTabItems() {
            return new Promise((resolve, reject) => {
                const query = this.createSelectorQuery();
                query.selectAll('.tabs__item__wrap')
                    .boundingClientRect(nodes => {
                    nodes.forEach((rect, index) => {
                        this.data._tabs[index].rect = rect;
                    });
                    this.setData({ _tabs: this.data._tabs }, () => {
                        resolve(true);
                    });
                }).exec();
            });
        },
        /**
         * 重置所有样式
         *
         */
        resetStyle() {
            this.getCurrentTabItem()
                .then(({ node, index, scroll }) => {
                if (node)
                    this.calcSliderStyle(node, scroll);
                if (-1 !== index)
                    this.setTapPaneStyle(index);
            });
        },
        /**
         *  设置 tabpane 样式
         *
         * @param {number} index
         */
        setTapPaneStyle(index) {
            const query = this.createSelectorQuery();
            const tabs = this.getTabPanes();
            query.select('#tab-header').boundingClientRect((tab) => {
                tabs[index].getCurrentStyle()
                    .then((res) => {
                    this.calcTabContentStyle(index, res.height, tab.height);
                });
            }).exec();
        },
        /**
         * 获取当前选中的 tabItem
         *
         */
        getCurrentTabItem() {
            return new Promise((resolve, reject) => {
                const query = this.createSelectorQuery();
                query.selectAll('.tabs__item-inline').fields({
                    size: true,
                    rect: true,
                    scrollOffset: true
                }).exec((res) => {
                    const { activeKey, scroll } = this.properties;
                    const index = this.data._tabs.findIndex(item => {
                        return item.key === activeKey;
                    });
                    let result;
                    if (-1 !== index) {
                        result = res[0] && res[0][index];
                    }
                    if (scroll) {
                        this.getScrollView()
                            .then(scrollEle => {
                            resolve({
                                node: result,
                                scroll: scrollEle,
                                index
                            });
                        });
                    }
                    else {
                        resolve({
                            node: result,
                            index
                        });
                    }
                });
            });
        },
        /**
         * 获取滚动节点
         *
         * @returns { Promise }
         */
        getScrollView() {
            return new Promise((resolve, reject) => {
                const query = this.createSelectorQuery();
                query.select('#tabs-scroll')
                    .scrollOffset()
                    .exec((res) => {
                    const result = res && res[0];
                    resolve(result);
                });
            });
        },
        /**
         *  计算 slider 样式
         *
         * @param {execObject} node
         */
        calcSliderStyle(node, scrollNode) {
            const { animated, scroll } = this.properties;
            const styleObj = {
                width: node.width + 8,
                left: node.left - 4
            };
            this.calcTabHeaderLeft()
                .then((res) => {
                // 滚动模式，要加上 scrollLeft 距离
                if (scroll) {
                    styleObj.left = scrollNode.scrollLeft + styleObj.left;
                }
                let _sliderStyle = `width:${styleObj.width}px;left:${styleObj.left - res.left}px;`;
                if (animated) {
                    _sliderStyle += 'transition: all .45s;';
                }
                this.setData({
                    _sliderStyle
                });
            });
        },
        calcTabHeaderLeft() {
            return new Promise((resolve) => {
                const query = this.createSelectorQuery();
                query.select('.tabs__header').fields({
                    size: true,
                    rect: true,
                    scrollOffset: true
                }).exec((res) => {
                    const result = res && res[0];
                    resolve(result);
                });
            });
        },
        /**
         * 计算 tab content 位置
         *
         * @param {number} index
         */
        calcTabContentStyle(index, height, tabHeight) {
            const { animated, paneHeight, position } = this.properties;
            let _tabContentStyle = `margin-left: -${index * 100}%;`;
            if (animated) {
                _tabContentStyle += 'transition: margin-left .45s;';
            }
            if (paneHeight) {
                _tabContentStyle += `height:${paneHeight}rpx;`;
            }
            else {
                _tabContentStyle += `height:${height}px;`;
            }
            if (position === 'fixed') {
                _tabContentStyle += `margin-top:${tabHeight}px;`;
            }
            this.setData({
                _tabContentStyle
            });
        },
        handleTabItemTab(e) {
            const key = e.currentTarget.dataset.key;
            const { activeKey } = this.properties;
            if (key === activeKey) {
                return;
            }
            const tabs = this.data._tabs;
            const index = tabs.findIndex(item => {
                return item.key === key;
            });
            this.resetStyle();
            this.triggerEvent('change', {
                value: tabs[index]
            });
        },
        // 滚动到高亮点
        scrollToActive() {
            const { activeKey, scroll } = this.properties;
            if (scroll) {
                const currentTab = this.data._tabs.find(tab => tab.key === activeKey);
                if (currentTab && currentTab.rect && currentTab.rect.left) {
                    this.setData({
                        _scrollLeft: currentTab.rect.left - 150
                    });
                }
            }
        }
    }
});
