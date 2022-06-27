import mammoth from "mammoth";
// import axios from 'axios'

const parseFile = async (fileUrl, next) => {
  let file_url = fileUrl;
  // let file_url = "/12.doc";
      // axios.get("http://localhost:8080/"+file_url,{
      //   responseType:"blob"
      // }).then(res=>{
      //   let read=new FileReader();
      //   read.onload = function (e) {
      //     console.log("e",e)
      //   }
      //   console.log(
      //       "read111",read.readAsArrayBuffer(res.data)
      //   )
      // })
  let xhr = new XMLHttpRequest();
  xhr.open("GET", file_url);
  xhr.responseType = "arraybuffer";
  xhr.onload = () => {
    let arrayBuffer = xhr.response; //arrayBuffer
    console.log(arrayBuffer)
    // mammoth.convertToHtml({path:file_url).then(next)
    //     .done();
    mammoth
        .convertToHtml({arrayBuffer: arrayBuffer})
        .then(next)
        .done();
  };
  xhr.send();
}
export default parseFile;
