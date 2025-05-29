export const generateEmail = async (prompt: string) => {
    const response = await fetch("https://email-genie.inukasilva85.workers.dev/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt }),
    });
  
    if (!response.ok) {
      throw new Error(`Proxy error: ${response.statusText}`);
    }
  
    return await response.text(); // or response.json() if using JSON response
  };