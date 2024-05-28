"use client"
import axios from 'axios';
import { useChat } from "ai/react";
import Link from 'next/link';
import Image from 'next/image';
import { useState } from "react";
import { CardTitle, CardHeader, CardContent, Card } from "/components/ui/card";


export default function Home() {
  const { input, handleInputChange, handleSubmit, isLoading, messages } =
    useChat();
  const [showFAQ, setShowFAQ] = useState(true);
  const [mode, setMode] = useState(true);
  const toggleSection = () => {
    setShowFAQ(!showFAQ);
  };
  const toggleMode = () => {
    setMode(!mode);
    console.log(mode)
  };

  const sectionAsk = () => {
    if (showFAQ) {
      setShowFAQ(!showFAQ);
    } else (
      setShowFAQ(showFAQ)
    );
  }

  const [loading, setLoading] = useState(false);
  const [apiResponse, setapiResponse] = useState("");
  console.log("apiResponse:", apiResponse);



  const [text, setText] = useState("");

  const handleCopyClick = () => {
    navigator.clipboard.writeText(apiResponse)
      .then(() => {
        alert('Text copied to clipboard:', apiResponse);
        // Optionally, you can show a message to indicate successful copy
      })
      .catch((error) => {
        console.error('Error copying text:', error);
        // Optionally, you can show an error message
      });
  };




  const handleApiSubmit = async (event) => {
    event.preventDefault();
    // ... (existing API submission logic)
    setLoading(true); // Set loading state


    try {
      const response = await axios.post('https://security-lib.onrender.com/sanitize', { input: input });
      setapiResponse(response.data.sanitized_input); // Update state with API response
      //console.log('API response:', apiResponse); // Log response for debugging
    } catch (error) {
      console.error('Error submitting to API:', error);
      // Handle API errors (e.g., display error message to user)
    } finally {
      setLoading(false); // Reset loading state regardless of success or failure
    }

  };


  //console.log("apiResponse:", apiResponse);


  return (
    <div className="min-h-screen w-full p-8">
      <Image
        src="/assets/images/unichar.png" // For local GIFs
        alt="Alternative text for the GIF"
        width={0} // Optional: Set width
        height={0} // Optional: Set height
        quality={100} // Optional: Adjust quality (0-100)
        style={{ width: '200px', height: 'auto', display: 'flex', margin: 'auto' }}
        unoptimized={true}
        priority
      />
      <main>
        <section className="my-6">
          <section className="my-8 ">
            <h2 className="text-4xl text-center font-bold mb-12 pb-10 orange_gradient">Debug Panel</h2>
            <div className=" p-6  ">
              <div className="space-y-4">
                <div class="flex justify-end">
                  <div class="bg-orange-500 rounded-br-none rounded-xl px-6 py-3 text-gray-700 backdrop-filter backdrop-blur-md bg-opacity-10">
                    <div>
                      <p class="font-bold">You</p>
                      <p>"'; DROP TABLE users; --"</p>
                    </div>
                  </div>
                </div>
                <div class="flex justify-start">
                  <div class="bg-blue-500 rounded-bl-none rounded-xl px-6 py-3 text-gray-700 backdrop-filter backdrop-blur-md bg-opacity-10 ">
                    <div class="test">
                      <p class="font-bold ">UniChar AI</p>
                      <p>
                        To prevent SQL injection attacks like the one you've provided, you can sanitize the input by escaping special characters or using parameterized queries. Here's an example of how you can do it in JavaScript: function sanitizeInput(input) {
                          // Replace single quote with two single quotes to escape it
                          // This prevents SQL injection by treating the single quote as a literal character
                          input.replace(/'/g, "''")
                        }

                        const userInput = "'; DROP TABLE users; --";
                        const sanitizedInput = sanitizeInput(userInput);
                        console.log(sanitizeInput); // Output: ''; DROP TABLE users; --
                        In this code:

                        The sanitizeInput function replaces any occurrence of a single quote (') with two single quotes (''), effectively escaping the single quotes in the input string.
                        When sanitizeInput is applied to the user input ''; DROP TABLE users; --, it escapes the single quotes, making it safe to use in SQL queries.
                        This approach prevents SQL injection attacks by treating the single quote as a literal character rather than part of a SQL command. However, it's important to note that this is a basic example and may not cover all possible attack vectors. Depending on your specific use case and the database library you're using, you may need to employ additional measures for proper input sanitization and security.
                      </p>

                    </div>
                  </div>
                </div>
                {messages.map((message) => {
                  return (
                    <div key={message.id} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'
                      }`}>
                      <div className={`${message.role === 'assistant' ? 'bg-blue-500 rounded-bl-none rounded-xl px-6 py-3 text-gray-700 backdrop-filter backdrop-blur-md bg-opacity-10' : 'bg-orange-500 rounded-br-none rounded-xl px-6 py-3 text-gray-700 backdrop-filter backdrop-blur-md bg-opacity-10'}`}>
                        {message.role === 'assistant' ? (
                          <div className="test">
                            <p className="font-bold pb-3">UniChar AI</p>
                            {message.content.split("\n").map((currentTextBlock, index) => {
                              if (currentTextBlock === "") {
                                return <p key={message.id + index}>&nbsp;</p>
                              } else {
                                return <p key={message.id + index}>{currentTextBlock}</p>
                              }
                            })}
                          </div>
                        ) : (
                          <div>
                            <p className="font-bold pb-3">You</p>
                            {message.content.split("\n").map((currentTextBlock, index) => {
                              if (currentTextBlock === "") {
                                return <p key={message.id + index}>&nbsp;</p>
                              } else {
                                return <p key={message.id + index}>{currentTextBlock}</p>
                              }
                            })}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        </section>
        <section className="my-4">

          <div className="form flex flex-col shadow-lg bg-blue-500/10 p-4 rounded-3xl rounded-bl-none rounded-br-none" >
            <textarea onClick={handleCopyClick} name="output" id="output" value={apiResponse} className={apiResponse !== "" ? ('mb-4 rounded-3xl p-2 bg-orange-100 border-4 border-blue-100') : ('hidden')} onChange={(e) => setText(e.target.value)} readOnly></textarea>
            <div className=' flex flex-col'>
              {mode ? (<form onSubmit={handleApiSubmit} className="width: 100% flex flex-auto">
                <input
                  aria-label="Chat input"
                  className="flex-auto border-2 border-gray-200 rounded-3xl rounded-bl-none rounded-r-none p-4"
                  placeholder="Paste your code..."
                  type="text"
                  value={input}
                  onChange={handleInputChange}
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="ml-3 px-8 border-2 shadow-lg bg-orange-600 text-white font-bold hover:bg-orange-00 rounded-3xl rounded-l-none"
                >
                  {loading ? "Wait" : "Report"}
                </button>
              </form>) : (<form onSubmit={handleSubmit} className="flex">
                <input
                  aria-label="Chat input"
                  className="flex-auto border-2 border-gray-200 rounded-3xl rounded-bl-none rounded-r-none p-4"
                  placeholder="Paste your report..."
                  type="text"
                  onChange={handleInputChange}

                />
                <button
                  type="submit"
                  disabled={loading || apiResponse === null}
                  className='ml-3 px-8 border-2 shadow-lg bg-blue-600 rounded-3xl rounded-l-none text-white font-bold hover:bg-orange-00'
                  onClick={sectionAsk}
                >
                  {loading ? "..." : "Ask"}
                </button>
              </form>)}


            </div>

          </div>
        </section>
        <div className='flex justify-between'>
          <a href="/">
            <button type='button' className="p-3  rounded-2xl rounded-t-none max-w-[160px] mb-6 -mt-4 border shadow-sm">Switch Section</button>
          </a>
          <button className="p-3 rounded-2xl rounded-t-none max-w-[160px] mb-6 -mt-4 border shadow-sm " onClick={toggleMode}>Switch Mode</button>
        </div>

      </main>
      <footer className="py-4">
        <p className="text-center text-gray-600">
          Built by Defence Team @ SVT</p>
      </footer>
    </div>
  )


} 