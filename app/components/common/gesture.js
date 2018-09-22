import Hammer from 'hammerjs'

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

//手势向右返回上一页
function gestureBack(el) {
    const hammertime = new Hammer(el);
    hammertime.on('swiperight', function (ev) {
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
function gestureCommentOrder(el, isReverseReplies, setOrderTrue, setOrderFalse) {
    const hammertime = new Hammer(el);
    hammertime.on('swipeleft', function (ev) {
        if (!isReverseReplies) {
            setOrderTrue()
        } else {
            setOrderFalse()
        }
    });
}

export {gestureToNextTag, gestureBack, gestureToComment, gestureCommentOrder}