import {Buffer} from 'buffer';


function FileUpload() {

    async function handleFileUpload(event) {
        const fileUpload = await event.target.files[0].arrayBuffer();
        const file = {
            type: event.target.files[0].type,
            file: Buffer.from(fileUpload).toString,
        };
        console.log("File uploaded:", file);
        // Add further processing logic here
    }
  return (
    <section>
        <h2>Get Started</h2>
        <input 
            type="file" 
            accept=".pdf, .jpeg, .jpg, .png" 
            onChange={handleFileUpload}
        />
    </section>
  );
}

export default FileUpload;