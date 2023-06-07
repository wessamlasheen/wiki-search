// import { BrowserRouter, Routes, Route } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/esm/Container";
import axios from "axios";
import ResultTable from "./components/Resulttable";
import { useEffect, useState } from "react";
function App() {
  const [info, setInfo] = useState([]);

  // state to save search value

  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    const search = async () => {
      const respond = await axios
        .get("https://en.wikipedia.org/w/api.php", {
          params: {
            action: "query",
            list: "search",
            srsearch: searchValue === "" ? "javascript" : searchValue,
            format: "json",
            origin: "*",
          },
        })
        .then(function (response) {
          // handle success
          // console.log(response.data.query.search);
          setInfo(response.data.query.search);
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        });
    };

    if (!searchValue) {
      search();
    } else {
      let handler = setTimeout(() => {
        search();
      }, 3000);

      return () => {
        clearTimeout(handler);
      };
    }
  }, [searchValue]);

  const infoMap = info.map((ele, idx) => {
    idx++;
    return (
      <tr key={idx}>
        <td>{idx}</td>
        <td>{ele.title}</td>
        <td>
          <span dangerouslySetInnerHTML={{ __html: ele.snippet }} />
        </td>
        <td>{ele.timestamp}</td>
      </tr>
    );
  });

  return (
    <div className="main">
      <Container className="p-5">
        <Form className="d-flex mb-5">
          <Form.Control
            type="search"
            placeholder="Search"
            className="me-2"
            aria-label="Search"
            value={searchValue}
            onChange={(e) => {
              setSearchValue(e.target.value);
              console.log(searchValue);
            }}
          />
          {/* <Button variant="outline-success">Search</Button> */}
        </Form>
        <ResultTable infoMap={infoMap} />
      </Container>
    </div>
  );
}

export default App;
