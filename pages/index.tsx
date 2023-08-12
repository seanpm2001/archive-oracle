import { useState } from "react";
import axios from 'axios';
import type { NextPage } from "next";
import { HfInference } from '@huggingface/inference'
import { generateEmbeddings } from '../utils/generateEmbeddings'
import { getDocs } from '../utils/getDocs'

const hf = new HfInference(process.env.HUGGING_FACE)

const Home: NextPage = () => {
  const [info, setInfo] = useState<null | any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>("");

  async function getInfo() {
    setLoading(true);
    try {
      const response = await hf.textGeneration({
        model: 'gpt2',
        inputs: inputValue
      });
      setInfo(response.generated_text);
      console.log(response);
    } catch (error) {
      // Handle error if the request fails
      console.error("Failed to fetch assets:", error);
    } finally {
      setLoading(false);
    }
  }

  async function testOpenAi() {
    //const info = await generateEmbeddings();
    axios.post('/api/generate-embeddings')
      .then((response) => {
        // Handle the response data
        console.log(response.data);
      })
      .catch((error) => {
        // Handle any errors
        console.error('An error occurred:', error);
      });
    console.log("Testing", info)
  }

  async function fetchDocs() {
    console.log("Fetching Docs");
    const archives = await getDocs();
    console.log("info", archives)
  }

  return (
    <div>
      <div>
        <h1>Home</h1>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button onClick={getInfo} disabled={loading}>
          {loading ? "Loading..." : "Test GPT2"}
        </button>
        <p>{info ? info : ""}</p>
      </div>
      <div>
        <button onClick={testOpenAi} disabled={loading}>
          {loading ? "Loading..." : "Test OpenAi"}
        </button>
      </div>
      <div>
        <button onClick={fetchDocs} disabled={loading}>
          {loading ? "Loading..." : "GetDocs"}
        </button>
      </div>
    </div>
  );
};

export default Home;
