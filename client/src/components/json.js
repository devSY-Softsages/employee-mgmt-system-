import { useEffect, useState } from "react";
import { getPosts } from "../components/api/index";
function Json() {
  const [data, setData] = useState("");

  useEffect(() => {
    getPostsData();
  }, []);

  const getPostsData = async () => {
    const data = await getPosts();
    setData(data);
  };

  return (
    <div className="container">
      <div className="row card-deck">
        {data ? (
          data.map((item, index) => (
            <div className="col-md-12 col-sm-12 main-card mb-3">
              <div className="row">
                <div className="col-md-3">Card Number</div>
                <div className="col-md-9">{index + 1}</div>
              </div>
              <div className="row">
                <div className="col-md-3">UserID</div>
                <div className="col-md-9">{item.userId}</div>
              </div>
              <div className="row">
                <div className="col-md-3">ID</div>
                <div className="col-md-9">{item.id}</div>
              </div>
              <div className="row">
                <div className="col-md-3">Title</div>
                <div className="col-md-9">{item.title}</div>
              </div>
              <div className="row">
                <div className="col-md-3">Body</div>
                <div className="col-md-9">{item.body}</div>
              </div>
            </div>
          ))
        ) : (
          <div>data not available</div>
        )}
      </div>
    </div>
  );
}

export default Json;
