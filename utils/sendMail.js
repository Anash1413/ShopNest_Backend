const dns = require('dns')
dns.setDefaultResultOrder('ipv4first')

exports.sendMaiil = async (to , subject , text )=>{
   try {
       const relayUrl = process.env.GMAIL_RELAY_URL;
       const relayToken = process.env.GMAIL_RELAY_TOKEN;
       
       if (!relayUrl || !relayToken) {
           console.error("GMAIL_RELAY_URL or GMAIL_RELAY_TOKEN is not defined in the environment variables.");
           throw new Error("Email service is misconfigured");
       }

       const response = await fetch(relayUrl, {
           method: "POST",
           headers: {
               "Content-Type": "application/json"
           },
           body: JSON.stringify({
               token: relayToken,
               to: to,
               subject: subject,
               text: text
           })
       });

       if (!response.ok) {
           throw new Error(`Gmail Relay HTTP Error: ${response.statusText}`);
       }

       const result = await response.json();
       if (result.status !== "success") {
           throw new Error(`Gmail Relay Error: ${result.message}`);
       }

       console.log("Email sent successfully via Gmail HTTP Relay");
   } catch (error) {
       console.log("error in sending mail",error)
       throw error
   } 
}
