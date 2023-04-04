import { Form, FormControl, Button } from "react-bootstrap";
import "./features.css";
export function Features({}) {
  const categories = [
    "automotive",
    "business",
    "diy",
    "fashion",
    "finance",
    "fitness",
    "food",
    "gaming",
    "lifestyle",
    "movie",
    "music",
    "news",
    "personal",
    "pet",
    "politics",
    "sports",
    "technology",
    "travel",
    "other",
  ];
  return (
    <div className="featuresBody">
      <div className="searchBoxDiv">
        <Form className="d-flex">
          <FormControl
            type="search"
            placeholder="Search blogs"
            className="me-2"
            aria-label="Search"
          />
          <Button type="submit" className="customBtn">
            Search
          </Button>
        </Form>
      </div>

      <div className="filterDiv">
        <h5>Filter</h5>
        <Form.Select>
          <option value="">all</option>
          {categories.map((c, i) => (
            <option key={c + i} value={c}>
              {c}
            </option>
          ))}
        </Form.Select>
      </div>

      <Button className="customBtn">Reset Result</Button>
    </div>
  );
}
