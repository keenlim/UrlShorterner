import React from 'react';
import { useState } from 'react';

//Import axios - a promised based HTTP client to make HTTP requests from the browser and handle the transformation of request and response data
import axios from "axios";

const AddUrl = () => {

    const [url, setUrl] = useState("");
    const [shortUrl, setShortUrl] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(url);
        if(!url){
            alert("Please enter an URL!");
            return;
        }

        axios
          .post("http://localhost:5000/short", {origUrl: url})
          .then(res => {
            console.log(res.data);
            setShortUrl(res.data.shortUrl);
          })
          .catch(err => {
            console.log(err.message);
          });
        setUrl("");
    }

    return(
        <div className="app">
        <main>
          <section className="w-100 d-flex flex-column justify-content-center align-items-center">
            <h1 className="mb-2 fs-1">URL Shortener</h1>
            <form className="w-50" onSubmit={handleSubmit}>
              <input
                className="w-100 border border-primary p-2 mb-2 fs-3 h-25"
                type="text"
                placeholder="http://samplesite.com"
                value={url}
                onChange={e=>setUrl(e.target.value)}
              />
              <div class="d-grid gap-2 col-6 mx-auto">
              <button type="submit" className="btn btn-danger m-5">
                Shorten!
              </button>
              </div>
            </form>

            {shortUrl && (
                <p>
                    Shortened URL:
                    {shortUrl}
                </p>
            )}
          </section>
        </main>
      </div>
    );

    

}

export default AddUrl;