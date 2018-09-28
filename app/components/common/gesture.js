import Hammer from 'hammerjs'
import store from '../../store/store'

//左右手势移动话题列表栏目
function gestureToNextTag(el, component) {
    const hammertime = new Hammer(el);
    hammertime.on('swipeleft', function (ev) {
        component.props.history.push(`/` + nextUrl('swipeleft', location.search))
    });
    hammertime.on('swiperight', function (ev) {
        component.props.history.push(`/` + nextUrl('swiperight', location.search))
    });

    function nextUrl(direction, currentUrl) {
        let num;
        const tagList = ['', '?tab=good', '?tab=share', '?tab=ask', '?tab=job', '?tab=dev']

        if (direction === 'swiperight') {
            num = tagList.indexOf(currentUrl)
            if (num === 0) {
                return tagList[tagList.length - 1]
            } else {
                return tagList[num - 1]
            }
        } else {
            num = tagList.indexOf(currentUrl)
            if (num === tagList.length - 1) {
                return tagList[0]
            } else {
                return tagList[num + 1]
            }
        }
    }
}

//手势按住话题列表不放重新加载列表(或双指操作)，取消字段选择功能，取消右击默认事件
function gestureReload(el, evName, component) {
    const hammertime = new Hammer(el);

    switch (evName) {
        case 'press':
            hammertime.get(evName).set({time: 600})  //按压时间，单位微秒
            break

        //bug:无法上下移动
        case 'pinchin':
            hammertime.get('pinch').set({enable: true})
            break
    }

    hammertime.on(evName, function (ev) {
        component.isRefreshList = true
        component.props.history.push({
            pathname: '/',
            search: location.search
        })
        document.onselectstart = () => false  //取消字段选择功能
        document.oncontextmenu = () => false  //取消右击默认事件
    });
}

//手势向右返回上一页或指定路径
function gestureBack(el, pushFn, url) {
    const hammertime = new Hammer(el);
    hammertime.on('swiperight', function (ev) {
        if (pushFn) {
            return pushFn(url)
        }
        history.go(-1)
    });
}

//手势向左至评论区
function gestureToComment(el, heightFn) {
    const hammertime = new Hammer(el);
    hammertime.on('swipeleft', function (ev) {
        document.documentElement.scrollTop = document.body.scrollTop = heightFn()
    });
}

//手势向左评论切换排序
function gestureCommentOrder(el, setOrderTrue, setOrderFalse) {
    const hammertime = new Hammer(el);
    hammertime.on('swipeleft', function (ev) {
        if (!store.getState().topic.isReverseReplies) {
            setOrderTrue()
        } else {
            setOrderFalse()
        }
    });
}

//双击滚动到顶部
function gestureToTop(el) {
    const hammertime = new Hammer(el);
    hammertime.on('doubletap', function (ev) {
        document.documentElement.scrollTop = document.body.scrollTop = 0
    });
}

export {gestureToNextTag, gestureBack, gestureToComment, gestureCommentOrder, gestureToTop, gestureReload}