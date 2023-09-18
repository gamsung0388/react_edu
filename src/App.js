import './App.css';
import { useState } from 'react';
function Header(props){
  return <header>
    <h1>
      <a href='/' onClick={function(e){
        e.preventDefault();
        props.onChangeMode()
      }}>{props.title}</a>
    </h1>
  </header>
}
function Nav(props){
  const lis = []
  for (let i = 0; i < props.topics.length; i++) {
    let t = props.topics[i];
    lis.push(<li key={t.id}><a id={t.id} href={'/read/' + t.id} onClick={function(e){
      e.preventDefault();
      props.onChangeMode(e.target.id)
    }}>{t.title}</a></li>)
    
  }
  return <nav>
    <ol>
      {lis}
    </ol>
  </nav>
}
function Article(props){
  return <article>
    <h2>{props.title}</h2>
    {props.body}
  </article>
}
function Create(){
  return <article>
    <h2>Create</h2>
    <form>
      <p><input type="text" name="title" placeholder='title'/></p>
      <p><textarea name="body" placeholder='body'/></p>
      <p><input type="submit" value="Create"/></p>
    </form>
  </article>
}
function App() {
  // const _mode = useState('main')
  // const mode = _mode[0];
  // const setMode = _mode[1];
  const [mode, setMode] = useState('main')
  const [id, setId] = useState(null)
  const topics = [
    {id:'1',title:'html',body:'html is'},
    {id:'2',title:'css',body:'css is'},
    {id:'3',title:'js',body:'javaScript is'}
  ] 
  let [title,body] = '';
  let content = null;
  if(mode==='main'){
    content = <Article title='main' body='Hello, main'></Article> 
  } else if (mode==='read') {
    for (let i = 0; i < topics.length; i++) {
      if(topics[i].id == id) {
        title = topics[i].title
        body = topics[i].body
      }
    }
    content = <Article title={title} body={body} ></Article>    
  } else if (mode==='Create') {
    content =<Create></Create>
  }
  return (
    <div className="App">
      <Header title='React' onChangeMode={()=>{
        setMode('main')
      }}></Header>
      <Nav topics={topics} onChangeMode={(_id)=>{
        setMode('read')
        setId(_id)
      }}></Nav>
      {content}
      <a href="/" onClick={()=>{
        setMode('Create')
      }}>Create</a>
    </div>
  );
}

export default App;
