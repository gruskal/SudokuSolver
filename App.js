import React, { useState } from "react";
import { SearchInput, VideoPlayer } from "./components";
import styled from "styled-components";
import { Header, Content, Footer } from "./components/layout";

const APIURL = "https://www.googleapis.com/youtube/v3/search";
const KEY = ""; // YouTube Data API Key ( https://developers.google.com/youtube/v3/docs/videos/list )

const Container = styled.div`
  display: flex;
  flex: 1 0 auto;
  flex-direction: column;
  justify-content: center;
  background-color: #ecf0f1;
`;

const App = () => {
  const [video, setVideo] = useState("");
  const [error, setError] = useState("");

  async function fetchVideo(query) {
    try {
      const url = new URL(APIURL),
        params = {
          q: query,
          part: "snippet",
          maxResults: 1,
          key: KEY
        };
      Object.keys(params).forEach(key =>
        url.searchParams.append(key, params[key])
      );

      let response = await fetch(url);
      let responseJson = await response.json();
      if(responseJson.error) {
        setError(responseJson.error.message);
      } else {
        console.log(responseJson);
        setVideo(responseJson.items[0]);
      }  
    } catch (error) {
      console.error(error);
      setError(error);
    }
  }

  return (
    <Container>
      <Header>
        <SearchInput onApply={fetchVideo} />
      </Header>
      <Content>
        <VideoPlayer video={video} error={error}/>
      </Content>
      <Footer 
        title={video && video.snippet.title}
        description={video && video.snippet.description}
        channelName={video && video.snippet.channelTitle}
      />
    </Container>
  );
};

export default App;
