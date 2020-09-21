import React from 'react';
import { Menu } from 'antd';
import { withRouter } from 'react-router-dom';
import Search from 'antd/lib/input/Search';

function LeftMenu(props) {

  const handleChangeSearch=(e)=>{
    const query=e.target.value
    props.history.push(`/search/${query}`);
  }

  const handleSearch=(query)=>{
    props.history.push(`/search/${query}`);
  }

  return (
    <Menu mode={props.mode}>
      <Menu.Item key="mail">
        <a href="/">Home</a>
      </Menu.Item>
      <Menu.Item key="favourites">
        <a href="/favourites">Favourites</a>
      </Menu.Item>
      <Menu.Item key="search" className="search-bar">
        <Search style={{width: '150%'}} onChange={handleChangeSearch} placeholder="Search movie" onSearch={handleSearch} enterButton />
      </Menu.Item>
    </Menu>
  )
}

export default withRouter(LeftMenu)