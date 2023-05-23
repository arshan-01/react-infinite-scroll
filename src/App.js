import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import axios from "axios";

export default function App() {
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMoreData, setHasMoreData] = useState(true);
  const fetchData = () => {
    axios
      .get(`https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=15`)
      .then((res) => {
        const newItems = res.data;
        if (newItems.length > 0) {
          setItems([...items, ...newItems]);
          setHasMoreData(true);
        } else {
          setHasMoreData(false);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchData();
  }, [page]);
  return (
    <InfiniteScroll
      dataLength={items.length} //This is important field to render the next data
      next={() => {
        setPage((prevPage) => prevPage + 1);
      }}
      hasMore={hasMoreData}
      loader={<h4>Loading...</h4>}
      endMessage={
        <p style={{ textAlign: "center" }}>
          <b>Yay! You have seen it all</b>
        </p>
      }
    >
      <div>
        {items.map((item, index) => (
          <div key={index}>
            <h3>
              {item.id} {item.title}
            </h3>
          </div>
        ))}
      </div>
    </InfiniteScroll>
  );
}
