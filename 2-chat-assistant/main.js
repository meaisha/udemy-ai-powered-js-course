import { GoogleGenerativeAI } from "@google/generative-ai";

const businessInfo = `
AishaMomStore – Business Information

Description:
AishaMomStore is a lifestyle boutique for mothers and children, offering eco-friendly baby feeding sets, comfortable fitness wear, and mindful self-care products. Customers can shop online or visit our physical stores in Madrid and New York.

Locations

Madrid Store
Address: Calle de Serrano 45, 28001 Madrid, Spain
Phone: +34 91 555 0199
Email: madrid@aishamomstore.com

Opening Hours:
Monday to Friday: 10:00 AM – 7:00 PM
Saturday: 10:00 AM – 5:00 PM
Sunday: Closed

New York Store
Address: 210 West Broadway, New York, NY 10013, USA
Phone: +1 212 555 0224
Email: ny@aishamomstore.com

Opening Hours:
Monday to Friday: 9:00 AM – 6:00 PM
Saturday: 10:00 AM – 4:00 PM
Sunday: Closed

Head Office and Online Store
Website: https://www.aishamomstore.com

Email: info@aishamomstore.com

Phone: +1 212 555 0188
Orders can be placed online and shipped globally. Local pickup is available at both physical stores.

Policies

Return Policy:
Returns are accepted within 14 days of purchase. Items must be unused and in their original packaging.
To initiate a return, email returns@aishamomstore.com
 with your order number.

Shipping Policy:
Orders are shipped within 2–3 business days. Free shipping is available on orders over $100 USD.
Both domestic and international deliveries are supported.

Payment Methods:
Visa, Mastercard, PayPal, and Apple Pay.

Frequently Asked Questions

What are your store hours?
Madrid: Monday–Friday 10 AM–7 PM, Saturday 10 AM–5 PM, Sunday closed.
New York: Monday–Friday 9 AM–6 PM, Saturday 10 AM–4 PM, Sunday closed.

How can I contact your stores?
Madrid: +34 91 555 0199 · madrid@aishamomstore.com

New York: +1 212 555 0224 · ny@aishamomstore.com

Do you offer online shopping?
Yes. Visit www.aishamomstore.com
 to place orders worldwide.

Can I pick up my online order in-store?
Yes. Select “Pickup in Store” at checkout. You will be notified when your order is ready.

Do you ship internationally?
Yes, we deliver to most countries. Free shipping on orders above $100 USD.

How can I modify or cancel my order?
If your order has not yet shipped, contact support@aishamomstore.com
 or the store where your order was placed.

What payment methods do you accept?
Visa, Mastercard, PayPal, and Apple Pay.

Do you offer gift cards?
Yes, both digital and physical gift cards are available.

How can I stay updated on new arrivals?
Follow us on Instagram @aishamomstore or subscribe to our newsletter.

Social Media
Instagram: https://www.instagram.com/aishamomstore

Facebook: https://www.facebook.com/aishamomstore

Tone and Guidelines for AI Responses
Keep tone polite, professional, and slightly formal.
Give concise, factual answers (1–3 sentences).
Include location-specific details when relevant.
Offer direct links or contact info for further help.
If a question is unclear, politely ask for clarification.
`;

const API_KEY = "AIzaSyD5eajeoBHyhdRQW2swEdhC6HEo3MsiB64";

const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ 
    model: "gemini-2.0-flash",
    systemInstruction: businessInfo,
});

let messages =  {
    history: [],
};
async function sendMessage() {

    try {
        const userMessage = document.querySelector(".chat-window input").value;

        if(userMessage.length) {
            document.querySelector(".chat-window input").value = "";
            document.querySelector(".chat-window .chat").insertAdjacentHTML("beforeend", `<div class="user">
                    <p>${userMessage}</p>
                </div>`);

            document.querySelector(".chat-window .chat").insertAdjacentHTML("beforeend", `<div class="loader"></div>`);
            
        }

        const chat = model.startChat(messages);

        let result = await chat.sendMessageStream(userMessage);

        document.querySelector(".chat-window .chat").insertAdjacentHTML("beforeend", `<div class="model">
            <p></p>
        </div>`);

        for await (const chunk of result.stream) {
            const chunkText = chunk.text();
            let modelMessages = document.querySelectorAll(".chat-window .chat div.model");
            modelMessages[modelMessages.length - 1].querySelector("p").insertAdjacentHTML("beforeend", `${chunkText}`);
        }

        /*
        messages.history.push({
            role: "user",
            parts: [{text: userMessage}],
        });
        messages.history.push({
            role: "model",
            parts: [{text: result.response.text()}],
        });*/
    } catch(error) {
        document.querySelector(".chat-window .chat").insertAdjacentHTML("beforeend", `<div class="error">
            <p>The message could not be sent. Please try again.</p>
        </div>`);
    }

    document.querySelector(".chat-window .chat .loader").remove();

    
   

}

document.querySelector(".chat-window .input-area button").addEventListener("click", () => sendMessage());