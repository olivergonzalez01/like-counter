import { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';

function Profile({id, data, actuallikes}) {
  const [likes, setLikes] = useState(null);

  const like = (e) => {
    e.preventDefault();
    let joe = async () => {
      const result = await axios.post('http://localhost:8080/likes', {
        id: 14
      });
      setLikes(result.data[0].likes);
    };joe();
  }

  return (
    <div id={id} className="bg-secondary text-light rounded p-3 mt-3">
      <div className="row">
        <div className="col-md-3">
          <img className="img-fluid rounded-circle" alt="coat of arms" src={data[0][0].emblem}/>
          {data[1].map ((f) => <div key={f.id} className="text-center fst-italic">{f.content}</div>)}
        </div>
        <div className="col-md-9 pt-3">
          <h2>{data[0][0].name}</h2>
          <div className="row col-md-auto mx-2">
            <div className="col-md-auto m-1 border border-dark">
              <img alt="like" src="thumbsup-active.png" onClick={like}/> {likes == undefined
              ? actuallikes : likes}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4">
        <h3>Sayings</h3>
        <ul>
          <li key="0">Some wise quote</li>
          <li key="1">A less wise quote</li>
          <li key="2">A steaming pile of waste of breath</li>
        </ul>
      </div>

    </div>
  );
}

function App() {
  const [data, setData] = useState([]);
  const [load, setLoad] = useState(true);

  useEffect( () => {
    const fetch = async () => {
      const result = await axios.post('http://localhost:8080/userdata', {
        id: 14
      });
      setData(result.data, result.quote);
      setLoad(false);
    };
    fetch();
  }, []);
  
  if(load) return (
    <></>
  )
  if(!data) return (
    <></>
  )

    return (
    <div className="container">

      <Profile id="14" data={[data.result, data.quote]} actuallikes={data.result[0].likes}/>
  
      <div className="border mt-3 p-2">
      <h3>Instructions</h3>

      <p>
        Above is a <code>Profile</code> component that displays a certain profile from the database. The profile
        id is specified as a prop (14 in this case). Don't change that as it's our only example.
      </p>

      <p>
        That component currently shows static, mocked-up data. Your job is to make it functional.
      </p>

      <ol>
        <li>Create a server route to return the data for a single profile in the database by id
          <ul>
            <li>The data should include the quotes in the database that go with that profile</li>
          </ul>
        </li>
        <li>Update <code>Profile</code> to fetch the profile data on startup
          <ul>
            <li>Use whatever profile id is passed in to the component as a prop</li>
            <li>You don't have to show "Loading" and "Error" to the user</li>
          </ul>
        </li>
        <li>Update <code>Profile</code> to display the retrieved data in place of the mockup data</li>
        <li>Update <code>Profile</code> so you can click on the thumbs up to increase the "like" count locally
          <ul>
            <li>Since you're only updating locally, it resets to 0 on page reload</li>
          </ul>
        </li>
        <li>Create a server route that increments the number of "likes" in the database for a certain profile id
            <ul>
              <li>GET or POST is fine</li>
              <li>It always just increments it by 1</li>
            </ul>
        </li>
        <li>Update <code>Profile</code> to call that route to update the "likes" in the database when you click
          <ul>
            <li>Now the changes should persist through page reloads</li>
          </ul>
        </li>
      </ol>
    </div>
  </div>
  );
};

export default App;
