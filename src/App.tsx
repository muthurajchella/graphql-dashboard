import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CreatePost from "./pages/CreatePost";
import PostDetails from "./pages/PostDetails";
import AppHeader from "./components/AppHeader";
import LeftCard from "./components/LeftCard";
import RightCard from "./components/RightCard";

export interface User {
  id: number;
  name: string;
  username: string;
}

function App() {
  const [barChartData, setBarChartData] = useState<number[]>([]);
  const [barChartCategories, setBarChartCategories] = useState<string[]>([]);
  const [lineChartData, setLineChartData] = useState<number[]>([]);
  const [lineChartCategories, setLineChartCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"left" | "center" | "right">(
    "center"
  );

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const res = await fetch("https://jsonplaceholder.typicode.com/users");
        const data: User[] = await res.json();

        setBarChartData(data.map((user) => user.id));
        setBarChartCategories(data.map((user) => user.name));
        setLineChartData(data.map((user) => user.username.length));
        setLineChartCategories(data.map((user) => user.name));

        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch contacts:", error);
        setLoading(false);
      }
    };

    fetchContacts();
  }, []);

  return (
    <>
      {/* Header */}
      <div className="position-sticky top-0 z-3 w-100">
        <AppHeader />
      </div>

      {/* Mobile Tab Menu (visible only on mobile) */}
      <div className="d-sm-none bg-light border-bottom p-2 d-flex justify-content-around">
        <button
          className={`btn btn-sm ${
            activeTab === "left" ? "btn-primary" : "btn-outline-primary"
          }`}
          onClick={() => setActiveTab("left")}
        >
          Stats A
        </button>
        <button
          className={`btn btn-sm ${
            activeTab === "center" ? "btn-primary" : "btn-outline-primary"
          }`}
          onClick={() => setActiveTab("center")}
        >
          Feed
        </button>
        <button
          className={`btn btn-sm ${
            activeTab === "right" ? "btn-primary" : "btn-outline-primary"
          }`}
          onClick={() => setActiveTab("right")}
        >
          Stats B
        </button>
      </div>

      <div className="container-fluid" style={{ height: "calc(100vh - 70px)" }}>
        <div className="row h-100">
          {/* Left Panel - Card 1 */}
          <div
            className={`col-12 col-sm-3 bg-light p-3 overflow-hidden ${
              activeTab === "left" ? "d-block" : "d-none"
            } d-sm-block`}
          >
            {!loading ? (
              <LeftCard data={barChartData} categories={barChartCategories} />
            ) : (
              <p>Loading chart...</p>
            )}
          </div>

          {/* Center Panel - Card 2 */}
          <div
            className={`col-12 col-sm-6 p-0 overflow-auto mt-1 ${
              activeTab === "center" ? "d-block" : "d-none"
            } d-sm-block`}
            style={{ height: "100%" }}
          >
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/create" element={<CreatePost />} />
              <Route path="/post/:id" element={<PostDetails />} />
            </Routes>
          </div>

          {/* Right Panel - Card 3 */}
          <div
            className={`col-12 col-sm-3 bg-light p-3 overflow-hidden ${
              activeTab === "right" ? "d-block" : "d-none"
            } d-sm-block`}
          >
            {!loading ? (
              <RightCard
                data={lineChartData}
                categories={lineChartCategories}
              />
            ) : (
              <p>Loading chart...</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
