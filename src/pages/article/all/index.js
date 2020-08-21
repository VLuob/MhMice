import React, { useEffect } from 'react';
import { observer } from 'mobx-react'
import { useStores } from 'stores'

import './index.less'
import News from 'components/News';
const All = observer((props) => {
    const stores = useStores()
    const { ArtallStore } = stores
    const { listCounts } = ArtallStore
    useEffect(() => {
        categoryList()
        listCount()
        getSettings()
    }, [])
    const listCount = async () => {
        await ArtallStore.fetchlistCount()
    }
    const categoryList = async () => {
        await ArtallStore.fetchcategoryList({
            token: "640b37dc3efb1fe43c9cd4a232de1415"
        })
    }

    const getSettings = async () => {
        await ArtallStore.fetchgetSettings()
    }
    return (
        <div>
            <News data={{
                category: ['检测方案', '来源媒体', '发布时间'],
                title: "最新新闻",
                list: listCounts,
                triangle: false,
                sort: true,
                test: true,
                detail: true,
                pageinfo: ArtallStore.pageinfo,
                DownloadInfo: ArtallStore.DownloadInfo,
                allLength: 1,
                selLength: 200001,
                savelabel: ArtallStore.savelabel,
                pageSize: JSON.parse(sessionStorage.getItem('pageinfo'))
            }} />
        </div>
    )
})

export default All