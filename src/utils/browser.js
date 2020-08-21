function getAbsolutePath(url) {
    /// <summary>获取当前项目的域名</summary>
    url = url || "";
    if (url.indexOf("://") != -1) {
        return url;
    }
    var first = url.substr(0, 1);
    var link = "http://" + window.location.href.replace("http://", "").split('/')[0];
    if (first == "/") {
        link += url;
    }
    else {
        link += "/" + url;
    }
    return link;
}

function verIE() {
    var userAgent = navigator.userAgent;
    var isIE = userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1;
    var pageUrl = window.location.href.toLowerCase();
    if (pageUrl.indexOf("/browser") != -1) {
        return;
    }
    if (isIE) {
        var reIE = new RegExp("MSIE (\\d+\\.\\d+);");
        reIE.test(userAgent);
        var fIEVersion = parseFloat(RegExp["$1"]);
        if (fIEVersion < 10 || !isSupportPlaceholder()) {
            if (window.self !== window.top) {
                parent.window.location.href = getAbsolutePath("home/browser");
            }
            else {
                window.location.href = getAbsolutePath("home/browser");
            }
        }
    }
}
verIE();