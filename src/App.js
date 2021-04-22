import "./styles.css";
import { useEffect, useState } from "react";

const Card = ({ data }) => {
  // console.log(data);
  return (
    <li className="card" key={data.id}>
      <div className="userInfo">
        <span className="id">ID: {data.id}</span>
        <img className="profilePicture" src={data.avatar} alt={data.first_name + " " + data.last_name} />
        <span className="name">{data.first_name} {data.last_name}</span>
        <span className="email">
          <a href={"mailto:" + data.email} className="text-blue-500 font-medium">{data.email}</a>
        </span>
      </div>
    </li>
  );
};

/*
    <li className="flex-1 mr-6 border-2 border-black rounded-sm" key={data.id}>
      <div>ID: {data.id}</div>
      <div className="">
        <img src={data.avatar} alt="Avatar" className="avatar rounded-full" />
      </div>
      <div>
        {data.first_name} {data.last_name}
      </div>
      <div>
        <a href={"mailto:" + data.email} className="text-blue-500">
          {data.email}
        </a>
      </div>
    </li>

*/
const App = () => {
  const [userData, setUserData] = useState([]);
  const [numUsers, setNumUsers] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const getData = async (page = 1) => {
    const res = await fetch(
      `https://reqres.in/api/users?page=${page}&per_page=6`
    ).then((r) => r.json());

    console.log('res: ', res);
    setUserData(res.data);
    setNumUsers(Object.keys(res.data).length);
    setCurrentPage(page);
    setTotalPages(res.total_pages);
  };

  const handlePrevious = (e) => {
    console.log('handlePrevious called');
    e.preventDefault();
    if (currentPage !== 1) {
      getData(currentPage - 1);
    }
  };

  const handleNext = (e) => {
    e.preventDefault();
    getData(currentPage + 1);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="App">
      <h2 className='text-left ml-24 font-bold text-2xl mb-6 mt-4'>{numUsers} Users</h2>
      <div className="userListContainer m-auto ml-20">
        <ul className="userList">
          {userData.map((d) => {
            return <Card data={d} />;
          })}
        </ul>
      </div>
      <div className='mt-4'>
        <button type="button" onClick={handlePrevious} disabled={currentPage === 1} className='paginationButton'>
          PREVIOUS
        </button>
        <button type="button" onClick={handleNext} disabled={currentPage === totalPages} className='paginationButton'>
            NEXT
        </button>
      </div>
    </div>
  );
};

export default App;
