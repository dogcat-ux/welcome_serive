import mammoth from "mammoth";
const parseFile=async (fileUrl,next) =>{
  // let file_url = fileUrl;
  let file_url = "./intro.docx";
  let xhr = new XMLHttpRequest();
  xhr.open("GET", file_url);
  xhr.responseType = "arraybuffer";
  xhr.onload = () => {
    let arrayBuffer = xhr.response; //arrayBuffer
    mammoth
        .convertToHtml({ arrayBuffer: arrayBuffer })
        .then(next)
        .done();
  };
  xhr.send();
}
export default parseFile;
