import React, { useEffect } from 'react';
import { observer } from 'mobx-react'
import { } from 'react-router-dom'
import { HomeSortType, } from 'base/enums'
import { Tab, Charts, Look, Realtimenews, EmotionLabel } from 'base/label'
import { useStores } from 'stores'
import { UserOutlined } from '@ant-design/icons';
import Dropdown from 'components/Dropdown'
import News from 'components/News'
import SwiperCard from 'components/SwiperCard'
import DragLayout from 'components/DragLayout'
import SearchTree from 'components/SearchTree'
import Datapicker from 'components/Datapicker'
import Selects from 'components/Selects'
import AddModal from 'containers/AddModal';
import Animation from 'containers/Parabola'
import './index.less'

const Home = observer((props) => {
  const stores = useStores()
  const { homeStore } = stores
  const { listData = {}, chartData } = homeStore
  const homechart = sessionStorage.getItem('homechart') || {}
  useEffect(() => {
    articleList()
    getSetChart()
    searchCloud()
    analysisCount()
  }, [])
  const articleList = async () => {
    await homeStore.fetcharticleList({
      keyword: "小米",
    }, { token: "640b37dc3efb1fe43c9cd4a232de1415" })
  }

  const getSetChart = async () => {
    await homeStore.fetchgetSetChart({
      settingType: 13,
      token: "a7b629a4244ea103b4130df4a4f94010",

    })
  }
  const analysisCount = async () => {
    await homeStore.fetchanalysisCount()
  }

  const searchCloud = async () => {
    await homeStore.fetchsearchCloud()
  }
  const hide = e => {
    console.log(e)
  }
  return (
    <div className="main">
      <div className="chart">
        <div className="ansy">
          <div className="txt">图表分析</div>
          <Selects data={{ data: Look }} />
        </div>
        <div className="tab">
          <UserOutlined />
          <Selects data={{ data: Realtimenews }} />
          <div>
             <Datapicker
              getData={homeStore.getData}
              style={{ width: 200 }}
            />
          </div>
          <div>|</div>
          <div>+ &nbsp;
          <Dropdown name={"添加图表"} data={Charts} style={{ width: 100, height: 90 }} hide={e => { console.log(e) }} />
          </div>
          <div><UserOutlined /> &nbsp;
            <Dropdown name={"创建分享报告"} data={Tab} style={{ width: 127, height: 90 }} />
          </div>
          <div> &nbsp;
          <Dropdown name={"⋮"} data={Charts} style={{ width: 100, height: 90 }} />
          </div>
        </div>
      </div>
      <DragLayout data={homechart} />
      <AddModal />
      <News data={{ title: "媒体热度分析", triangle: true, detail: true }} />
      <SwiperCard state={false} />
      <SwiperCard />
      {/* <SearchTree /> */}
      <Animation></Animation>
    </div >
  )
})

export default Home