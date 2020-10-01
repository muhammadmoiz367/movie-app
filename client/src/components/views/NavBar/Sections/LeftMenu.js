import React from 'react';
import { Menu, Dropdown } from 'antd';
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

  const handleCategoriesList=(e)=>{
    e.preventDefault();
    props.history.push(`/?category=${e.target.text}`)
    //props.history.push(`/?category=${e.target.text}&genre=all&language=en`)
  }
  // const handleGenreList=(e)=>{
  //   e.preventDefault();
  //   props.history.push(`/category=Movies&genre=${e.target.id}&language=en`)
  // }
  // const handleLanguageList=(e)=>{
  //   e.preventDefault();
  //   props.history.push(`/category=Movies&genre=all&language=${e.target.id}`)
  // }
  
  const categorieslist = (
    <Menu  >
      <Menu.Item>
        <a rel="noopener noreferrer" id="" onClick={handleCategoriesList} >
          Movies
        </a>
      </Menu.Item>
      <Menu.Item>
        <a rel="noopener noreferrer" id="" onClick={handleCategoriesList} >
          TV Shows
        </a>
      </Menu.Item>
    </Menu>
  );
  // const genreList = (
  //   <Menu style={{marginLeft: '-.5rem'}} >
  //     <Menu.Item>
  //       <a rel="noopener noreferrer" id="28" onClick={handleGenreList} >
  //        Action 
  //       </a>
  //     </Menu.Item>
  //     <Menu.Item>
  //       <a rel="noopener noreferrer" id="12" onClick={handleGenreList} >
  //         Adventure
  //       </a>
  //     </Menu.Item>
  //     <Menu.Item>
  //       <a rel="noopener noreferrer" id="16" onClick={handleGenreList} >
  //         Animation
  //       </a>
  //     </Menu.Item>
  //     <Menu.Item>
  //       <a rel="noopener noreferrer" id="35" onClick={handleGenreList} >
  //         Comemdy
  //       </a>
  //     </Menu.Item>
  //     <Menu.Item>
  //       <a rel="noopener noreferrer" id="80" onClick={handleGenreList} >
  //         Crime
  //       </a>
  //     </Menu.Item>
  //     <Menu.Item>
  //       <a rel="noopener noreferrer" id="18" onClick={handleGenreList} >
  //         Drama
  //       </a>
  //     </Menu.Item>
  //     <Menu.Item>
  //       <a rel="noopener noreferrer" id="27" onClick={handleGenreList} >
  //         Horror
  //       </a>
  //     </Menu.Item>
  //     <Menu.Item>
  //       <a rel="noopener noreferrer" id="9648" onClick={handleGenreList} >
  //         Mystery
  //       </a>
  //     </Menu.Item>
  //     <Menu.Item>
  //       <a rel="noopener noreferrer" id="53" onClick={handleGenreList} >
  //         Thriller
  //       </a>
  //     </Menu.Item>
  //     <Menu.Item>
  //       <a rel="noopener noreferrer" id="10749" onClick={handleGenreList} >
  //         Romance
  //       </a>
  //     </Menu.Item>
  //   </Menu>
  // );
  // const languagesList = (
  //   <Menu>
  //     <Menu.Item>
  //       <a rel="noopener noreferrer" id="en" onClick={handleLanguageList} >
  //         English
  //       </a>
  //     </Menu.Item>
  //     <Menu.Item>
  //       <a rel="noopener noreferrer" id="hi" onClick={handleLanguageList} >
  //         Hindi
  //       </a>
  //     </Menu.Item>
  //     <Menu.Item>
  //       <a rel="noopener noreferrer" id="es" onClick={handleLanguageList} >
  //         Spanish
  //       </a>
  //     </Menu.Item>
  //   </Menu>
  // );

  return (
    <Menu mode={props.mode}>
      <Menu.Item key="mail">
        <a href="/">Home</a>
      </Menu.Item>
      <Menu.Item key="favourites">
        <a href="/watchlist">Watchlist</a>
      </Menu.Item>
      <Menu.Item>
      <Dropdown overlay={categorieslist}>
        <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
          Categories
        </a>
      </Dropdown>
      </Menu.Item>
      {/* <Menu.Item>
      <Dropdown overlay={genreList}>
        <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
          Genre
        </a>
      </Dropdown>
      </Menu.Item>
      <Menu.Item>
      <Dropdown overlay={languagesList}>
        <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
          Languages
        </a>
      </Dropdown>
      </Menu.Item> */}
      <Menu.Item key="search" className="search-bar">
        <Search style={{width: '150%'}} onChange={handleChangeSearch} placeholder="Search movie" onSearch={handleSearch} enterButton />
      </Menu.Item>
    </Menu>
  )
}

export default withRouter(LeftMenu)