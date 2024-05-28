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

  const sectionAsk =()=>{
    if(showFAQ){
      setShowFAQ(!showFAQ);
    }else(
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
        alert('Report copied to clipboard:', apiResponse);
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
const response = await post('https://handy-liberal-chipmunk.ngrok-free.app/', {
    input: input
  }, {
    headers: {
      'Content-Type': 'text/plain'
    }
  });
  
    setapiResponse(response.data.report); 
    console.log(apiResponse)// Update state with response.data.report
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
        src="/assets/images/varfaud.png" // For local GIFs
        alt="Alternative text for the GIF"
        width={0} // Optional: Set width
        height={0} // Optional: Set height
        quality={100} // Optional: Adjust quality (0-100)
        style={{ width: '200px', height: 'auto', display: 'flex', margin: 'auto' }}
        unoptimized={true}
        priority
      />

      <main><section className="my-6">
        {showFAQ ? (
          <section className="my-8">
            <h2 className="text-4xl text-center font-bold mb-4  text-orange-400">General Errors & Debug</h2>
            <h3 className="text-lg text-center mb-10">A Pretty Simple AI powered Unicode and Metacharacter Handling Library</h3>
            <div className="grid grid-cols-2 gap-4">
              <Link href="/f1">
                <Card className="w-full cursor-pointer" href="/f-1">
                  <CardHeader>
                    <CardTitle>Help to eliminate SQL injection attack?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>user_input = "'; DROP TABLE users; --" <br />
                      sanitized_input = sanitize_input(user_input)<br />
                      print(sanitized_input)</p>
                  </CardContent>
                </Card>
              </Link>
              <Link href="/f2">
                <Card className="w-full cursor-pointer"  >
                  <CardHeader>
                    <CardTitle>How to tackle Shell Injection?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>user_input = "rm -rf ~"<br />
                      sanitized_input = sanitize_input(user_input)<br />
                      print(sanitized_input)  # Output: rm\ -rf\ \~</p>
                  </CardContent>
                </Card></Link>
              <Link href="/f3">
                <Card className="w-full cursor-pointer" >
                  <CardHeader>
                    <CardTitle>Protect my code from XSS attack</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>Some problematic code <br />
                      sanitized_input = sanitize_input(user_input)<br />
                      print(sanitized_input)</p>
                  </CardContent>
                </Card></Link>
              <Link href="/f4">
                <Card className="w-full cursor-pointer" >
                  <CardHeader>
                    <CardTitle>Analyse my code for vulnerabilities</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>user_input = "Hello, World!"<br />
                      sanitized_input = sanitize_input(user_input)<br />
                      print(sanitized_input)</p>
                  </CardContent>
                </Card></Link>

            </div>
          </section>
        ) : (
          <section className="my-8 ">
            <h2 className="text-4xl text-center font-bold mb-12 pb-10 orange_gradient">Debug Panel</h2>
            <div className=" p-6  ">
              <div className="space-y-4">



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
        )}</section>
        <section className="my-4">
          
          <div className="form flex flex-col shadow-lg bg-blue-500/10 p-4 rounded-3xl rounded-bl-none rounded-br-none" >
           <textarea  onClick={handleCopyClick} name="output" id="output" value={apiResponse} className={apiResponse!==""? ('mb-4 rounded-3xl p-2 bg-orange-100 border-4 border-blue-100'):('hidden') } onChange={(e) => setText(e.target.value)} readOnly></textarea>
            <div className=' flex flex-col'>
              {mode? (<form onSubmit={handleApiSubmit} className="width: 100% flex flex-auto">
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
            </form>):(<form onSubmit={handleSubmit} className="flex">
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
          <button className="p-3  rounded-2xl rounded-t-none max-w-[160px] mb-6 -mt-4 border shadow-sm" onClick={toggleSection}>Switch Section</button>
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