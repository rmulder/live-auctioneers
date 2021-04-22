import "./styles.css";
import { useEffect, useState } from "react";

const Card = ({ data }) => {
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

const App = () => {
  const [userData, setUserData] = useState([]);
  const [numUsers, setNumUsers] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [numPerPage, setNumPerPage] = useState(6);

  const getData = async (page = 1, perPage = numPerPage) => {
    const res = await fetch(
      `https://reqres.in/api/users?page=${page}&per_page=${perPage}`
    ).then((r) => r.json());

    // console.log('getData - res: ', res);
    setUserData(res.data);
    setNumUsers(Object.keys(res.data).length);
    setCurrentPage(page);
    setTotalPages(res.total_pages);
  };

  const handlePrevious = (e) => {
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
      <div className="userListContainer m-auto ml-20 mb-4">
        <ul className="userList">
          {userData.map((d) => {
            return <Card data={d} />;
          })}
        </ul>
      </div>
      <div className='pagination m-auto mt-10 mb-20'>
        <div className="paginationButtons">
          <button type="button" onClick={handlePrevious} disabled={currentPage === 1} className='paginationButton'>
            PREVIOUS
          </button>
            <button type="button" onClick={handleNext} disabled={currentPage === totalPages} className='paginationButton'>
              NEXT
          </button>
        </div>
        <div className='mr-24'>
          <select 
            className="paginationSelect"
            value={numPerPage}
            onChange={(e) => {
              setNumPerPage(e.target.value);
              console.log('numPerPage: ', numPerPage);
              getData(1, e.target.value);
            }}
          >
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default App;
