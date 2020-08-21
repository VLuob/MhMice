import React, { useEffect } from 'react';
import { NavLink, Route } from 'react-router-dom'
import { DownOutlined, } from '@ant-design/icons';
import { observer } from 'mobx-react'
import { useStores } from 'stores'
import All from 'pages/article/all'
import Category from 'pages/article/category'
import Tag from 'pages/article/tag'
import Folder from 'pages/article/folder'
import SearchTree from 'components/SearchTree';
import { Redirect } from "react-router";
import { Checkbox } from 'antd';
import Selects from 'components/Selects';
import Datapicker from 'components/Datapicker';
import { Realtimenews, sortLabel, newsRoute, } from 'base/label'
import Screen from 'components/Screen';
import ViewTab from 'components/ViewTab';
import './index.less'

const Article = observer((props) => {
  const stores = useStores()
  const { articleStore, categoryStore, tagStore, ArtallStore } = stores
  const { seldata } = articleStore
  const { alldata } = ArtallStore
  const { match } = props
  return (
    <div className="news_newslist">
      <nav className="nav_tab">
        <div className="nav_title">
          <img src="/img/news_tab1.svg" alt="" className="img" />
          <div className="title_txt">新闻列表</div>
        </div>
        {
          newsRoute.map((item, index) => (
            <div key={index} >
              <div className='tab_childs' onClick={articleStore.selclick.bind(this, item, index)}>
                <NavLink to={item.path} activeClassName="article_active">
                  <img src={item.icon} alt="" className="img" />
                  <div>{item.title} </div>
                  {
                    index !== 0 &&
                    <DownOutlined className={seldata.index === index ? 'tab_childs_icon  top' : 'tab_childs_icon under '} />
                  }
                </NavLink>
              </div>
              {
                seldata.index === 1 && item.id === 1 && <div>
                  <SearchTree
                    param={{ width: 'auto', boxShadow: 'none', input: true, data: JSON.parse(sessionStorage.getItem("category")) }}
                    checkList={categoryStore.checkList}
                  />
                </div>
              }
              {
                seldata.index === 2 && item.id === 2 && <div>
                  <SearchTree
                    param={{ width: 'auto', boxShadow: 'none', data: JSON.parse(sessionStorage.getItem("category")) }}
                    checkList={tagStore.checkList}
                  />
                </div>
              }
              {
                seldata.index === 3 && item.id === 3 && <div>
                  <div className="folder">暂无数据</div>
                </div>
              }
            </div>
          ))
        }
      </nav >
      <main className="article_main">
        <header>
          <div className="article_left">
            <div className="article_head_title">新闻列表</div>
            <Checkbox /*  onChange={articleStore.checkAll.bind(this)} */>全选</Checkbox>
            {
              true && <span>总计{234}条</span>
            }
            {
              false && <div>
                <span>已选{}/总计{}条</span>
                <div>批量操作</div>
              </div>
            }
          </div>
          <div className="article_right">
            <Selects data={{ data: Realtimenews }} />
            {/*  <Datapicker /> */}
            <Screen
              visible={alldata.visible}
              list={alldata.list}
              indeterminate={alldata.indeterminate}
              checkAll={alldata.checkAll}
              options={alldata.options}
              newsval={alldata.newsval}
              typeval={alldata.typeval}
              mediaval={alldata.mediaval}
              check={ArtallStore.check}
              onCheckAllChange={ArtallStore.onCheckAllChange}
              showDrawer={ArtallStore.showDrawer}
              onClose={ArtallStore.onClose}
              typeClick={ArtallStore.typeClick}
              newsClick={ArtallStore.newsClick}
              mediaClick={ArtallStore.mediaClick}
            />
            <span>|</span>
            <Selects data={{ data: sortLabel }} />
            <ViewTab />
          </div>
        </header>
        <Route path={`${match.url}/all`} component={All} />
        <Route path={`${match.url}/category`} component={Category} />
        <Route path={`${match.url}/tag`} component={Tag} />
        <Route path={`${match.url}/folder`} component={Folder} />
        <Redirect exact from={`${match.url}`} to="/article/all" />
      </main>
    </div >
  )
})

export default Article